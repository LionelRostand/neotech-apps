
import { useState } from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import MessageList, { Message } from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";

interface Contact {
  id: string;
  name: string;
  lastMessage?: string;
  timestamp?: string;
  isOnline: boolean;
}

const defaultContacts: Contact[] = [
  { id: '1', name: 'Alice Martin', lastMessage: 'Bonjour!', timestamp: '10:30', isOnline: true },
  { id: '2', name: 'Bob Dubois', lastMessage: 'À plus tard', timestamp: '09:15', isOnline: false },
  { id: '3', name: 'Claire Dupont', lastMessage: 'Merci', timestamp: 'Hier', isOnline: true },
];

const Chat = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(defaultContacts[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour ! Comment puis-je vous aider ?",
      senderId: '2',
      timestamp: "10:30",
      isCurrentUser: false,
    },
    {
      id: '2',
      content: "J'ai une question concernant le projet.",
      senderId: '1',
      timestamp: "10:31",
      isCurrentUser: true,
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId: '1',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      <ChatSidebar
        onSelectContact={setSelectedContact}
        selectedContactId={selectedContact?.id}
      />
      {selectedContact ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 bg-white border-b border-gray-200">
            <h2 className="font-semibold">
              {selectedContact.name}
              <span className="ml-2 text-sm font-normal text-gray-500">
                {selectedContact.isOnline ? "En ligne" : "Hors ligne"}
              </span>
            </h2>
          </div>
          <MessageList messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Sélectionnez un contact pour démarrer une conversation
        </div>
      )}
    </div>
  );
};

export default Chat;
