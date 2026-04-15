import { useState } from "react";
import { postAgendamento } from "../../../services/agendamento";
import './AgendamentoModal.css';

export default function AgendamentoModal({ onClose }) {
    const [nome, setNome] = useState('');
    const [rgm, setRgm] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nome || !rgm || !data || !hora) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        await postAgendamento(nome, rgm, data, hora);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Agendar Atendimento</h2>
                    <button className="modal-close" onClick={onClose} aria-label="Fechar">
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Nome completo</label>
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>RGM</label>
                        <input
                            type="text"
                            placeholder="Digite seu RGM"
                            value={rgm}
                            onChange={e => setRgm(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Data</label>
                            <input
                                type="date"
                                value={data}
                                onChange={e => setData(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Hora</label>
                            <input
                                type="time"
                                value={hora}
                                onChange={e => setHora(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-confirm">
                            Confirmar Agendamento
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}