import React, { createContext, useContext, useState, useMemo } from 'react';
import workflowData from '../data/workflow.json';

const WorkflowContext = createContext();

export function WorkflowProvider({ children }) {
  const steps = workflowData.workflow.steps;
  const [currentStatusName, setCurrentStatusName] = useState("Aperta – verifica preliminare");

  const currentStep = useMemo(() => {
    return steps.find(s => s.fullName === currentStatusName) || steps[0];
  }, [currentStatusName, steps]);

  const userRole = currentStep.owner;

  const setStatus = (statusName) => {
    setCurrentStatusName(statusName);
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
    setStatus,
    getStatusColor
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
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
