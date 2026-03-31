import {api} from "./api";

export const sendMessage = async (message) => {
    const response = await api.post("/chat", {mensagem: message});
    return response.data.resposta;
}