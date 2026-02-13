import { useState, useMemo } from 'react';
import workflowCef from '@/data/workflow-hd-cef.json';
import workflowRistr from '@/data/workflow-hd-ristr.json';
import workflowBrk from '@/data/workflow-hd-brk.json';
import { useAppContext } from '@/context/AppContext';

// Initialize with the starting step
const INITIAL_STEP = "Bozza";

export function useWorkflowEngine(initialStatus = INITIAL_STEP) {
  const { activeApp } = useAppContext();

  // Pick the correct workflow data based on active app
  const workflowData = useMemo(() => {
    switch (activeApp.id) {
      case 'HD_RISTR': return workflowRistr;
      case 'HD_BRK': return workflowBrk;
      default: return workflowCef;
    }
  }, [activeApp]);

  // Current status name (e.g., "Aperta - Verifica preliminare")
  const [currentStatusName, setCurrentStatusName] = useState(initialStatus);

  // Get the full step object from JSON
  const currentStep = useMemo(() => {
    return workflowData.workflow.steps.find(s => s.fullName === currentStatusName) || workflowData.workflow.steps[0];
  }, [currentStatusName, workflowData]);

  // Derived state: User Role for this step
  const currentOwner = currentStep.owner;

  // Actions
  const transitionTo = (nextStatusName) => {
    // Basic validation: Check if nextStatusName is in nextPossible list
    // For DEMO purposes, we allow jumping to any state
    // if (currentStep.nextPossible?.includes(nextStatusName)) {
    setCurrentStatusName(nextStatusName);
  };

  // Reset status if it doesn't exist in the current workflow (e.g. after app switch)
  useMemo(() => {
    const exists = workflowData.workflow.steps.some(s => s.fullName === currentStatusName);
    if (!exists) {
      setCurrentStatusName(workflowData.workflow.steps[0].fullName);
    }
  }, [workflowData, currentStatusName]);

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
    allSteps: workflowData.workflow.steps,
    transitionTo,
    getAvailableActions,
    getStatusColor
  };
}
