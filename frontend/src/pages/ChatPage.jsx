import React, { useState } from 'react';
import { ChatArea } from '../components/features/ChatArea';
import { sendMessage } from '../services/chatService';
import '../styles/pages/ChatPage.css';
import { postMetricas, postFeedback } from '../services/metricas';
import AgendamentoModal from '../components/features/AgendamentoModal';

export default function ChatPage() {
    const [isCreating, setIsCreating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const [messages, setMessages] = useState([
        {
            id: 0,
            role: 'assistant',
            type: 'welcome',
            content: '',
            timestamp: new Date(),
        }
    ]);

    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // 🔍 Detecta intenção de agendamento
    const isAgendamento = (text) => {
        const palavras = ["agendar", "marcar", "atendimento"];
        return palavras.some(p => text.toLowerCase().includes(p));
    };

    // 💬 Envio de mensagem
    const sendMessageHandler = async (message) => {
        if (!message.trim()) return;

        if (!hasStarted) {
            await postMetricas();
            setHasStarted(true);
        }

        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: message,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const isAg = isAgendamento(message);

            let resposta;

            // 🔥 REGRA INTELIGENTE
            if (isAg) {
                resposta = "Você gostaria de agendar um atendimento presencial?";
            } else {
                resposta = await sendMessage(message);
            }

            const botMessage = {
                id: Date.now() + 1,
                role: 'assistant',
                content: resposta,
                timestamp: new Date(),
                showAgendar: isAg
            };

            setMessages((prev) => [...prev, botMessage]);

        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                role: 'assistant',
                content: 'Não conseguimos responder no momento. Por favor, tente novamente mais tarde.',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);

        } finally {
            setIsTyping(false);
        }
    };

    // 🔄 Nova conversa + métrica
    const newConversation = async () => {
        if (isCreating) return;

        setIsCreating(true);

        try {
            await postMetricas();

            setMessages([
                {
                    id: 0,
                    role: 'assistant',
                    type: 'welcome',
                    content: '',
                    timestamp: new Date(),
                }
            ]);

            setInput('');
            setIsTyping(false);

        } catch (error) {
            console.log('Erro ao registrar métrica');
        } finally {
            setIsCreating(false);
        }
    };

    // 👍 👎 Feedback com lógica completa
    const handleFeedback = async (isGood) => {
        try {
            await postFeedback(isGood);

            // 👍 positivo
            if (isGood) {
                const msg = {
                    id: Date.now(),
                    role: 'assistant',
                    content: "Fico feliz em ajudar! 😊",
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, msg]);
            }

            // 👎 negativo → sugere agendamento
            if (!isGood) {
                const botMessage = {
                    id: Date.now(),
                    role: 'assistant',
                    content: "Talvez possamos te ajudar melhor com um atendimento presencial. Deseja agendar?",
                    showAgendar: true,
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, botMessage]);
            }

        } catch (error) {
            console.log("Erro ao enviar feedback");
        }
    };

    // 🪟 Abrir modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    return (
        <div className="chat-page">
            <ChatArea
                messages={messages}
                input={input}
                onInputChange={setInput}
                onSend={sendMessageHandler}
                onNewConversation={newConversation}
                isTyping={isTyping}
                isCreating={isCreating}
                onOpenModal={handleOpenModal}
                onFeedback={handleFeedback}
            />

            {showModal && (
                <AgendamentoModal onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}