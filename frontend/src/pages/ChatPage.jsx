import React, { useState } from 'react';
import { ChatArea } from '../components/features/ChatArea';
import { sendMessage } from '../services/chatService';
import '../styles/pages/ChatPage.css';

export default function ChatPage() {

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

        try {
            //criar endpoint específico para isso ainda
            // await api.post('/chat/nova-conversa');
        } catch (error) {
            console.log('backend ainda não implementado');
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
            />
        </div >
    )
}