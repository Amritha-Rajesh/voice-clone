import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { Globe, Bell, Shield, Lock, LogOut, ChevronRight, Moon, User, Phone, Edit2, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { t, Language } from '../i18n';

const Settings = () => {
  const { profile, user, setProfile } = useAuth();
  const lang = (profile?.language || 'en') as Language;
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'System');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');

  const openProfileEdit = () => {
    setEditName(profile?.displayName || '');
    setEditPhone(profile?.phoneNumber || '');
    setEditingProfile(true);
  };

  const saveProfile = async () => {
    const updated = { ...profile, displayName: editName, phoneNumber: editPhone };
    setProfile(updated);
    setEditingProfile(false);

    if (!user || user.uid === 'dev-mock-user') {
      toast.success('Profile updated (mock mode)!');
      return;
    }
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: editName,
        phoneNumber: editPhone,
      });
      toast.success('Profile updated!');
    } catch (e) {
      console.warn('Firestore save failed silently, UI still updated');
    }
  };

  const handleUpdate = async (field: string, value: any) => {
    // Optimistically update the UI
    setProfile({ ...profile, [field]: value });

    if (!user || user.uid === 'dev-mock-user') {
      toast.success(`Updated ${field}!`);
      return;
    }
    try {
      await updateDoc(doc(db, 'users', user.uid), { [field]: value });
      toast.success('Settings updated!');
    } catch (error: any) {
      console.warn('Silent Firestore fail, UI updated locally:', error);
    }
  };

  const cycleLanguage = () => {
    const langs = ['en', 'hi', 'ml'];
    const currentIdx = langs.indexOf(profile?.language || 'en');
    handleUpdate('language', langs[(currentIdx + 1) % langs.length]);
  };

  const cycleThreshold = () => {
    const thresholds = [50, 75, 90, 95];
    const currentIdx = thresholds.indexOf(profile?.riskThreshold || 75);
    handleUpdate('riskThreshold', thresholds[(currentIdx + 1) % thresholds.length]);
  };

  const toggleTheme = () => {
    const modes = ['System', 'Dark', 'Light'];
    const next = modes[(modes.indexOf(theme) + 1) % modes.length];
    setTheme(next);
    localStorage.setItem('theme', next);
    if (next === 'Dark' || (next === 'System' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    toast.success(`Theme set to ${next}`);
  };

  const settingRows = [
    { label: t(lang, 'language'), icon: Globe, value: profile?.language === 'hi' ? t(lang, 'hindi') : profile?.language === 'ml' ? t(lang, 'malayalam') : t(lang, 'english'), action: cycleLanguage },
    { label: t(lang, 'sensitivityThreshold'), icon: Shield, value: `${profile?.riskThreshold || 75}%`, action: cycleThreshold },
    { label: t(lang, 'autoBlockCalls'), icon: Lock, value: profile?.isProtected ? t(lang, 'on') : t(lang, 'off'), action: () => handleUpdate('isProtected', !profile?.isProtected) },
    { label: t(lang, 'emergencyNotifications'), icon: Bell, value: t(lang, 'on'), action: () => toast.info('Locked to ON for safety') },
    { label: t(lang, 'darkMode'), icon: Moon, value: theme, action: toggleTheme },
  ];

  return (
    <main className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 pt-12 px-6 pb-24 space-y-8">
      <header>
        <h1 className="text-3xl font-headline font-bold">{t(lang, 'settings')}</h1>
      </header>

      <div className="space-y-8">

        {/* ── Profile Info Card ── */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] px-2">{t(lang, 'account')}</h3>
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800 p-5">
            {!editingProfile ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                    {user?.photoURL
                      ? <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                      : <User size={28} className="text-zinc-400" />}
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-zinc-50">{profile?.displayName || t(lang, 'noNameSet')}</p>
                    <p className="text-xs text-zinc-400">{profile?.phoneNumber || t(lang, 'noPhoneSet')}</p>
                    <p className="text-xs text-zinc-400">{user?.email || ''}</p>
                  </div>
                </div>
                <button
                  onClick={openProfileEdit}
                  className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Edit2 size={18} />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Edit2 size={16} className="text-primary" />
                  <span className="font-bold text-sm">{t(lang, 'editProfile')}</span>
                </div>
                <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl px-4 py-3">
                  <User size={16} className="text-zinc-400" />
                  <input
                    type="text"
                    className="flex-1 bg-transparent text-sm font-medium outline-none text-zinc-900 dark:text-zinc-50 placeholder-zinc-400"
                    placeholder={t(lang, 'displayName')}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl px-4 py-3">
                  <Phone size={16} className="text-zinc-400" />
                  <input
                    type="tel"
                    className="flex-1 bg-transparent text-sm font-medium outline-none text-zinc-900 dark:text-zinc-50 placeholder-zinc-400"
                    placeholder={t(lang, 'phoneNumber')}
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setEditingProfile(false)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold text-sm"
                  >
                    <X size={16} /> {t(lang, 'cancel')}
                  </button>
                  <button
                    onClick={saveProfile}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-bold text-sm"
                  >
                    <Check size={16} /> {t(lang, 'save')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Other Settings ── */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] px-2">{t(lang, 'preferences')}</h3>
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800">
            {settingRows.map((item, j) => (
              <button
                key={j}
                onClick={item.action}
                className="w-full flex items-center justify-between p-5 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border-b border-zinc-50 dark:border-zinc-800 last:border-none cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                    <item.icon size={20} />
                  </div>
                  <span className="font-bold text-zinc-900 dark:text-zinc-50">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-zinc-400">{item.value}</span>
                  <ChevronRight size={16} className="text-zinc-300" />
                </div>
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={async () => {
            if (user?.uid !== 'dev-mock-user') await signOut(auth);
            else toast.success('Signed out of mock mode — refresh to reset');
          }}
          className="w-full flex items-center justify-center gap-3 text-primary font-bold py-6 rounded-[2rem] bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
        >
          <LogOut size={20} />
          {t(lang, 'signOut')}
        </button>

        <div className="text-center space-y-1">
          <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">VoiceClone Alert v1.0.0</p>
          <p className="text-[10px] text-zinc-400 font-medium">Complying with India's DPDP Act 2023</p>
        </div>
      </div>
    </main>
  );
};

export default Settings;


