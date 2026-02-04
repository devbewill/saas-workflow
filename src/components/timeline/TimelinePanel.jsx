import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WORKFLOW_STEPS } from '@/data/mockData';

import { useWorkflow } from '@/context/WorkflowContext';

export function TimelinePanel({ isOpen, onClose }) {
  const { steps, currentStatusName, currentStep, setStatus } = useWorkflow();

  // Group steps by their "state" attribute
  const groupedSteps = useMemo(() => {
    const groups = [];
    steps.forEach(step => {
      let group = groups.find(g => g.category === step.state);
      if (!group) {
        group = { category: step.state, steps: [] };
        groups.push(group);
      }
      group.steps.push(step);
    });
    return groups;
  }, [steps]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-semibold text-xl text-slate-900">Stato avanzamento pratica</h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Segui l'andamento della pratica. Gli stati contrassegnati con <Check size={14} className="inline text-green-600" /> sono conclusi.
              </p>

              <div className="space-y-6">
                {groupedSteps.map((stepGroup) => {
                   const allCompleted = stepGroup.steps.every(s => s.id < currentStep.id);
                   const isFuture = stepGroup.steps.every(s => s.id > currentStep.id);
                   const hasCurrent = stepGroup.steps.some(s => s.id === currentStep.id);

                   return (
                      <div key={stepGroup.category} className="space-y-3">
                         <div className={cn(
                           "flex items-center justify-between font-semibold text-xs uppercase tracking-wider",
                           isFuture ? "text-slate-300" : hasCurrent ? "text-violet-600" : "text-slate-400"
                         )}>
                            <span className="flex items-center gap-2">
                               {stepGroup.category}
                               {allCompleted && <Check size={14} className="text-green-600" />}
                            </span>
                         </div>

                         <ul className="space-y-1.5 pl-1">
                            {stepGroup.steps.map(step => {
                               const isCurrent = currentStatusName === step.fullName;
                               const isCompleted = step.id < currentStep.id;
                               const isFutureStep = step.id > currentStep.id;

                               return (
                                 <li key={step.id}>
                                    <button
                                      onClick={() => {
                                        setStatus(step.fullName);
                                        onClose();
                                      }}
                                      className={cn(
                                        "w-full flex items-start gap-3 border-b border-slate-100 transition-all text-left group ",
                                        isCurrent ? "bg-violet-50 border-violet-100 shadow-sm" : "hover:bg-slate-50",
                                        isFutureStep && "opacity-40 grayscale-[0.5]"
                                      )}
                                    >
                                       <div className="mt-0.5 flex-shrink-0">
                                          {isCompleted ? (
                                             <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center border border-green-200">
                                                <Check size={12} strokeWidth={3} />
                                             </div>
                                          ) : isCurrent ? (
                                             <div className="w-5 h-5 rounded-full bg-violet-600 border-2 border-white shadow-lg shadow-violet-200 ring-2 ring-violet-500 animate-pulse"></div>
                                          ) : (
                                             <div className="w-5 h-5 rounded-full border-2 border-slate-200 bg-white group-hover:border-slate-300"></div>
                                          )}
                                       </div>
                                        <div className="flex-1 min-w-0">
                                           <div className={cn(
                                              "text-sm font-medium transition-colors leading-tight",
                                              isCurrent ? "text-violet-900 font-semibold" :
                                              isCompleted ? "text-slate-700" : "text-slate-400 group-hover:text-slate-600"
                                           )}>
                                              {step.subState || step.fullName}
                                           </div>
                                           <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                                              <div className="text-[10px] text-slate-400 uppercase tracking-tight font-semibold">
                                                 {step.owner}
                                              </div>
                                              {isCompleted && (
                                                 <>
                                                    <span className="text-slate-200">•</span>
                                                    <span className="text-[10px] text-green-600 font-medium">Completato</span>
                                                    <span className="text-slate-200">•</span>
                                                    <span className="text-[10px] text-slate-400">
                                                      {new Date(Date.now() - (currentStep.id - step.id) * 86400000).toLocaleDateString('it-IT', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric'
                                                      })} {new Date(Date.now() - (currentStep.id - step.id) * 86400000).toLocaleTimeString('it-IT', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                      })}
                                                    </span>
                                                 </>
                                              )}
                                           </div>
                                        </div>
                                    </button>
                                 </li>
                               );
                            })}
                         </ul>
                      </div>
                   );
                })}
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
