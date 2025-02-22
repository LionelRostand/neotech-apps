
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import DashboardLayout from "../components/layout/DashboardLayout"
import { useAuth } from "../hooks/useAuth"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Camera } from "lucide-react"
import { useState, useRef } from "react"
import { toast } from "sonner"

const Profile = () => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("L'image ne doit pas dépasser 5Mo");
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error("Le fichier doit être une image");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarUrl(e.target?.result as string);
        toast.success("Photo de profil mise à jour");
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (email: string) => {
    return email?.charAt(0).toUpperCase() || '?';
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Mon Profil</h1>

        <div className="max-w-2xl space-y-6">
          <Card className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt="Photo de profil" />
                ) : (
                  <AvatarFallback className="text-4xl bg-neotech-100">
                    {getInitials(user?.email || '')}
                  </AvatarFallback>
                )}
              </Avatar>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={triggerFileInput}
              >
                <Camera className="w-4 h-4" />
                Changer la photo
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Profile;
