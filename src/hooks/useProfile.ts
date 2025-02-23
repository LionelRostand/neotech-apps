
import { useState } from 'react';
import { storage, db } from '@/lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from "sonner";

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadAvatar = async (userId: string, avatarDataUrl: string) => {
    console.log("Début de l'upload de l'avatar...");
    setIsLoading(true);
    try {
      // 1. Upload image to Storage
      console.log("Création de la référence storage...");
      const storageRef = ref(storage, `avatars/${userId}`);
      
      console.log("Upload de l'image...");
      await uploadString(storageRef, avatarDataUrl, 'data_url', {
        contentType: 'image/jpeg',
      });
      
      console.log("Récupération de l'URL de téléchargement...");
      const downloadUrl = await getDownloadURL(storageRef);
      
      // 2. Update Firestore document
      console.log("Mise à jour du document Firestore...");
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        avatarUrl: downloadUrl,
        updatedAt: new Date().toISOString()
      });

      console.log("Upload terminé avec succès !");
      toast.success("Photo de profil mise à jour avec succès");
      return downloadUrl;
    } catch (error: any) {
      console.error('Erreur détaillée lors de l\'upload:', error);
      if (error.code === 'storage/unauthorized') {
        toast.error("Erreur de permission: vous n'avez pas les droits nécessaires");
      } else if (error.code === 'storage/quota-exceeded') {
        toast.error("Quota de stockage dépassé");
      } else {
        toast.error("Erreur lors de la mise à jour de la photo de profil");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userId: string, data: { [key: string]: any }) => {
    console.log("Mise à jour du profil...", data);
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
      console.log("Profil mis à jour avec succès !");
      toast.success("Profil mis à jour avec succès");
      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      toast.error("Erreur lors de la mise à jour du profil");
      throw error;
    }
  };

  return {
    uploadAvatar,
    updateProfile,
    isLoading
  };
};

