
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "../components/layout/DashboardLayout"
import { useAuth } from "../hooks/useAuth"
import { usePermissions } from "../hooks/usePermissions"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { UserRole } from "@/types/auth"
import { ProfileAvatar } from "@/components/profile/ProfileAvatar"
import { ProfileInformation } from "@/components/profile/ProfileInformation"

const Profile = () => {
  const { user } = useAuth();
  const { role, updateUserRole } = usePermissions();
  const [currentRole, setCurrentRole] = useState<UserRole>(role);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    setCurrentRole(role);
    console.log("Current role:", role);
  }, [role]);

  const handleRoleChange = async (newRole: UserRole) => {
    if (!user) return;
    try {
      console.log("Updating role to:", newRole);
      await updateUserRole(user.uid, newRole);
      setCurrentRole(newRole);
      toast.success("Rôle mis à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle:", error);
      toast.error("Erreur lors de la mise à jour du rôle");
    }
  };

  const getRoleName = (role: UserRole): string => {
    switch (role) {
      case 'admin':
        return 'Administrateur';
      case 'manager':
        return 'Manager';
      case 'accountant':
        return 'Comptable';
      case 'user':
        return 'Employé';
      default:
        return 'Employé';
    }
  };

  console.log("Role dans Profile:", role);
  console.log("Est-ce un admin ?", role === 'admin');
  console.log("Email de l'utilisateur:", user?.email);

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Mon Profil</h1>

        <div className="max-w-2xl space-y-6">
          <Card className="p-6">
            <ProfileAvatar 
              email={user?.email}
              avatarUrl={avatarUrl}
              onAvatarChange={setAvatarUrl}
            />
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileInformation 
                user={user}
                currentRole={currentRole}
                onRoleChange={handleRoleChange}
                getRoleName={getRoleName}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;

