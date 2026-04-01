import React, { useState } from 'react';
import { Sidebar }  from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { sendMessage } from './services/chatService';
import './styles/globals.css';
import './styles/App.css';

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
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
        content: 'Erro ao responder 😢',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const newConversation = () => {
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
  };

  return (
    <div className="app">
      <Sidebar activeItem={activeNav} onSelect={setActiveNav} />
      <ChatArea
        messages={messages}
        input={input} 
        onInputChange={setInput}
        onSend={sendMessageHandler}
        onNewConversation={newConversation}
        isTyping={isTyping}
      />
    </div>
  );
}
