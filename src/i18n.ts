export type Language = 'en' | 'hi' | 'ml';

export const translations = {
  en: {
    // Dashboard
    appName: 'VoiceClone Alert',
    voiceProtected: 'Your Voice is Protected',
    voiceProtectedDesc: 'AI-powered guardian is actively scanning for unauthorized voice replicas across your linked devices.',
    numbersRegistered: 'Numbers Registered',
    protected: 'Protected',
    scanningIncoming: 'Scanning all incoming ID registers',
    globalRiskIndex: 'Global Risk Index',
    setupSafePhrases: 'Setup unique "Safe Phrases" for family.',
    familyCircle: 'Family Circle',
    membersMonitoring: 'members currently monitoring',
    viewAll: 'View All',
    registeredProtected: 'Registered & Protected',
    addFamilyGuardian: 'Add Family Guardian',
    unknownScam: 'Unknown Scam',
    contactSpoof: 'Contact Spoof',
    privacyNote: 'Your voice prints are encrypted using military-grade AES-256 and never stored as raw audio files.',
    helloUser: 'Hello',
    welcomeBack: 'Welcome back to your secure voice dashboard.',
    protectionActive: 'ACTIVE',
    protection: 'Protection',
    secured: 'Secured',

    // Family
    familyCircleTitle: 'Family Circle',
    guardiansDesc: 'Guardians who receive your alerts.',
    activeMonitoring: 'Active Monitoring',
    guardiansReady: 'Your guardians are ready to receive alerts.',
    addGuardian: 'Add Guardian',
    noFamilyMembers: 'No family members added yet.',
    inviteFamilyMember: 'Invite Family Member',
    wantToProtect: 'Want to protect another family member?',
    name: 'Name',
    relation: 'Relation (e.g., Mother)',
    phoneNumber: 'Phone Number',
    saveGuardian: 'Save Guardian',
    adding: 'Adding...',

    // Settings
    settings: 'Settings',
    account: 'Account',
    preferences: 'Preferences',
    profileInformation: 'Profile Information',
    language: 'Language',
    sensitivityThreshold: 'Sensitivity Threshold',
    autoBlockCalls: 'Auto-Block Calls',
    emergencyNotifications: 'Emergency Notifications',
    darkMode: 'Dark Mode',
    signOut: 'Sign Out',
    editProfile: 'Edit Profile',
    displayName: 'Display Name',
    cancel: 'Cancel',
    save: 'Save',
    noNameSet: 'No name set',
    noPhoneSet: 'No phone set',
    on: 'On',
    off: 'Off',

    // Login
    protectingVoice: 'Protecting your voice from AI deepfakes.',
    continueWithGoogle: 'Continue with Google',
    quickTest: 'Quick Test / Dev Mode',
    completeSetup: 'Complete Setup',
    waitingForLogin: 'Waiting for login...',

    // Onboarding / General
    next: 'Next',
    back: 'Back',
    finish: 'Finish',
    pending: 'Pending',

    // Languages
    english: 'English',
    hindi: 'Hindi',
    malayalam: 'Malayalam',
  },

  hi: {
    // Dashboard
    appName: 'वॉयसक्लोन अलर्ट',
    voiceProtected: 'आपकी आवाज़ सुरक्षित है',
    voiceProtectedDesc: 'AI-संचालित गार्डियन आपके उपकरणों पर अनधिकृत वॉयस रेप्लिका को सक्रिय रूप से स्कैन कर रहा है।',
    numbersRegistered: 'पंजीकृत नंबर',
    protected: 'सुरक्षित',
    scanningIncoming: 'सभी इनकमिंग आईडी रजिस्टर स्कैन हो रहे हैं',
    globalRiskIndex: 'वैश्विक जोखिम सूचकांक',
    setupSafePhrases: 'परिवार के लिए अनूठे "सुरक्षित वाक्यांश" सेट करें।',
    familyCircle: 'पारिवारिक वृत्त',
    membersMonitoring: 'सदस्य वर्तमान में निगरानी में हैं',
    viewAll: 'सभी देखें',
    registeredProtected: 'पंजीकृत और सुरक्षित',
    addFamilyGuardian: 'परिवार अभिभावक जोड़ें',
    unknownScam: 'अज्ञात धोखाधड़ी',
    contactSpoof: 'संपर्क स्पूफ',
    privacyNote: 'आपके वॉयस प्रिंट AES-256 से एन्क्रिप्टेड हैं और कभी भी कच्ची ऑडियो फ़ाइलों के रूप में संग्रहीत नहीं होते।',
    helloUser: 'नमस्ते',
    welcomeBack: 'आपके सुरक्षित वॉयस डैशबोर्ड पर वापस स्वागत है।',
    protectionActive: 'सक्रिय',
    protection: 'सुरक्षा',
    secured: 'सुरक्षित',

    // Family
    familyCircleTitle: 'पारिवारिक वृत्त',
    guardiansDesc: 'अभिभावक जो आपके अलर्ट प्राप्त करते हैं।',
    activeMonitoring: 'सक्रिय निगरानी',
    guardiansReady: 'आपके अभिभावक अलर्ट प्राप्त करने के लिए तैयार हैं।',
    addGuardian: 'अभिभावक जोड़ें',
    noFamilyMembers: 'अभी तक कोई परिवार का सदस्य नहीं जोड़ा गया।',
    inviteFamilyMember: 'परिवार के सदस्य को आमंत्रित करें',
    wantToProtect: 'क्या आप किसी अन्य परिवार के सदस्य को सुरक्षित करना चाहते हैं?',
    name: 'नाम',
    relation: 'संबंध (जैसे: माँ)',
    phoneNumber: 'फ़ोन नंबर',
    saveGuardian: 'अभिभावक सहेजें',
    adding: 'जोड़ा जा रहा है...',

    // Settings
    settings: 'सेटिंग्स',
    account: 'खाता',
    preferences: 'प्राथमिकताएं',
    profileInformation: 'प्रोफ़ाइल जानकारी',
    language: 'भाषा',
    sensitivityThreshold: 'संवेदनशीलता सीमा',
    autoBlockCalls: 'स्वचालित कॉल ब्लॉक',
    emergencyNotifications: 'आपातकालीन सूचनाएं',
    darkMode: 'डार्क मोड',
    signOut: 'साइन आउट',
    editProfile: 'प्रोफ़ाइल संपादित करें',
    displayName: 'प्रदर्शन नाम',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    noNameSet: 'कोई नाम नहीं',
    noPhoneSet: 'कोई फ़ोन नहीं',
    on: 'चालू',
    off: 'बंद',

    // Login
    protectingVoice: 'AI डीपफेक से आपकी आवाज़ की रक्षा।',
    continueWithGoogle: 'Google के साथ जारी रखें',
    quickTest: 'त्वरित परीक्षण / डेव मोड',
    completeSetup: 'सेटअप पूरा करें',
    waitingForLogin: 'लॉगिन की प्रतीक्षा...',

    // General
    next: 'अगला',
    back: 'वापस',
    finish: 'समाप्त',
    pending: 'लंबित',

    // Languages
    english: 'अंग्रेज़ी',
    hindi: 'हिंदी',
    malayalam: 'मलयालम',
  },

  ml: {
    // Dashboard
    appName: 'വോയ്‌സ്ക്ലോൺ അലേർട്ട്',
    voiceProtected: 'നിങ്ങളുടെ ശബ്ദം സുരക്ഷിതമാണ്',
    voiceProtectedDesc: 'AI-ഗാർഡിയൻ നിങ്ങളുടെ ഉപകരണങ്ങളിലുടനീളം അനധികൃത വോയ്‌സ് റെപ്ലിക്കകൾ സ്കാൻ ചെയ്യുന്നു.',
    numbersRegistered: 'രജിസ്ട്രർ ചെയ്ത നമ്പറുകൾ',
    protected: 'സംരക്ഷിതം',
    scanningIncoming: 'എല്ലാ ഇൻകമിംഗ് ഐഡി രജിസ്റ്ററുകളും സ്കാൻ ചെയ്യുന്നു',
    globalRiskIndex: 'ആഗോള അപകട സൂചിക',
    setupSafePhrases: 'കുടുംബത്തിനായി "സേഫ് ഫ്രേസുകൾ" ക്രമീകരിക്കുക.',
    familyCircle: 'കുടുംബ വൃത്തം',
    membersMonitoring: 'അംഗങ്ങൾ നിലവിൽ നിരീക്ഷണത്തിലാണ്',
    viewAll: 'എല്ലാം കാണുക',
    registeredProtected: 'രജിസ്ട്രർ & സംരക്ഷിതം',
    addFamilyGuardian: 'കുടുംബ ഗാർഡിയൻ ചേർക്കുക',
    unknownScam: 'അജ്ഞാത തട്ടിപ്പ്',
    contactSpoof: 'കോൺടാക്ട് സ്പൂഫ്',
    privacyNote: 'നിങ്ങളുടെ വോയ്‌സ് പ്രിന്റുകൾ AES-256 ഉപയോഗിച്ച് എൻക്രിപ്റ്റ് ചെയ്തിരിക്കുന്നു.',
    helloUser: 'ഹലോ',
    welcomeBack: 'നിങ്ങളുടെ സുരക്ഷിത വോയ്‌സ് ഡാഷ്‌ബോർഡിലേക്ക് സ്വാഗതം.',
    protectionActive: 'സജീവം',
    protection: 'സംരക്ഷണം',
    secured: 'സുരക്ഷിതം',

    // Family
    familyCircleTitle: 'കുടുംബ വൃത്തം',
    guardiansDesc: 'നിങ്ങളുടെ അലേർട്ടുകൾ സ്വീകരിക്കുന്ന ഗാർഡിയൻമാർ.',
    activeMonitoring: 'സജീവ നിരീക്ഷണം',
    guardiansReady: 'നിങ്ങളുടെ ഗാർഡിയൻമാർ അലേർട്ടുകൾ സ്വീകരിക്കാൻ തയ്യാറാണ്.',
    addGuardian: 'ഗാർഡിയൻ ചേർക്കുക',
    noFamilyMembers: 'ഇതുവരെ കുടുംബാംഗങ്ങളെ ചേർത്തിട്ടില്ല.',
    inviteFamilyMember: 'കുടുംബാംഗത്തെ ക്ഷണിക്കുക',
    wantToProtect: 'മറ്റൊരു കുടുംബാംഗത്തെ സംരക്ഷിക്കണോ?',
    name: 'പേര്',
    relation: 'ബന്ധം (ഉദാ: അമ്മ)',
    phoneNumber: 'ഫോൺ നമ്പർ',
    saveGuardian: 'ഗാർഡിയൻ സേവ് ചെയ്യുക',
    adding: 'ചേർക്കുന്നു...',

    // Settings
    settings: 'ക്രമീകരണങ്ങൾ',
    account: 'അക്കൗണ്ട്',
    preferences: 'മുൻഗണനകൾ',
    profileInformation: 'പ്രൊഫൈൽ വിവരങ്ങൾ',
    language: 'ഭാഷ',
    sensitivityThreshold: 'സംവേദനക്ഷമത നിലവാരം',
    autoBlockCalls: 'ഓട്ടോ-ബ്ലോക്ക് കോളുകൾ',
    emergencyNotifications: 'അടിയന്തര അറിയിപ്പുകൾ',
    darkMode: 'ഡാർക്ക് മോഡ്',
    signOut: 'സൈൻ ഔട്ട്',
    editProfile: 'പ്രൊഫൈൽ എഡിറ്റ് ചെയ്യുക',
    displayName: 'ഡിസ്‌പ്ലേ നാമം',
    cancel: 'റദ്ദാക്കുക',
    save: 'സേവ് ചെയ്യുക',
    noNameSet: 'പേര് ഇല്ല',
    noPhoneSet: 'ഫോൺ ഇല്ല',
    on: 'ഓൺ',
    off: 'ഓഫ്',

    // Login
    protectingVoice: 'AI ഡീപ്‌ഫേക്കുകളിൽ നിന്ന് നിങ്ങളുടെ ശബ്ദം സംരക്ഷിക്കുന്നു.',
    continueWithGoogle: 'Google-ൽ തുടരുക',
    quickTest: 'ദ്രുത പരീക്ഷ / ഡെവ് മോഡ്',
    completeSetup: 'സജ്ജീകരണം പൂർത്തിയാക്കുക',
    waitingForLogin: 'ലോഗിനിനായി കാത്തിരിക്കുന്നു...',

    // General
    next: 'അടുത്തത്',
    back: 'തിരിക',
    finish: 'പൂർത്തിയാക്കുക',
    pending: 'തീർദ്ദേഹം',

    // Languages
    english: 'ഇംഗ്ലീഷ്',
    hindi: 'ഹിന്ദി',
    malayalam: 'മലയാളം',
  },
};

export type TranslationKey = keyof typeof translations.en;

export function t(lang: Language, key: TranslationKey): string {
  return (translations[lang] as any)?.[key] ?? translations.en[key] ?? key;
}
