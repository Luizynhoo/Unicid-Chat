    import { useState } from "react";
    import { sendMessage } from "../services/chatService";

    export function Chat() {
        const [mensagem, setMensagem] = useState("");
        const [chat, setChat] = useState([]);
        const [loading, setLoading] = useState(false);

        async function handleEnviar() {
            if (!mensagem.trim()) return;

            const novaMensagem = { tipo: "user", texto: mensagem };
            setChat((prev) => [...prev, novaMensagem]);

            setMensagem("");
            setLoading(true);

            try {
                const resposta = await sendMessage(mensagem);

                setChat((prev) => [
                    ...prev,
                    { tipo: "bot", texto: resposta }
                ]);
            } catch (error) {
                setChat((prev) => [
                    ...prev,
                    { tipo: "bot", texto: "Erro ao responder 😢" }
                ]);
            } finally {
                setLoading(false);
            }
        }

        return (
            <div style={{ padding: 20 }}>
                <h2>Chat teste</h2>

                <div style={{ marginBottom: 20 }}>
                    {chat.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.tipo === "user" ? "Você:" : "IA:"}</strong>{" "}
                            {msg.texto}
                        </div>
                    ))}
                </div>

                <input
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Digite sua mensagem..."
                />

                <button onClick={handleEnviar} disabled={loading}>
                    {loading ? "Pensando..." : "Enviar"}
                </button>
            </div>
        );
    }