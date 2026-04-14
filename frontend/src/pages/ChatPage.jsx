import React, { useState } from 'react';
import { ChatArea } from '../components/features/ChatArea';
import { sendMessage } from '../services/chatService';
import '../styles/pages/ChatPage.css';
import { postMetricas } from '../services/metricas';

export default function ChatPage() {
    const [isCreating, setIsCreating] = useState(false);

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

    const sendMessageHandler = async (message) => {
        if (!message.trim()) return;

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
            const resposta = await sendMessage(message);
            const botMessage = {
                id: Date.now() + 1,
                role: 'assistant',
                content: resposta,
                timestamp: new Date(),
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

    const newConversation = async () => {
        if(isCreating) return;

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
            />
        </div >
    )
}