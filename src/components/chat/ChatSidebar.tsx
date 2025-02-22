
import React from 'react';
import { MessageSquare, Search, User, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Contact {
  id: string;
  name: string;
  lastMessage?: string;
  timestamp?: string;
  isOnline: boolean;
}

interface ChatSidebarProps {
  onSelectContact: (contact: Contact) => void;
  selectedContactId?: string;
  contacts: Contact[];
}

const ChatSidebar = ({ onSelectContact, selectedContactId, contacts }: ChatSidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-80 border-r border-gray-200 h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/calendar')}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Button>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Messages
          </h2>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher..."
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
              selectedContactId === contact.id ? 'bg-neotech-50' : ''
            }`}
          >
            <div className="relative">
              <User className="w-10 h-10 bg-gray-100 rounded-full p-2" />
              {contact.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-medium text-gray-900">{contact.name}</h3>
              {contact.lastMessage && (
                <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
              )}
            </div>
            {contact.timestamp && (
              <span className="text-xs text-gray-400">{contact.timestamp}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;

