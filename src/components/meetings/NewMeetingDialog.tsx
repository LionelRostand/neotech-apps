
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Participant {
  id: string;
  name: string;
}

const availableParticipants: Participant[] = [
  { id: "1", name: "Alice Martin" },
  { id: "2", name: "Bob Dubois" },
  { id: "3", name: "Claire Dupont" },
  { id: "4", name: "David Bernard" },
];

interface NewMeetingDialogProps {
  onMeetingStart: (participants: Participant[], meetingId: string) => void;
}

export const NewMeetingDialog = ({ onMeetingStart }: NewMeetingDialogProps) => {
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleStartMeeting = () => {
    const newMeetingId = Math.random().toString(36).substring(2, 11);
    const selectedParticipantDetails = availableParticipants.filter((p) =>
      selectedParticipants.includes(p.id)
    );

    onMeetingStart(selectedParticipantDetails, newMeetingId);
    setIsOpen(false);
    
    toast({
      title: "Nouvelle réunion créée",
      description: `ID de réunion : ${newMeetingId}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Video className="w-4 h-4" />
          Nouvelle Réunion
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle Réunion Vidéo</DialogTitle>
          <DialogDescription>
            Sélectionnez les participants pour votre réunion
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            {availableParticipants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={participant.id}
                  checked={selectedParticipants.includes(participant.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedParticipants((prev) => [...prev, participant.id]);
                    } else {
                      setSelectedParticipants((prev) =>
                        prev.filter((id) => id !== participant.id)
                      );
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor={participant.id}>{participant.name}</label>
              </div>
            ))}
          </div>

          <Button
            onClick={handleStartMeeting}
            disabled={selectedParticipants.length === 0}
            className="w-full"
          >
            Démarrer la réunion
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
