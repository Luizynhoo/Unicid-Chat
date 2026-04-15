import {api} from './api';

export const postMetricas = async () => {
    const response = await api.post('/metricas/');
    return response.data;
}

export const getMetricas = async () => {
    const response = await api.get('/metricas/');
    return response.data;
}

export const postFeedback = async (isGood) => {
    return api.post(`/metricas/feedback?ajudou=${isGood}`);
};