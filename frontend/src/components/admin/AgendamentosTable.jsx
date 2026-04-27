import { useEffect, useState } from 'react';
import { Calendar, Clock, User, Hash, Plus, Pencil, Trash2, CalendarDays } from 'lucide-react';
import { getAgendamento, deletarAgendamento } from '../../services/agendamento';
import AgendamentoForm from './AgendamentoForm';
import '../../styles/admin/agendamentos.css';

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  if (!d) return dateStr;
  return `${d}/${m}/${y}`;
}

function getInitials(name = '') {
  return name.trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export default function AgendamentosTable() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [lastCount, setLastCount] = useState(0);



  const fetchAgendamentos = async () => {
    try {
      const data = await getAgendamento();

      if (data.length !== lastCount) {
        setAgendamentos(data);
        setLastCount(data.length);
      }

    } catch (error) {
      console.log('Erro ao buscar agendamentos');
    }
  };

  useEffect(() => {
    fetchAgendamentos();

    const interval = setInterval(fetchAgendamentos, 5000);

    const handleNovo = () => fetchAgendamentos();

    window.addEventListener('novo-agendamento', handleNovo);

    return () => {
      clearInterval(interval);
      window.removeEventListener('novo-agendamento', handleNovo);
    };
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    await deletarAgendamento(id);
    await fetchAgendamentos();
    setDeletingId(null);
  };

  const handleEdit = (item) => { setEditing(item); setShowForm(true); };
  const handleCreate = () => { setEditing(null); setShowForm(true); };

  return (
    <section className="sched">

      <div className="sched__header">
        <div className="sched__header-left">
          <span className="sched__header-icon"><CalendarDays size={18} /></span>
          <div>
            <h2 className="sched__title">Agendamentos</h2>
            <p className="sched__subtitle">
              {agendamentos.length === 0
                ? 'Nenhum agendamento cadastrado'
                : `${agendamentos.length} agendamento${agendamentos.length > 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        <button className="sched__new-btn" onClick={handleCreate}>
          <Plus size={14} />
          Novo agendamento
        </button>
      </div>

      {agendamentos.length === 0 ? (
        <div className="sched__empty">
          <CalendarDays size={32} className="sched__empty-icon" />
          <p>Nenhum agendamento por aqui ainda.</p>
          <button className="sched__new-btn" onClick={handleCreate}>
            <Plus size={14} /> Criar primeiro agendamento
          </button>
        </div>
      ) : (
        <div className="sched__list">
          <div className="sched__list-header">
            <span>Aluno</span>
            <span>RGM</span>
            <span>Data</span>
            <span>Hora</span>
            <span />
          </div>

          {agendamentos.map((item, i) => (
            <div
              key={item.id}
              className={`sched__row${deletingId === item.id ? ' sched__row--deleting' : ''}`}
              style={{ '--i': i }}
            >

              <div className="sched__cell sched__cell--name">
                <span className="sched__avatar">{getInitials(item.nome)}</span>
                <span className="sched__name">{item.nome}</span>
              </div>

              <div className="sched__cell sched__cell--meta">
                <Hash size={12} className="sched__cell-icon" />
                {item.rgm}
              </div>

              <div className="sched__cell sched__cell--meta">
                <Calendar size={12} className="sched__cell-icon" />
                {formatDate(item.data)}
              </div>

              <div className="sched__cell sched__cell--meta">
                <Clock size={12} className="sched__cell-icon" />
                {item.hora}
              </div>

              <div className="sched__cell sched__cell--actions">
                <button
                  className="sched__action-btn sched__action-btn--edit"
                  onClick={() => handleEdit(item)}
                  aria-label="Editar agendamento"
                >
                  <Pencil size={14} />
                </button>
                <button
                  className="sched__action-btn sched__action-btn--delete"
                  onClick={() => handleDelete(item.id)}
                  aria-label="Excluir agendamento"
                  disabled={deletingId === item.id}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <AgendamentoForm
          onClose={() => setShowForm(false)}
          onSuccess={fetchAgendamentos}
          editing={editing}
        />
      )}
    </section>
  );
}