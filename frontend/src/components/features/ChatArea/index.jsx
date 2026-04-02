import React, { useRef, useEffect } from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import { MessageBubble, TypingIndicator } from '../../shared/MessageBubble';
import { ChatInput } from '../../shared/ChatInput';
import './ChatArea.css';


export function ChatArea({ messages, input, onInputChange, onSend, onNewConversation, isTyping }) {
  const bottomRef = useRef(null);

  useEffect(() => { 
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <section className="chat-area" aria-label="Área do chat">
      <header className="chat-area__header">
        <div className="chat-area__header-left">
          <button className="chat-area__menu-btn" aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
          <div className="chat-area__header-title">
            <MessageSquare size={16} className='chat-area__header-icon'/>
            <h1 className="chat-area__title">Assistente Virtual UNICID</h1>
          </div>
        </div>

        <button className="chat-area__new-btn" onClick={onNewConversation} aria-label="Nova conversa">
          <Plus size={16} />
          Nova conversa
        </button>
      </header>

      <main className="chat-area__messages" role="log" aria-live="polite" aria-label="Mensagens">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} aria-hidden="true" style={{ height: 1 }} />
      </main>

      <ChatInput
        value={input}
        onChange={onInputChange}
        onSend={onSend}
        disabled={isTyping}
      />
    </section>
  );
}
