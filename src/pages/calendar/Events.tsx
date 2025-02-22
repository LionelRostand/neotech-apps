
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlusCircle, Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const { toast } = useToast();

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouvel événement:", newEvent);
    toast({
      title: "Événement créé",
      description: "Votre nouvel événement a été créé avec succès.",
    });
    setDialogOpen(false);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
    });
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
  const days = [];
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-12 border border-gray-100"></div>);
  }

  // Add cells for each day of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
    const isToday = new Date().toDateString() === date.toDateString();
    const hasEvent = events?.some(event => new Date(event.date).toDateString() === date.toDateString());
    
    days.push(
      <div 
        key={i}
        className={`h-12 border border-gray-100 p-1 cursor-pointer hover:bg-gray-50 ${
          isToday ? 'bg-blue-50' : ''
        }`}
      >
        <span className={`text-sm ${hasEvent ? 'font-bold text-blue-600' : ''}`}>{i}</span>
        {hasEvent && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mes Événements</h1>
          <Button onClick={() => setDialogOpen(true)} className="flex items-center gap-2">
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
              <div className="grid grid-cols-7 gap-0">
                {dayNames.map((day) => (
                  <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                {days}
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

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvel Événement</DialogTitle>
              <DialogDescription>
                Créez un nouvel événement en remplissant le formulaire ci-dessous.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    required
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      required
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Heure</Label>
                    <Input
                      id="time"
                      required
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Lieu</Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Créer l'événement</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Events;

