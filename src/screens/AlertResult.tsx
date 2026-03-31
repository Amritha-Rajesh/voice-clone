import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldAlert, AlertCircle, Phone, Clock, Users, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

const AlertResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 87;
  const isContact = location.state?.isContact;
  const callerName = location.state?.callerName || "Unknown Caller";

  return (
    <main className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 pt-12 px-6 pb-24 space-y-8">
      <header className="flex items-center gap-4">
        <button onClick={() => navigate('/')} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-headline font-bold">Analysis Report</h1>
      </header>

      <section className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 text-center space-y-6 shadow-xl border border-primary/10">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
          <div className="relative w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-lg shadow-primary/30">
            <ShieldAlert size={48} className="text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-headline font-bold text-primary">
            {isContact ? "Identity Theft Blocked" : "Scam Attempt Blocked"}
          </h2>
          <p className="text-zinc-500">
            {isContact 
              ? `A call claiming to be ${callerName} was blocked due to voice print mismatch.`
              : "A highly suspicious call was automatically disconnected to protect you."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Risk Score</p>
            <p className="text-3xl font-headline font-black text-primary">{score}%</p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Verdict</p>
            <p className="text-xl font-headline font-bold text-primary">DEEPFAKE</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-headline font-bold text-lg px-2">Detection Flags</h3>
        <div className="space-y-3">
          {[
            { label: "Unnatural Pitch Consistency", icon: AlertCircle },
            { label: "Missing Breath Patterns", icon: AlertCircle },
            { label: "GAN Synthesis Artifacts", icon: AlertCircle },
            { label: "Urgency Language Detected", icon: AlertCircle }
          ].map((flag, i) => (
            <div key={i} className="flex items-center gap-3 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <flag.icon size={18} className="text-primary" />
              <span className="text-sm font-medium">{flag.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-tertiary/10 p-6 rounded-[2rem] space-y-4">
        <div className="flex items-center gap-3 text-tertiary">
          <Users size={24} />
          <h3 className="font-headline font-bold">Family Alert Sent</h3>
        </div>
        <p className="text-sm text-tertiary-container leading-relaxed">
          Notifications and SMS have been sent to <strong>Mom</strong> and <strong>Dad</strong> with the call details and your current location.
        </p>
      </section>

      <button
        onClick={() => navigate('/')}
        className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-5 rounded-[1.5rem] font-headline font-bold shadow-lg"
      >
        Return to Dashboard
      </button>
    </main>
  );
};

export default AlertResult;
