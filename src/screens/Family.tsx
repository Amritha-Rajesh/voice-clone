import React, { useState, useEffect } from 'react';
import { Plus, ShieldCheck, Phone, MoreVertical, X, Edit2, Trash2, Check, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { t, Language } from '../i18n';

const STATUSES = ['Pending', 'Protected', 'Inactive'];

const statusStyle: Record<string, string> = {
  Protected: 'bg-tertiary/10 text-tertiary',
  Pending:   'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Inactive:  'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
};

const statusIcon: Record<string, React.ReactNode> = {
  Protected: <Shield size={12} />,
  Pending:   <AlertCircle size={12} />,
  Inactive:  <X size={12} />,
};

const Family = () => {
  const { user, profile } = useAuth();
  const lang = (profile?.language || 'en') as Language;
  const [members, setMembers] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: '', relation: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: '', relation: '', phoneNumber: '' });
  const [menuId, setMenuId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'users', user.uid, 'guardians'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMembers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (error) => console.error('Error fetching guardians:', error));
    return unsubscribe;
  }, [user]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error('Not logged in');
    if (!formData.name || !formData.phone) return toast.error('Name and Phone are required');
    setLoading(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'guardians'), {
        name: formData.name,
        relation: formData.relation,
        phoneNumber: formData.phone,
        isVerified: false,
        status: 'Pending',
        createdAt: serverTimestamp(),
      });
      toast.success('Family member added!');
      setIsAdding(false);
      setFormData({ name: '', relation: '', phone: '' });
    } catch (err: any) {
      toast.error(`Error: ${err.message}`);
    }
    setLoading(false);
  };

  const startEdit = (member: any) => {
    setEditingId(member.id);
    setEditData({ name: member.name, relation: member.relation || '', phoneNumber: member.phoneNumber || '' });
    setMenuId(null);
  };

  const saveEdit = async (id: string) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid, 'guardians', id), {
        name: editData.name,
        relation: editData.relation,
        phoneNumber: editData.phoneNumber,
      });
      toast.success('Guardian updated!');
    } catch { toast.error('Failed to update'); }
    setEditingId(null);
  };

  const cycleStatus = async (member: any) => {
    if (!user) return;
    const next = STATUSES[(STATUSES.indexOf(member.status || 'Pending') + 1) % STATUSES.length];
    try {
      await updateDoc(doc(db, 'users', user.uid, 'guardians', member.id), { status: next });
      toast.success(`Status → ${next}`);
    } catch { toast.error('Failed to update status'); }
    setMenuId(null);
  };

  const deleteMember = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'guardians', id));
      toast.success('Guardian removed');
    } catch { toast.error('Failed to remove'); }
    setMenuId(null);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 pt-12 px-6 pb-24 space-y-8" onClick={() => setMenuId(null)}>
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold">{t(lang, 'familyCircleTitle')}</h1>
          <p className="text-zinc-500">{t(lang, 'guardiansDesc')}</p>
        </div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Plus size={24} />
          </button>
        )}
      </header>

      {/* Add Guardian Form */}
      {isAdding && (
        <form onSubmit={handleAddSubmit} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-6 rounded-[2rem] space-y-4">
          <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800 p-2 rounded-2xl">
            <span className="font-bold ml-3">{t(lang, 'addGuardian')}</span>
            <button type="button" onClick={() => setIsAdding(false)} className="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 shadow-sm text-zinc-500">
              <X size={16} />
            </button>
          </div>
          <div className="space-y-3">
            <input type="text" placeholder={t(lang, 'name')} className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl py-4 px-4 font-medium" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <input type="text" placeholder={t(lang, 'relation')} className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl py-4 px-4 font-medium" value={formData.relation} onChange={(e) => setFormData({...formData, relation: e.target.value})} />
            <input type="tel" placeholder={t(lang, 'phoneNumber')} className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl py-4 px-4 font-medium" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-4 rounded-2xl font-bold mt-2 disabled:opacity-50">
            {loading ? t(lang, 'adding') : t(lang, 'saveGuardian')}
          </button>
        </form>
      )}

      {/* Status Banner */}
      <section className="bg-tertiary/5 border border-tertiary/10 p-6 rounded-[2rem] flex items-center gap-4">
        <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-2xl flex items-center justify-center">
          <ShieldCheck size={24} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-tertiary">{t(lang, 'activeMonitoring')}</p>
          <p className="text-[11px] text-tertiary/70">{t(lang, 'guardiansReady')}</p>
        </div>
      </section>

      {/* Members List */}
      <section className="space-y-4">
        {members.length === 0 && !isAdding && (
          <div className="text-center py-8 text-zinc-500">{t(lang, 'noFamilyMembers')}</div>
        )}

        {members.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-zinc-900 rounded-[2rem] shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {editingId === member.id ? (
              /* ── Inline Edit Mode ── */
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <Edit2 size={14} className="text-primary" />
                  <span className="font-bold text-sm text-primary">Editing {member.name}</span>
                </div>
                <input type="text" className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-xl py-3 px-4 text-sm font-medium border-none outline-none" placeholder={t(lang, 'name')} value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} />
                <input type="text" className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-xl py-3 px-4 text-sm font-medium border-none outline-none" placeholder={t(lang, 'relation')} value={editData.relation} onChange={(e) => setEditData({...editData, relation: e.target.value})} />
                <input type="tel" className="w-full bg-zinc-50 dark:bg-zinc-800 rounded-xl py-3 px-4 text-sm font-medium border-none outline-none" placeholder={t(lang, 'phoneNumber')} value={editData.phoneNumber} onChange={(e) => setEditData({...editData, phoneNumber: e.target.value})} />
                <div className="flex gap-2 pt-1">
                  <button onClick={() => setEditingId(null)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold text-sm">
                    <X size={14} /> {t(lang, 'cancel')}
                  </button>
                  <button onClick={() => saveEdit(member.id)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-bold text-sm">
                    <Check size={14} /> {t(lang, 'save')}
                  </button>
                </div>
              </div>
            ) : (
              /* ── View Mode ── */
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xl text-primary">
                      {member.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{member.name}</h3>
                      <p className="text-xs text-zinc-500">{member.relation}</p>
                    </div>
                  </div>

                  {/* Context Menu */}
                  <div className="relative">
                    <button onClick={() => setMenuId(menuId === member.id ? null : member.id)} className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                      <MoreVertical size={20} />
                    </button>
                    {menuId === member.id && (
                      <div className="absolute right-0 top-10 z-30 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-700 w-52 overflow-hidden">
                        <button onClick={() => startEdit(member)} className="w-full px-4 py-3 text-sm text-left font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center gap-3">
                          <Edit2 size={14} className="text-zinc-400" /> Edit Details
                        </button>
                        <button onClick={() => cycleStatus(member)} className="w-full px-4 py-3 text-sm text-left font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center gap-3">
                          <Shield size={14} className="text-zinc-400" />
                          Change Status
                          <span className="ml-auto text-[10px] font-bold text-zinc-400">
                            → {STATUSES[(STATUSES.indexOf(member.status || 'Pending') + 1) % STATUSES.length]}
                          </span>
                        </button>
                        <div className="border-t border-zinc-100 dark:border-zinc-700" />
                        <button onClick={() => deleteMember(member.id)} className="w-full px-4 py-3 text-sm text-left font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3">
                          <Trash2 size={14} /> Remove Guardian
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone + Status row */}
                <div className="flex gap-3">
                  <div className="flex-1 flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    <Phone size={14} />
                    {member.phoneNumber}
                  </div>
                  {/* Tapping the status badge directly cycles through statuses */}
                  <button
                    onClick={() => cycleStatus(member)}
                    className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-80 transition-opacity ${statusStyle[member.status] || statusStyle.Pending}`}
                    title="Tap to cycle status"
                  >
                    {statusIcon[member.status] || statusIcon.Pending}
                    {member.status || 'Pending'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {!isAdding && (
        <div className="bg-zinc-900 dark:bg-zinc-100 p-6 rounded-[2rem] text-center space-y-4">
          <p className="text-white dark:text-zinc-900 text-sm font-medium">{t(lang, 'wantToProtect')}</p>
          <button onClick={() => setIsAdding(true)} className="w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white py-4 rounded-2xl font-bold">
            {t(lang, 'inviteFamilyMember')}
          </button>
        </div>
      )}
    </main>
  );
};

export default Family;
