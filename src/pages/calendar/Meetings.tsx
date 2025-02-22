
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MeetingsSidebar } from "@/components/meetings/MeetingsSidebar";
import { ParticipantsGrid } from "@/components/meetings/ParticipantsGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NewMeetingDialog } from "@/components/meetings/NewMeetingDialog";

interface Participant {
  id: string;
  name: string;
}

const Meetings = () => {
  const [meetingId, setMeetingId] = useState("123-456-789");
  const [activeParticipants, setActiveParticipants] = useState<Participant[]>([]);

  const handleStartMeeting = (participants: Participant[], newMeetingId: string) => {
    setMeetingId(newMeetingId);
    setActiveParticipants(participants);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Réunions Vidéo</h1>
          <NewMeetingDialog onMeetingStart={handleStartMeeting} />
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
                  <ParticipantsGrid participants={activeParticipants} />
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
