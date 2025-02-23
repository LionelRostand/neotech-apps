
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "firebase/auth"
import { UserRole } from "@/types/auth"

interface ProfileInformationProps {
  user: User | null;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  getRoleName: (role: UserRole) => string;
}

export const ProfileInformation = ({ 
  user, 
  currentRole, 
  onRoleChange,
  getRoleName
}: ProfileInformationProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          value={user?.email || ''} 
          readOnly 
          className="bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Rôle actuel</Label>
        <Select
          value={currentRole}
          onValueChange={onRoleChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez un rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrateur</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="accountant">Comptable</SelectItem>
            <SelectItem value="user">Employé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="created">Membre depuis</Label>
        <Input 
          id="created" 
          value={user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : '-'} 
          readOnly 
          className="bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastLogin">Dernière connexion</Label>
        <Input 
          id="lastLogin" 
          value={user?.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : '-'} 
          readOnly 
          className="bg-gray-50"
        />
      </div>
    </div>
  );
};

