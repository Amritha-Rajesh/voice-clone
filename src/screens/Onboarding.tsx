import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Bell, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(0);

  const steps = [
    {
      title: "Real-time Detection",
      description: "Our AI scans incoming calls for voice cloning markers and deepfake artifacts.",
      icon: Shield,
      color: "bg-primary/10 text-primary"
    },
    {
      title: "Family Alerts",
      description: "Instantly notify your family when a suspicious call is blocked.",
      icon: Users,
      color: "bg-tertiary/10 text-tertiary"
    },
    {
      title: "Instant Protection",
      description: "Calls are automatically disconnected if a high risk is detected.",
      icon: Bell,
      color: "bg-blue-500/10 text-blue-500"
    }
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-12 px-6 bg-white dark:bg-zinc-950">
      <div className="w-full flex justify-end">
        <button onClick={() => navigate('/')} className="text-zinc-400 font-bold">Skip</button>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-8">
        <motion.div
          key={step}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn("w-32 h-32 rounded-[2.5rem] flex items-center justify-center", currentStep.color)}
        >
          <Icon size={64} />
        </motion.div>

        <motion.div
          key={step + 'text'}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-headline font-bold">{currentStep.title}</h1>
          <p className="text-zinc-500 leading-relaxed">{currentStep.description}</p>
        </motion.div>

        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === step ? "w-8 bg-primary" : "w-2 bg-zinc-200 dark:bg-zinc-800"
              )}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          if (step < steps.length - 1) setStep(step + 1);
          else navigate('/');
        }}
        className="w-full max-w-sm bg-primary text-white py-5 rounded-[1.5rem] font-headline font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
      >
        {step === steps.length - 1 ? "Get Started" : "Next"} <ArrowRight size={20} />
      </button>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default Onboarding;
