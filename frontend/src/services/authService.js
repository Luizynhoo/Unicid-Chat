import {api} from './api';

export const login = async (usuario, senha) => {
    const response = await api.post('/auth/login', {usuario, senha});
    return response.data;
}