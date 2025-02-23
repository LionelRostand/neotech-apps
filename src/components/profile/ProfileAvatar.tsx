
import * as React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { toast } from "sonner"

interface ProfileAvatarProps {
  email: string | null | undefined;
  avatarUrl: string | null;
  onAvatarChange: (url: string) => void;
}

export const ProfileAvatar = ({ email, avatarUrl, onAvatarChange }: ProfileAvatarProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = React.useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

      setLoading(true);
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const dataUrl = e.target?.result as string;
          await onAvatarChange(dataUrl);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Erreur lors de la lecture du fichier:", error);
        toast.error("Erreur lors du chargement de l'image");
      } finally {
        setLoading(false);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (email: string) => {
    return email?.charAt(0).toUpperCase() || '?';
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-32 w-32">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt="Photo de profil" />
        ) : (
          <AvatarFallback className="text-4xl bg-neotech-100">
            {getInitials(email || '')}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="text-center">
        <div className="font-medium text-lg">{email}</div>
      </div>
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={triggerFileInput}
        disabled={loading}
      >
        <Camera className="w-4 h-4" />
        {loading ? "Chargement..." : "Changer la photo"}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};
