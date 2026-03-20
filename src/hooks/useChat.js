import { useState, useCallback } from 'react';

const INITIAL_MESSAGES = [
  {
    id: 'welcome',
    role: 'assistant',
    type: 'welcome',
    timestamp: new Date(),
  },
];

export function useChat() {
  const [messages, setMessages]   = useState(INITIAL_MESSAGES);
  const [input, setInput]         = useState('');
  const [isTyping, setIsTyping]   = useState(false);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id:        `user-${Date.now()}`,
      role:      'user',
      content:   text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 1200));

    const botMsg = {
      id:        `bot-${Date.now()}`,
      role:      'assistant',
      type:      'text',
      content:   'Entendido! Estou verificando as informações para você. Por favor, aguarde um momento. Se precisar de mais ajuda, fique à vontade para perguntar.',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  }, []);

  const newConversation = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
    setInput('');
    setIsTyping(false);
  }, []);

  return { messages, input, setInput, isTyping, sendMessage, newConversation };
}
