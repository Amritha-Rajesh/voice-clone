import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Shield, Phone, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { user: currentUser, loginMock } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'login' | 'phone'>('login');
  const [debugMsg, setDebugMsg] = useState('Waiting for login...');

  // Auto-redirect if already logged in!
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setDebugMsg('Opening Google Popup...');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      setDebugMsg(`Found user: ${result.user.email}. Checking profile...`);
      const user = result.user;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          setStep('phone');
          setDebugMsg('Ready for phone number setup.');
        } else {
          setDebugMsg('User exists, heading to dashboard...');
          navigate('/');
        }
      } catch (dbError: any) {
        setDebugMsg(`Firestore Error: ${dbError.message} (Is your Firestore Database set up in Test Mode?)`);
      }
    } catch (error: any) {
      console.error("Login popup error:", error);
      setDebugMsg(`Popup Error: ${error.message} (Try temporarily disabling popup blockers or third-party cookie restrictions)`);
      toast.error("Failed to login");
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        uid: auth.currentUser.uid,
        phoneNumber,
        displayName: auth.currentUser.displayName,
        role: 'user',
        isProtected: true,
        language: 'en',
        riskThreshold: 75,
        createdAt: new Date().toISOString(),
      });
      navigate('/onboarding');
    } catch (error) {
      console.error("Profile creation error:", error);
      toast.error("Failed to save profile");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-zinc-950">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center">
            <Shield size={40} className="text-primary fill-current" />
          </div>
          <h1 className="text-3xl font-headline font-bold">VoiceClone Alert</h1>
          <p className="text-zinc-500">Protecting your voice from AI deepfakes.</p>
          <div className="text-xs text-red-500 max-w-xs break-words border p-2 rounded bg-red-50">{debugMsg}</div>
        </div>

        {step === 'login' ? (
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-4 rounded-2xl font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>
            <button
              onClick={() => loginMock()}
              className="w-full flex items-center justify-center gap-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 py-4 rounded-2xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Quick Test / Dev Mode
            </button>
          </div>
        ) : (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary font-medium"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              Complete Setup <ArrowRight size={20} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
