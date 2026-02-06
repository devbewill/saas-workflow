import { useState, useMemo } from 'react';
import workflowData from '@/data/workflow.json';

// Initialize with the starting step
const INITIAL_STEP = "Bozza";

export function useWorkflowEngine(initialStatus = INITIAL_STEP) {
  // Current status name (e.g., "Aperta - Verifica preliminare")
  const [currentStatusName, setCurrentStatusName] = useState(initialStatus);

  // Get the full step object from JSON
  const currentStep = useMemo(() => {
    return workflowData.workflow.steps.find(s => s.fullName === currentStatusName) || workflowData.workflow.steps[0];
  }, [currentStatusName]);

  // Derived state: User Role for this step
  const currentOwner = currentStep.owner;

  // Actions
  const transitionTo = (nextStatusName) => {
    // Basic validation: Check if nextStatusName is in nextPossible list
    // For DEMO purposes, we allow jumping to any state
    // if (currentStep.nextPossible?.includes(nextStatusName)) {
    setCurrentStatusName(nextStatusName);
    // } else {
    //   console.warn(`Invalid transition from ${currentStatusName} to ${nextStatusName}`);
    // }
  };

  const getAvailableActions = () => {
    return currentStep.nextPossible || [];
  };

  const getStatusColor = (state) => {
    switch (state) {
      case "Bozza": return "secondary"; // grey
      case "Aperta": return "default"; // violet (primary)
      case "Caricata": return "default"; // cyan -> map to primary/info
      case "Esame": return "destructive"; // orange -> map to warning/destructive
      case "Approvata": return "outline"; // green -> map to success/outline
      case "Perfezionata": return "secondary"; // dark -> map to secondary
      case "In attesa": return "secondary"; // yellow -> map to warning
      default: return "outline";
    }
  };

  return {
    currentStatusName,
    currentStep,
    currentOwner,
    transitionTo,
    getAvailableActions,
    getStatusColor
  };
}
