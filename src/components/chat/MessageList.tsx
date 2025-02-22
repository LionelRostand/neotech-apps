
import React from 'react';
import { User } from 'lucide-react';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${message.isCurrentUser ? 'flex-row-reverse' : ''}`}
        >
          <User className="w-8 h-8 bg-gray-100 rounded-full p-1.5 flex-shrink-0" />
          <div
            className={`rounded-lg px-4 py-2 max-w-[70%] ${
              message.isCurrentUser
                ? 'bg-neotech-500 text-white'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <span className={`text-xs mt-1 block ${message.isCurrentUser ? 'text-neotech-50' : 'text-gray-500'}`}>
              {message.timestamp}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
