import React from 'react';
import { Phone, Calendar, Shield, ShieldAlert, ChevronRight, Search } from 'lucide-react';

const History = () => {
  const calls = [
    { number: "+91 98765 43210", date: "Today, 10:30 AM", score: 87, verdict: "Fake" },
    { number: "+91 91234 56789", date: "Yesterday, 4:15 PM", score: 12, verdict: "Safe" },
    { number: "+91 88888 77777", date: "28 Mar, 11:20 AM", score: 92, verdict: "Fake" },
    { number: "+91 77777 66666", date: "25 Mar, 9:00 AM", score: 5, verdict: "Safe" },
    { number: "+91 66666 55555", date: "20 Mar, 2:45 PM", score: 78, verdict: "Fake" },
  ];

  return (
    <main className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 pt-12 px-6 pb-24 space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-headline font-bold">Call History</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input
            type="text"
            placeholder="Search numbers..."
            className="w-full bg-white dark:bg-zinc-900 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary shadow-sm"
          />
        </div>
      </header>

      <section className="space-y-3">
        {calls.map((call, i) => (
          <div 
            key={i} 
            className="bg-white dark:bg-zinc-900 p-4 rounded-2xl flex items-center justify-between shadow-sm border border-zinc-100 dark:border-zinc-800 active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center",
                call.verdict === 'Fake' ? "bg-primary/10 text-primary" : "bg-tertiary/10 text-tertiary"
              )}>
                {call.verdict === 'Fake' ? <ShieldAlert size={24} /> : <Shield size={24} />}
              </div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-zinc-50">{call.number}</p>
                <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                  <Calendar size={10} />
                  <span>{call.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className={cn(
                  "text-xs font-bold uppercase tracking-wider",
                  call.verdict === 'Fake' ? "text-primary" : "text-tertiary"
                )}>
                  {call.verdict}
                </p>
                <p className="text-[10px] text-zinc-400 font-medium">{call.score}% Risk</p>
              </div>
              <ChevronRight size={16} className="text-zinc-300" />
            </div>
          </div>
        ))}
      </section>

      <button className="w-full py-4 text-primary font-bold text-sm">
        Load More History
      </button>
    </main>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default History;
