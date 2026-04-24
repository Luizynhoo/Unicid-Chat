import { useState, useEffect } from 'react';
import { X, CalendarDays } from 'lucide-react';
import { postAgendamento, editAgendamento } from '../../services/agendamento';
import '../../styles/admin/agendamentos.css';

export default function AgendamentoForm({ onClose, onSuccess, editing }) {
  const [form, setForm] = useState({ nome: '', rgm: '', data: '', hora: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.nome || !form.rgm || !form.data || !form.hora) return;
    setSaving(true);
    if (editing) {
      await editAgendamento(editing.id, form.nome, form.rgm, form.data, form.hora);
    } else {
      await postAgendamento(form.nome, form.rgm, form.data, form.hora);
    }
    await onSuccess();
    setSaving(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={editing ? 'Editar agendamento' : 'Novo agendamento'}>

        <div className="modal__header">
          <div className="modal__header-left">
            <span className="modal__header-icon"><CalendarDays size={16} /></span>
            <h3 className="modal__title">
              {editing ? 'Editar agendamento' : 'Novo agendamento'}
            </h3>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Fechar">
            <X size={16} />
          </button>
        </div>

        <div className="modal__body">
          <div className="modal__field">
            <label className="modal__label" htmlFor="nome">Nome do aluno</label>
            <input
              id="nome"
              className="modal__input"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex: Maria Silva"
              autoComplete="off"
            />
          </div>

          <div className="modal__field">
            <label className="modal__label" htmlFor="rgm">RGM</label>
            <input
              id="rgm"
              className="modal__input"
              name="rgm"
              value={form.rgm}
              onChange={handleChange}
              placeholder="Ex: 0123456789"
            />
          </div>

          <div className="modal__row">
            <div className="modal__field">
              <label className="modal__label" htmlFor="data">Data</label>
              <input
                id="data"
                className="modal__input"
                name="data"
                value={form.data}
                onChange={handleChange}
                type="date"
              />
            </div>

            <div className="modal__field">
              <label className="modal__label" htmlFor="hora">Hora</label>
              <input
                id="hora"
                className="modal__input"
                name="hora"
                value={form.hora}
                onChange={handleChange}
                type="time"
              />
            </div>
          </div>
        </div>

        <div className="modal__footer">
          <button className="modal__btn modal__btn--cancel" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="modal__btn modal__btn--save"
            onClick={handleSubmit}
            disabled={saving || !form.nome || !form.rgm || !form.data || !form.hora}
          >
            {saving ? 'Salvando…' : 'Salvar'}
          </button>
        </div>

      </div>
    </div>
  );
}