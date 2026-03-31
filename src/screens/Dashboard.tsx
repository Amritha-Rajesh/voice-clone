import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Shield, ShieldAlert, CheckCircle, MoreVertical, PlusCircle, History, Users, UserCheck, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { t, Language } from '../i18n';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'sonner';

const Dashboard = () => {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const lang = (profile?.language || 'en') as Language;
  const [guardians, setGuardians] = useState<any[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'users', user.uid, 'guardians'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setGuardians(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [user]);

  const deleteGuardian = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'guardians', id));
      toast.success('Guardian removed');
    } catch {
      toast.error('Failed to remove guardian');
    }
    setActiveMenu(null);
  };

  // Determine an exact real name to show instead of just 'User'
  const realName = profile?.displayName 
    ? profile.displayName.split(' ')[0] 
    : user?.displayName 
      ? user.displayName.split(' ')[0] 
      : user?.email 
        ? user.email.split('@')[0] 
        : 'Guest';

  return (
    <main className="pt-12 px-6 max-w-lg mx-auto space-y-8">
      {/* Top Bar */}
      <header className="flex justify-between items-center h-16 w-full">
        <div className="flex items-center gap-3">
          <Shield className="text-[#E24B4A] fill-current" size={24} />
          <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 font-headline tracking-tight">{t(lang, 'appName')}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-zinc-900 dark:text-zinc-50 text-xs font-semibold tracking-widest hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors px-3 py-1 rounded-lg">
            {profile?.language?.toUpperCase() || 'EN'}
          </button>
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
             {user?.photoURL ? <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" /> : <Users size={16} className="text-zinc-500" />}
          </div>
        </div>
      </header>

      {/* Greeting Section */}
      <div className="pt-2 pb-4">
        <h2 className="text-2xl font-headline font-bold text-zinc-900 dark:text-zinc-50 tracking-tight capitalize">
          {t(lang, 'helloUser')}, {realName} 👋
        </h2>
        <p className="text-zinc-500 text-sm">{t(lang, 'welcomeBack')}</p>
      </div>

      {/* Hero Status Shield Section */}
      <section className="flex flex-col items-center justify-center text-center space-y-6 pt-4">
        <div className="relative group">
          {/* Enhanced Outer Glow */}
          <div className="absolute inset-0 bg-tertiary/25 blur-[40px] rounded-full scale-110 opacity-60"></div>
          
          {/* Premium Shield Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-44 h-52 bg-gradient-to-b from-tertiary via-tertiary to-tertiary-container rounded-[3rem] flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,106,53,0.3)] overflow-hidden border border-white/30"
          >
            {/* Inner Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
            
            {/* Main Icon Group */}
            <div className="relative flex flex-col items-center">
              <div className="absolute -inset-4 bg-white/10 blur-xl rounded-full"></div>
              <Shield size={72} className="text-white relative" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1">
                <CheckCircle size={32} className="text-tertiary-fixed font-bold" />
              </div>
            </div>
            
            <div className="mt-4 text-center z-10">
              <span className="text-white/70 font-headline font-light text-[10px] tracking-[0.3em] uppercase block mb-1">{t(lang, 'protection')}</span>
              <span className="text-white font-headline font-bold text-2xl tracking-widest">{t(lang, 'protectionActive')}</span>
            </div>
          </motion.div>

          {/* Refined Floating Indicator Badge */}
          <div className="absolute -top-1 -right-1 bg-white dark:bg-zinc-800 text-tertiary px-3 py-1.5 rounded-full shadow-xl flex items-center gap-2 border border-tertiary/20 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span className="text-[9px] font-black tracking-widest uppercase">{t(lang, 'secured')}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-headline font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">{t(lang, 'voiceProtected')}</h2>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">{t(lang, 'voiceProtectedDesc')}</p>
        </div>
      </section>

      {/* Bento Grid: Stats and Action */}
      <section className="grid grid-cols-2 gap-4">
        {/* Monthly Scams Card */}
        <div className="col-span-2 bg-white dark:bg-zinc-900 p-6 rounded-[2rem] shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Numbers Registered</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-headline font-black text-tertiary">12</span>
              <span className="text-zinc-400 font-bold text-sm">Protected</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-zinc-400">
              <UserCheck size={14} />
              <p className="text-[10px] font-medium">Scanning all incoming ID registers</p>
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-tertiary/5 flex items-center justify-center">
            <Shield size={32} className="text-tertiary" />
          </div>
        </div>

        {/* Risk Meter (Small Context) */}
        <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-[2rem] flex flex-col justify-between aspect-square">
          <History size={24} className="text-zinc-500" />
          <div className="space-y-1">
            <p className="text-2xl font-headline font-bold">0.02%</p>
            <p className="text-[10px] text-zinc-500 font-medium">Global Risk Index</p>
          </div>
        </div>

        {/* Quick Tip Card */}
        <div className="bg-[#E24B4A]/10 p-5 rounded-[2rem] flex flex-col justify-between aspect-square">
          <Shield size={24} className="text-primary" />
          <p className="text-xs font-semibold leading-snug text-primary">Setup unique "Safe Phrases" for family.</p>
        </div>
      </section>

      {/* Family Protected List */}
      <section className="space-y-4" onClick={() => setActiveMenu(null)}>
        <div className="flex justify-between items-end px-2">
          <div className="space-y-1">
            <h3 className="font-headline font-bold text-xl">{t(lang, 'familyCircle')}</h3>
            <p className="text-xs text-zinc-500">
              {guardians.length > 0
                ? `${guardians.length} ${t(lang, 'membersMonitoring')}`
                : t(lang, 'noFamilyMembers')}
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); navigate('/family'); }}
            className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
          >
            {t(lang, 'viewAll')}
          </button>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {guardians.slice(0, 3).map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -60 }}
                className="bg-white dark:bg-zinc-900 p-4 rounded-2xl flex items-center justify-between shadow-sm border border-zinc-100 dark:border-zinc-800 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-lg text-primary">
                    {member.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-zinc-50">{member.name}</p>
                    <p className="text-[10px] text-zinc-400">{member.relation} · {member.phoneNumber}</p>
                    <p className={cn(
                      "text-[11px] flex items-center gap-1 mt-0.5",
                      member.status === 'Protected' ? 'text-tertiary' : 'text-amber-500'
                    )}>
                      <CheckCircle size={9} className="fill-current" />
                      {member.status || t(lang, 'pending')}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === member.id ? null : member.id)}
                    className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {activeMenu === member.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 top-10 z-20 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-700 w-40 overflow-hidden"
                    >
                      <button
                        onClick={() => { navigate('/family'); setActiveMenu(null); }}
                        className="w-full px-4 py-3 text-sm text-left font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => deleteGuardian(member.id)}
                        className="w-full px-4 py-3 text-sm text-left font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {guardians.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-zinc-50 dark:bg-zinc-900/50 border-2 border-dashed border-zinc-200 dark:border-zinc-700 p-6 rounded-2xl text-center space-y-2"
            >
              <Users size={28} className="text-zinc-300 mx-auto" />
              <p className="text-sm text-zinc-400 font-medium">{t(lang, 'noFamilyMembers')}</p>
            </motion.div>
          )}

          {/* Add Family Guardian Button */}
          <button
            onClick={() => navigate('/family')}
            className="w-full group bg-primary text-white py-5 rounded-[1.5rem] font-headline font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-lg shadow-primary/20"
          >
            <PlusCircle size={24} className="group-hover:rotate-90 transition-transform" />
            {t(lang, 'addFamilyGuardian')}
          </button>

          {/* Simulate Call Button (Hackathon Demo) */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => navigate('/call-analysis', { state: { isContact: false } })}
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-4 rounded-[1.5rem] font-headline font-bold flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
            >
              <ShieldAlert size={20} />
              <span className="text-[10px]">Unknown Scam</span>
            </button>
            <button 
              onClick={() => navigate('/call-analysis', { state: { isContact: true } })}
              className="bg-primary text-white py-4 rounded-[1.5rem] font-headline font-bold flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
            >
              <UserCheck size={20} />
              <span className="text-[10px]">Contact Spoof</span>
            </button>
          </div>
        </div>
      </section>

      {/* Privacy Assurance */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-xl flex items-start gap-4">
        <Shield size={20} className="text-zinc-500" />
        <p className="text-[11px] text-zinc-500 leading-relaxed">
          Your voice prints are encrypted using military-grade AES-256 and never stored as raw audio files. Only you and your guardians can authorize registration.
        </p>
      </div>
    </main>
  );
};

export default Dashboard;
