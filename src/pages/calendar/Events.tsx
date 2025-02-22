
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

// Temporary mock data - to be replaced with real API calls
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Réunion d'équipe",
    description: "Réunion hebdomadaire de l'équipe de développement",
    date: "2024-04-15",
    time: "10:00",
    location: "Salle de conférence A",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
  },
  {
    id: "2",
    title: "Formation React",
    description: "Session de formation sur les nouveautés de React",
    date: "2024-04-16",
    time: "14:30",
    location: "Salle de formation B",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  }
];

const Events = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Temporary query using mock data
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: () => Promise.resolve(mockEvents),
  });

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mes Événements</h1>
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Nouvel Événement
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Calendrier</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="font-medium">
                    {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </span>
                  <Button variant="outline" size="icon" onClick={handleNextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar grid will be implemented here */}
              <div className="h-96 flex items-center justify-center text-gray-500">
                Calendrier en cours d'implémentation
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events Section */}
          <Card>
            <CardHeader>
              <CardTitle>Prochains Événements</CardTitle>
              <CardDescription>Vos événements à venir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading ? (
                  <p>Chargement des événements...</p>
                ) : (
                  events?.map((event) => (
                    <div
                      key={event.id}
                      className="flex gap-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{event.title}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {new Date(event.date).toLocaleDateString('fr-FR', { 
                            day: 'numeric',
                            month: 'long'
                          })} - {event.time}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Events;
