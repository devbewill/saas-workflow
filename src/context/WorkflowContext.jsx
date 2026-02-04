import React, { createContext, useContext, useState, useMemo } from 'react';
import workflowData from '../data/workflow.json';
import { Zap, Palette, Layers, Sparkles, ShieldCheck } from 'lucide-react';

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
    name: 'Antigravity',
    icon: ShieldCheck,
    font: 'font-["Inter"]',
    bg: 'bg-[#FAFBFC]',
    card: 'bg-white/80 backdrop-blur-sm border border-slate-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
    cardHover: 'hover:bg-white hover:border-slate-300/50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-200',
    sidebar: 'bg-white/60 backdrop-blur-xl border-r border-slate-200/30',
    topbar: 'bg-white/70 backdrop-blur-xl border-b border-slate-200/30',
    text: 'text-slate-700',
    textMuted: 'text-slate-400',
    primary: 'bg-slate-600 hover:bg-slate-700',
    accentColor: 'indigo',
    radius: 'rounded-xl',
    badge: 'bg-slate-100/80 text-slate-600 border border-slate-200/40 font-medium tracking-normal'
  },
  quantum: {
    id: 'quantum',
    name: 'Quantum',
    icon: Zap,
    font: 'font-["Space_Grotesk"]',
    bg: 'bg-[#050510]',
    card: 'bg-white/5 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] border-[0.5px]',
    sidebar: 'bg-[#050510] border-r border-white/10',
    topbar: 'bg-[#050510]/80 backdrop-blur-xl border-b border-white/10',
    text: 'text-white',
    textMuted: 'text-slate-400',
    primary: 'bg-violet-600',
    accentColor: 'violet',
    radius: 'rounded-2xl',
    badge: 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
  },
  nordic: {
    id: 'nordic',
    name: 'Nordic Neo',
    icon: Palette,
    font: 'font-["Inter"]',
    bg: 'bg-[#F8F9FA]',
    card: 'bg-white border-none shadow-[0_1px_3px_rgba(0,0,0,0.05)]',
    cardHover: 'hover:shadow-lg transition-all',
    sidebar: 'bg-white border-r border-slate-100',
    topbar: 'bg-white border-b border-slate-100',
    text: 'text-slate-900',
    textMuted: 'text-slate-500',
    primary: 'bg-slate-900',
    accentColor: 'slate',
    radius: 'rounded-sm',
    badge: 'bg-slate-100 text-slate-600 font-bold uppercase tracking-tight'
  },
  bento: {
    id: 'bento',
    name: 'Bento Logic',
    icon: Layers,
    font: 'font-["Outfit"]',
    bg: 'bg-slate-50',
    card: 'bg-white border border-slate-200 shadow-sm',
    cardHover: 'hover:border-blue-200 transition-all',
    sidebar: 'bg-white border-r border-slate-200',
    topbar: 'bg-white border-b border-slate-200',
    text: 'text-slate-900',
    textMuted: 'text-slate-400',
    primary: 'bg-blue-600',
    accentColor: 'blue',
    radius: 'rounded-[24px]',
    badge: 'bg-blue-50 text-blue-600 font-bold'
  },
  organic: {
    id: 'organic',
    name: 'Organic',
    icon: Sparkles,
    font: 'font-["Plus_Jakarta_Sans"]',
    bg: 'bg-gradient-to-br from-indigo-50 via-white to-orange-50',
    card: 'bg-white/80 backdrop-blur-md border-transparent shadow-xl shadow-indigo-100/50',
    cardHover: 'hover:scale-[1.01] transition-transform',
    sidebar: 'bg-white/40 backdrop-blur-md border-r border-indigo-50',
    topbar: 'bg-white/40 backdrop-blur-md border-b border-indigo-50',
    text: 'text-slate-800',
    textMuted: 'text-slate-400',
    primary: 'bg-indigo-600',
    accentColor: 'indigo',
    radius: 'rounded-[40px]',
    badge: 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-200'
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
      case "Aperta": return "bg-violet-500 text-white";
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
