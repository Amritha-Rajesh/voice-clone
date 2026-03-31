export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  isWhitelisted: boolean;
  voicePrintStatus: 'Registered' | 'Pending' | 'Not Set';
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  phoneNumber: string;
  displayName?: string;
  role: 'user' | 'admin';
  isProtected: boolean;
  language: 'en' | 'hi' | 'ml';
  riskThreshold: number;
  createdAt: string;
  contactsCount?: number;
}

export interface FamilyGuardian {
  id: string;
  name: string;
  phoneNumber: string;
  relation: string;
  isVerified: boolean;
  createdAt: string;
}

export interface CallLog {
  id: string;
  callerNumber: string;
  timestamp: string;
  riskScore: number;
  verdict: 'Safe' | 'Fake';
  reasonFlags: string[];
  transcript?: string;
  isReported: boolean;
}

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ml', name: 'Malayalam' },
];
