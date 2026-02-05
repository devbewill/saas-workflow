import React, { createContext, useContext, useState, useMemo } from 'react';
import workflowData from '../data/workflow.json';
import { ShieldCheck } from 'lucide-react';

const WorkflowContext = createContext();

export const FONTS = {
  inter: { name: 'Inter', class: 'font-["Inter"]', description: 'Clean & versatile' },
  dmSans: { name: 'DM Sans', class: 'font-["DM_Sans"]', description: 'Geometric & minimal' },
  manrope: { name: 'Manrope', class: 'font-["Manrope"]', description: 'Modern & friendly' },
  outfit: { name: 'Outfit', class: 'font-["Outfit"]', description: 'Rounded & bold' },
  plusJakarta: { name: 'Plus Jakarta', class: 'font-["Plus_Jakarta_Sans"]', description: 'Warm & elegant' },
  spaceGrotesk: { name: 'Space Grotesk', class: 'font-["Space_Grotesk"]', description: 'Tech & futuristic' },
  sora: { name: 'Sora', class: 'font-["Sora"]', description: 'Soft & refined' },
  workSans: { name: 'Work Sans', class: 'font-["Work_Sans"]', description: 'Professional & clear' },
  poppins: { name: 'Poppins', class: 'font-["Poppins"]', description: 'Friendly & rounded' },
  montserrat: { name: 'Montserrat', class: 'font-["Montserrat"]', description: 'Bold & urban' },
  ibmPlex: { name: 'IBM Plex Sans', class: 'font-["IBM_Plex_Sans"]', description: 'Tech & precise (Geist-like)' },
};


export const THEMES = {
  antigravity: {
    id: 'antigravity',
    name: 'Antigravity (Nexus)',
    icon: ShieldCheck,
    font: 'font-["Inter",sans-serif]', // Back to Inter - The Enterprise Standard
    bg: 'bg-slate-50/90', // Cool Gray background for separation
    card: 'bg-white border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.05)]', // Precise, subtle shadow
    cardHover: 'hover:border-blue-200 hover:shadow-md transition-all duration-200',
    sidebar: 'bg-white border-r border-slate-200', // Solid light sidebar
    topbar: 'bg-white/80 backdrop-blur-md border-b border-slate-200',
    text: 'text-slate-900', // High contrast
    textMuted: 'text-slate-500', // Medium contrast metadata
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm', // Sapphire Blue - Trust
    accentColor: 'blue',
    radius: 'rounded-lg', // 8px - Engineered look
    badge: 'bg-slate-100 text-slate-700 border border-slate-200 font-medium px-2 py-0.5' // Clean technical badges
  }
};

export function WorkflowProvider({ children }) {
  const steps = workflowData.workflow.steps;
  const [currentStatusName, setCurrentStatusName] = useState("Aperta – verifica preliminare");
  const [currentTheme, setCurrentTheme] = useState('antigravity');
  const [currentFont, setCurrentFont] = useState('inter');

  const theme = { ...THEMES[currentTheme], font: FONTS[currentFont].class };

  const currentStep = useMemo(() => {
    return steps.find(s => s.fullName === currentStatusName) || steps[0];
  }, [currentStatusName, steps]);

  const userRole = currentStep.owner;

  const setStatus = (statusName) => {
    setCurrentStatusName(statusName);
  };

  const setTheme = (themeId) => {
    setCurrentTheme(themeId);
  };

  const setFont = (fontId) => {
    setCurrentFont(fontId);
  };

  const getStatusColor = (state) => {
    switch (state) {
      case "Bozza": return "bg-slate-200 text-slate-700";
      case "Aperta": return "bg-violet-200 text-violet-700";
      case "Caricata": return "bg-cyan-400 text-white";
      case "Esame": return "bg-orange-400 text-white";
      case "Approvata": return "bg-green-500 text-white";
      case "Perfezionata": return "bg-slate-900 text-white";
      case "In attesa": return "bg-yellow-400 text-slate-900";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  const value = {
    steps,
    currentStatusName,
    currentStep,
    userRole,
    currentTheme,
    theme,
    setTheme,
    currentFont,
    setFont,
    setStatus,
    getStatusColor
  };

  return (
    <WorkflowContext.Provider value={value}>
      <div className={theme.font}>
        {children}
      </div>
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
}
