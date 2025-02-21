
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import DashboardLayout from "../components/layout/DashboardLayout"
import { useAuth } from "../hooks/useAuth"

const Profile = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Mon Profil</h1>

        <Card className="max-w-2xl">
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
    </DashboardLayout>
  )
}

export default Profile;
