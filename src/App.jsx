import React, { useState } from 'react';
import { Sidebar }  from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { useChat }  from './hooks/useChat';
import './styles/globals.css';
import './styles/App.css';

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const { messages, input, setInput, isTyping, sendMessage, newConversation } = useChat();

  return (
    <div className="app">
      <Sidebar activeItem={activeNav} onSelect={setActiveNav} />
      <ChatArea
        messages={messages}
        input={input}
        onInputChange={setInput}
        onSend={sendMessage}
        onNewConversation={newConversation}
        isTyping={isTyping}
      />
    </div>
  );
}
