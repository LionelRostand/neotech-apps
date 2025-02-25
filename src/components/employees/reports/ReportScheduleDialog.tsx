
import { Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ReportScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleEmail: string;
  setScheduleEmail: (email: string) => void;
  scheduleFrequency: string;
  setScheduleFrequency: (frequency: string) => void;
  onSave: () => void;
}

const ReportScheduleDialog = ({
  open,
  onOpenChange,
  scheduleEmail,
  setScheduleEmail,
  scheduleFrequency,
  setScheduleFrequency,
  onSave,
}: ReportScheduleDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Planifier l'envoi du rapport</DialogTitle>
          <DialogDescription>
            Configurez la fréquence d'envoi et l'adresse email de destination.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="schedule-email" className="text-right">
              Email
            </Label>
            <Input
              id="schedule-email"
              type="email"
              value={scheduleEmail}
              onChange={(e) => setScheduleEmail(e.target.value)}
              className="col-span-3"
              placeholder="exemple@entreprise.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="schedule-frequency" className="text-right">
              Fréquence
            </Label>
            <Select
              value={scheduleFrequency}
              onValueChange={setScheduleFrequency}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionnez une fréquence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Quotidien</SelectItem>
                <SelectItem value="weekly">Hebdomadaire</SelectItem>
                <SelectItem value="monthly">Mensuel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={onSave}>
            <Calendar className="w-4 h-4 mr-2" />
            Planifier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportScheduleDialog;
