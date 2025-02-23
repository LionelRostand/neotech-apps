
import { useState } from 'react';
import { storage, db } from '@/lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from "sonner";

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadAvatar = async (userId: string, avatarDataUrl: string) => {
    setIsLoading(true);
    try {
      const storageRef = ref(storage, `avatars/${userId}`);
      await uploadString(storageRef, avatarDataUrl, 'data_url');
      const downloadUrl = await getDownloadURL(storageRef);
      
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        avatarUrl: downloadUrl
      });

      toast.success("Photo de profil mise à jour avec succès");
      return downloadUrl;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'avatar:', error);
      toast.error("Erreur lors de la mise à jour de la photo de profil");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadAvatar,
    isLoading
  };
};
