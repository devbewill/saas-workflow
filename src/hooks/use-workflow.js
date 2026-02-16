import { useState, useMemo } from 'react';
import workflowCef from '@/data/workflows/hd-cef.json';
import workflowRistr from '@/data/workflows/hd-ristr.json';
import workflowBrk from '@/data/workflows/hd-brk.json';
import { useAppContext } from '@/context/app-context';

const INITIAL_STEP = 'Bozza';

export function useWorkflow(initialStatus = INITIAL_STEP) {
    const { activeApp } = useAppContext();

    const workflowData = useMemo(() => {
        switch (activeApp.id) {
            case 'HD_RISTR': return workflowRistr;
            case 'HD_BRK': return workflowBrk;
            default: return workflowCef;
        }
    }, [activeApp]);

    const [currentStatusName, setCurrentStatusName] = useState(initialStatus);

    const currentStep = useMemo(() => {
        return workflowData.workflow.steps.find((s) => s.fullName === currentStatusName) || workflowData.workflow.steps[0];
    }, [currentStatusName, workflowData]);

    const currentOwner = currentStep.owner;

    const transitionTo = (nextStatusName) => {
        setCurrentStatusName(nextStatusName);
    };

    // Reset if current status doesn't exist in the new workflow (after app switch)
    useMemo(() => {
        const exists = workflowData.workflow.steps.some((s) => s.fullName === currentStatusName);
        if (!exists) {
            setCurrentStatusName(workflowData.workflow.steps[0].fullName);
        }
    }, [workflowData, currentStatusName]);

    const getAvailableActions = () => currentStep.nextPossible || [];

    const getStatusVariant = (state) => {
        const map = {
            Bozza: 'secondary',
            Aperta: 'default',
            Caricata: 'default',
            Esame: 'destructive',
            Approvata: 'outline',
            Perfezionata: 'secondary',
            'In attesa': 'secondary',
        };
        return map[state] || 'outline';
    };

    return {
        currentStatusName,
        currentStep,
        currentOwner,
        allSteps: workflowData.workflow.steps,
        transitionTo,
        getAvailableActions,
        getStatusVariant,
    };
}
