import React, { useState, useEffect } from 'react';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Contact } from '../types';
import { UserPlus, Phone, ShieldCheck, Trash2, Search, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phoneNumber: '' });

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(collection(db, 'users', auth.currentUser.uid, 'contacts'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contact));
      setContacts(list);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'contacts');
    });

    return unsubscribe;
  }, []);

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      await addDoc(collection(db, 'users', auth.currentUser.uid, 'contacts'), {
        ...newContact,
        isWhitelisted: true,
        voicePrintStatus: 'Pending',
        createdAt: new Date().toISOString(),
      });
      setNewContact({ name: '', phoneNumber: '' });
      setIsAdding(false);
      toast.success("Contact added to protection register");
    } catch (error) {
      toast.error("Failed to add contact");
    }
  };

  const handleDelete = async (id: string) => {
    if (!auth.currentUser) return;
    try {
      await deleteDoc(doc(db, 'users', auth.currentUser.uid, 'contacts', id));
      toast.success("Contact removed");
    } catch (error) {
      toast.error("Failed to remove contact");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 pt-12 px-6 pb-24 space-y-8">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold">Number Register</h1>
          <p className="text-zinc-500">Trusted contacts for voice verification.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"
        >
          <UserPlus size={24} />
        </button>
      </header>

      {isAdding && (
        <form onSubmit={handleAddContact} className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] shadow-xl border border-primary/10 space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Contact Name</label>
            <input
              type="text"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary"
              placeholder="e.g. Mom"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Phone Number</label>
            <input
              type="tel"
              value={newContact.phoneNumber}
              onChange={(e) => setNewContact({ ...newContact, phoneNumber: e.target.value })}
              className="w-full bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary"
              placeholder="+91 00000 00000"
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold">
            Register for Protection
          </button>
        </form>
      )}

      <section className="space-y-4">
        {loading ? (
          <p className="text-center text-zinc-400">Loading register...</p>
        ) : contacts.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-300">
              <Search size={32} />
            </div>
            <p className="text-zinc-500">No registered numbers yet. Add your family to enable voice cloning protection.</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div key={contact.id} className="bg-white dark:bg-zinc-900 p-5 rounded-[2rem] shadow-sm border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                  <UserCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-50">{contact.name}</h3>
                  <p className="text-xs text-zinc-500">{contact.phoneNumber}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <ShieldCheck size={12} className="text-tertiary" />
                    <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider">Protected</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(contact.id)}
                className="p-2 text-zinc-300 hover:text-primary transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))
        )}
      </section>

      <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-[2rem] flex items-start gap-4">
        <ShieldCheck className="text-tertiary shrink-0" size={24} />
        <div className="space-y-1">
          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Why register numbers?</p>
          <p className="text-[11px] text-zinc-500 leading-relaxed">
            Registering family numbers allows the AI to compare incoming voice patterns against their saved "Voice Prints," making it 10x more effective at catching impersonation scams.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Contacts;
