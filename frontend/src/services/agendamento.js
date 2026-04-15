import { api } from "./api";

export const postAgendamento = async (nome, rgm, data, hora) => {
    const response = await api.post('/agendamentos', {nome, rgm, data, hora});
    return response.data;
}

export const getAgendamento = async () => {
    const response = await api.get('/agendamentos');
    return response.data;
}

export const editAgendamento = async (id, nome, rgm, data, hora) => {
    const response = await api.put(`/agendamentos/${id}`, { nome, rgm, data, hora });
    return response.data;
}

export const deletarAgendamento = async (id) => {
    const response = await api.delete(`/agendamentos/${id}`);
    return response.data;
}