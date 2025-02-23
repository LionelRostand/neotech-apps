
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "../components/layout/DashboardLayout"
import { useAuth } from "../hooks/useAuth"
import { usePermissions } from "../hooks/usePermissions"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { UserRole } from "@/types/auth"
import { ProfileAvatar } from "@/components/profile/ProfileAvatar"
import { ProfileInformation } from "@/components/profile/ProfileInformation"
import { useProfile } from "@/hooks/useProfile"

const Profile = () => {
  const { user } = useAuth();
  const { role, updateUserRole } = usePermissions();
  const { uploadAvatar, updateProfile, isLoading } = useProfile();
  const [currentRole, setCurrentRole] = useState<UserRole>(role);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    setCurrentRole(role);
  }, [role]);

  const handleRoleChange = async (newRole: UserRole) => {
    if (!user) {
      toast.error("Vous devez être connecté pour effectuer cette action");
      return;
    }
    
    try {
      await updateUserRole(user.uid, newRole);
      setCurrentRole(newRole);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle:", error);
    }
  };

  const handleAvatarChange = async (dataUrl: string) => {
    if (!user) return;
    try {
      const url = await uploadAvatar(user.uid, dataUrl);
      setAvatarUrl(url);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'avatar:", error);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    try {
      await updateProfile(user.uid, {
        role: currentRole,
        avatarUrl: avatarUrl
      });
    } catch (error) {
      throw error;
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

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Mon Profil</h1>

        <div className="max-w-2xl space-y-6">
          <Card className="p-6">
            <ProfileAvatar 
              email={user?.email}
              avatarUrl={avatarUrl}
              onAvatarChange={handleAvatarChange}
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
                onSave={handleSaveProfile}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;

