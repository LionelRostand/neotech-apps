
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { doc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface UserData {
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  displayName?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  department?: string;
  position?: string;
  status: 'active' | 'inactive';
}

const AuthContext = createContext<AuthContextType | null>(null);

// Cette fonction est maintenant interne au contexte et n'est plus exportée
const createUserDocument = async (user: User) => {
  try {
    const userData: UserData = {
      email: user.email || '',
      role: 'employee',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };

    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, userData);
    console.log("Document utilisateur créé avec succès:", user.uid);
    return true;
  } catch (error: any) {
    console.error("Erreur lors de la création du document utilisateur:", error);
    if (error.code === 'permission-denied') {
      console.error("Erreur de permission Firestore. Vérifiez les règles de sécurité.");
    }
    throw error;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Connexion réussie');
      navigate('/');
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      toast.error('Erreur de connexion. Vérifiez vos identifiants.');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success('Déconnexion réussie');
      navigate('/auth');
    } catch (error: any) {
      console.error('Erreur lors de la déconnexion:', error);
      toast.error('Erreur lors de la déconnexion');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
