import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserProfile } from './types';

interface AuthContextType {
  user: any | null; // Changed to 'any' to allow mock user
  profile: UserProfile | null;
  loading: boolean;
  loginMock: () => void;
  setProfile: (profile: any) => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, profile: null, loading: true, loginMock: () => {}, setProfile: () => {} });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loginMock = () => {
    const mockUser = { uid: 'dev-mock-user', email: 'dev@voiceclone.local' };
    setUser(mockUser);
    setProfile({
      id: 'dev-mock-user',
      uid: 'dev-mock-user',
      phoneNumber: '555-0199',
      displayName: 'Dev Tester',
      role: 'user',
      isProtected: true,
      language: 'en',
      riskThreshold: 75,
      createdAt: new Date().toISOString()
    });
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (user && user.uid === 'dev-mock-user') return; // Skip if mock
      setUser(firebaseUser);
      if (!firebaseUser) {
        setProfile(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (user && user.uid !== 'dev-mock-user') {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        if (doc.exists()) {
          setProfile({ id: doc.id, ...doc.data() } as any);
        }
        setLoading(false);
      }, (error) => {
        console.error("Profile fetch error:", error);
        setLoading(false);
      });
      return unsubscribe;
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, profile, loading, loginMock, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
