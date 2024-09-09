'use client';

import { useState } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import ChatMenu from './ChatMenu';

export default function ChatScreen() {
  const [messages, setMessages] = useState<{ message: string; isSender: boolean }[]>([]);

  const handleSendMessage = (newMessage: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: newMessage, isSender: true },
    ]);
  };

  return (
    <div className="overflow-y-auto flex flex-col flex-auto h-full border-2 border-gray-300 rounded-2xl">
      <ChatMenu message="Loading...." />
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {messages.map((msg, index) => (
                <MessageBubble
                  key={index}
                  message={msg.message}
                  isSender={msg.isSender}
                  avatar="https://cdn-icons-png.flaticon.com/512/724/724715.png"
                />
              ))}
            </div>
          </div>
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
