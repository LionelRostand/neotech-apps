
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MeetingsSidebar } from "@/components/meetings/MeetingsSidebar";
import { ParticipantsGrid } from "@/components/meetings/ParticipantsGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Meetings = () => {
  const { toast } = useToast();
  const [meetingId, setMeetingId] = useState("123-456-789");

  const handleNewMeeting = () => {
    // Générer un nouvel ID de réunion (simplifié pour l'exemple)
    const newMeetingId = Math.random().toString(36).substring(2, 11);
    setMeetingId(newMeetingId);
    
    toast({
      title: "Nouvelle réunion créée",
      description: `ID de réunion : ${newMeetingId}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Réunions Vidéo</h1>
          <Button className="flex items-center gap-2" onClick={handleNewMeeting}>
            <Video className="w-4 h-4" />
            Nouvelle Réunion
          </Button>
        </div>

        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <MeetingsSidebar />
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>Salle de réunion principale</CardTitle>
                  <CardDescription>
                    ID de réunion: {meetingId}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ParticipantsGrid />
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </DashboardLayout>
  );
};

export default Meetings;
