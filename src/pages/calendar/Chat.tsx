
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Chat = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Chat</h2>
      </div>
      
      <div className="h-[600px] flex flex-col">
        <ScrollArea className="flex-1 p-4 border rounded-t-md">
          <p className="text-muted-foreground text-center">Aucun message.</p>
        </ScrollArea>
        
        <div className="border rounded-b-md p-4 flex gap-2">
          <Input placeholder="Écrivez votre message..." className="flex-1" />
          <Button>Envoyer</Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
