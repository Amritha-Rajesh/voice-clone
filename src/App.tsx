import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { Toaster } from 'sonner';
import Dashboard from './screens/Dashboard';
import History from './screens/History';
import Family from './screens/Family';
import Contacts from './screens/Contacts';
import Settings from './screens/Settings';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import CallAnalysis from './screens/CallAnalysis';
import AlertResult from './screens/AlertResult';
import { Shield, History as HistoryIcon, Users, Settings as SettingsIcon, Contact as ContactIcon } from 'lucide-react';
import { cn } from './lib/utils';

function BottomNav() {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Shield },
    { path: '/history', label: 'History', icon: HistoryIcon },
    { path: '/contacts', label: 'Register', icon: ContactIcon },
    { path: '/family', label: 'Guardians', icon: Users },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.04)] pt-3 pb-6 px-4 flex justify-around items-center rounded-t-2xl border-t border-zinc-100 dark:border-zinc-800">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <a
            key={item.path}
            href={item.path}
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', item.path);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className={cn(
              "flex flex-col items-center justify-center rounded-2xl px-5 py-2 transition-all duration-200",
              isActive ? "bg-[#E24B4A]/10 text-[#E24B4A]" : "text-zinc-500 hover:text-[#E24B4A]"
            )}
          >
            <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
            <span className="text-[11px] font-medium mt-1">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

function AppContent() {
  const location = useLocation();
  const showNav = ['/', '/history', '/family', '/settings'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 pb-24">
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Navigate to="/login" replace />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
        <Route path="/contacts" element={<PrivateRoute><Contacts /></PrivateRoute>} />
        <Route path="/family" element={<PrivateRoute><Family /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/call-analysis" element={<PrivateRoute><CallAnalysis /></PrivateRoute>} />
        <Route path="/alert-result" element={<PrivateRoute><AlertResult /></PrivateRoute>} />
      </Routes>
      {showNav && <BottomNav />}
      <Toaster position="top-center" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
