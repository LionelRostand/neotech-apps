
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
      // 1. Upload image to Storage with metadata
      const storageRef = ref(storage, `avatars/${userId}`);
      await uploadString(storageRef, avatarDataUrl, 'data_url', {
        contentType: 'image/jpeg',
      });
      
      const downloadUrl = await getDownloadURL(storageRef);
      
      // 2. Update Firestore document
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        avatarUrl: downloadUrl,
        updatedAt: new Date().toISOString()
      });

      toast.success("Photo de profil mise à jour avec succès");
      return downloadUrl;
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour de l\'avatar:', error);
      if (error.code === 'storage/unauthorized') {
        toast.error("Erreur d'autorisation lors de l'upload de l'image");
      } else {
        toast.error("Erreur lors de la mise à jour de la photo de profil");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userId: string, data: { [key: string]: any }) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw error;
    }
  };

  return {
    uploadAvatar,
    updateProfile,
    isLoading
  };
};

