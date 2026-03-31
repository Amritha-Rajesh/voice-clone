import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Shield, AlertTriangle, Mic, MicOff, UserCheck, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const CallAnalysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [riskScore, setRiskScore] = useState(0);
  const [status, setStatus] = useState<'analyzing' | 'blocked' | 'safe'>('analyzing');
  const [transcript, setTranscript] = useState<string[]>([]);
  
  // Simulation params
  const isSimulatedContact = location.state?.isContact || Math.random() > 0.5;
  const callerName = isSimulatedContact ? "Mom (Registered)" : "Unknown Number";
  const callerNumber = isSimulatedContact ? "+91 98765 43210" : "+91 82736 19283";

  useEffect(() => {
    const interval = setInterval(() => {
      setRiskScore(prev => {
        // If it's a contact, we simulate a "Voice Clone" detection which is more aggressive
        const increment = isSimulatedContact ? Math.floor(Math.random() * 20) : Math.floor(Math.random() * 12);
        const next = prev + increment;
        
        if (next >= 80) {
          clearInterval(interval);
          setStatus('blocked');
          setTimeout(() => navigate('/alert-result', { 
            state: { 
              score: next, 
              isContact: isSimulatedContact,
              callerName: callerName,
              callerNumber: callerNumber
            } 
          }), 2000);
          return next;
        }
        return next;
      });

      const phrases = isSimulatedContact 
        ? [
            "Beta, I'm in trouble...",
            "I lost my wallet, need money...",
            "Please send 50,000 to this UPI...",
            "Don't tell your father yet...",
            "It's an emergency, hurry up!"
          ]
        : [
            "This is your bank calling...",
            "Your account will be suspended...",
            "Verify your OTP now...",
            "You won a lucky prize...",
            "Press 1 to speak to an executive..."
          ];
      setTranscript(prev => [...prev, phrases[Math.floor(Math.random() * phrases.length)]].slice(-3));
    }, 2000);

    return () => clearInterval(interval);
  }, [navigate, isSimulatedContact, callerName, callerNumber]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-between py-16 px-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-primary animate-pulse">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs font-bold tracking-widest uppercase">Live Analysis</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-headline font-bold">{callerName}</h1>
            {isSimulatedContact && <UserCheck size={20} className="text-tertiary" />}
          </div>
          <p className="text-zinc-500 font-mono">{callerNumber}</p>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Risk Meter Gauge */}
        <svg className="w-64 h-64 -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="110"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-zinc-800"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="110"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray="691"
            initial={{ strokeDashoffset: 691 }}
            animate={{ strokeDashoffset: 691 - (691 * riskScore) / 100 }}
            className={cn(
              "transition-colors duration-500",
              riskScore > 75 ? "text-primary" : riskScore > 40 ? "text-amber-500" : "text-tertiary"
            )}
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-headline font-black">{riskScore}%</span>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Risk Score</span>
        </div>

        {isSimulatedContact && riskScore > 50 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -bottom-4 bg-primary/20 border border-primary/50 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2"
          >
            <AlertTriangle size={14} className="text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Voice Mismatch Detected</span>
          </motion.div>
        )}
      </div>

      <div className="w-full max-w-sm bg-zinc-900/50 rounded-3xl p-6 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-3 text-zinc-400">
          <Mic size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Live Transcript</span>
        </div>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {transcript.map((text, i) => (
              <motion.p
                key={i + text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-sm text-zinc-300 italic"
              >
                "{text}"
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex gap-8">
        <button className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
          <MicOff size={24} />
        </button>
        <button 
          onClick={() => navigate('/')}
          className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white"
        >
          <Phone size={24} className="rotate-[135deg]" />
        </button>
      </div>

      {status === 'blocked' && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed inset-x-0 bottom-0 bg-primary p-8 text-center space-y-2 rounded-t-[3rem] z-50 shadow-[0_-20px_50px_rgba(175,38,42,0.3)]"
        >
          <Shield size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-headline font-bold">
            {isSimulatedContact ? "Voice Clone Detected" : "Scam Call Blocked"}
          </h2>
          <p className="text-white/80">
            {isSimulatedContact 
              ? `This caller is impersonating ${callerName.split(' ')[0]}. Call disconnected.`
              : "Unknown scam pattern detected. Call disconnected automatically."}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CallAnalysis;
