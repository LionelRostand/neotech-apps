
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

interface Participant {
  id: string;
  name: string;
  isVideoEnabled?: boolean;
  isAudioEnabled?: boolean;
  stream?: MediaStream;
}

interface ParticipantsGridProps {
  participants: Participant[];
}

export const ParticipantsGrid = ({ participants }: ParticipantsGridProps) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    // Demander l'accès à la caméra au chargement
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: true
        });
        setLocalStream(stream);
      } catch (err) {
        console.error("Erreur d'accès à la caméra:", err);
      }
    };
    
    startVideo();

    // Cleanup
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Attacher le flux vidéo local aux éléments vidéo
    if (localStream) {
      Object.values(videoRefs.current).forEach(videoEl => {
        if (videoEl && !videoEl.srcObject) {
          videoEl.srcObject = localStream;
        }
      });
    }
  }, [localStream, participants]);

  const displayParticipants = participants.length > 0 
    ? participants.map(p => ({
        ...p,
        isVideoEnabled: true,
        isAudioEnabled: true
      }))
    : [
        { id: "1", name: "Alice Martin", isVideoEnabled: true, isAudioEnabled: true },
        { id: "2", name: "Bob Dubois", isVideoEnabled: true, isAudioEnabled: false },
        { id: "3", name: "Claire Dupont", isVideoEnabled: false, isAudioEnabled: true },
      ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {displayParticipants.map((participant) => (
        <Card key={participant.id} className="relative aspect-video bg-gray-100 overflow-hidden">
          {participant.isVideoEnabled ? (
            <video
              ref={el => videoRefs.current[participant.id] = el}
              autoPlay
              playsInline
              muted={!participant.isAudioEnabled}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <User className="w-20 h-20 text-gray-400" />
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
            {participant.name} {!participant.isAudioEnabled && "🔇"}
          </div>
        </Card>
      ))}
    </div>
  );
};

