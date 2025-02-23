
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";

export const TimezoneSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuseau horaire</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="timezone">Fuseau horaire</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un fuseau horaire" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Europe/Paris">Europe/Paris (UTC+1)</SelectItem>
              <SelectItem value="Europe/London">Europe/London (UTC)</SelectItem>
              <SelectItem value="America/New_York">America/New_York (UTC-5)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
