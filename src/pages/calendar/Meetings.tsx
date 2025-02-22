
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MeetingsSidebar } from "@/components/meetings/MeetingsSidebar";
import { ParticipantsGrid } from "@/components/meetings/ParticipantsGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

const Meetings = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Réunions Vidéo</h1>
          <Button className="flex items-center gap-2">
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
                    ID de réunion: 123-456-789
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
