import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, Circle, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useWorkflow } from '@/context/WorkflowContext';

// State-specific configurations
const STATE_CONFIGS = {
  "Aperta - Validazione documenti": {
    title: "Verifica Documentale",
    description: "Analizza attentamente tutti i documenti caricati dal cliente. Verifica la corrispondenza dei dati tra il Codice Fiscale del condominio e il verbale di nomina dell'amministratore.",
    requirements: [
      { id: 'privacy', label: 'Validità documenti privacy', checked: true },
      { id: 'verbali', label: 'Coerenza date verbali', checked: false }
    ],
    nextSteps: [
      { id: 1, text: 'Segnala eventuali anomalie nelle note del documento specifico.' },
      { id: 2, text: 'Invia la pratica in \'KO\' se i documenti obbligatori mancano dopo 3 solleciti.' }
    ],
    warning: {
      type: 'info',
      title: 'PROMEMORIA',
      message: 'Ricorda che la delibera assemblea deve contenere....'
    },
    proceedLabel: 'Ho verificato i documenti'
  },
  "Caricata - Lavorazione AML e Banche Dati": {
    title: "Controllo AML e Banche Dati",
    description: "Esegui le verifiche AML (Anti-Money Laundering) e controlla le banche dati per valutare il profilo di rischio del cliente.",
    requirements: [
      { id: 'hawk', label: 'Documento HAWK caricato', checked: false },
      { id: 'db', label: 'Esito banche dati caricato', checked: true },
      { id: 'aml', label: 'Esito AML selezionato', checked: true }
    ],
    nextSteps: [
      { id: 1, text: 'Carica il report HAWK nel sistema.' },
      { id: 2, text: 'Verifica l\'esito del controllo banche dati.' },
      { id: 3, text: 'Seleziona l\'esito AML appropriato.' }
    ],
    warning: {
      type: 'warning',
      title: 'ATTENZIONE',
      message: 'In caso di esito "Arancione - Forzante" è necessaria una verifica rafforzata prima di procedere.'
    },
    proceedLabel: 'Controlli completati'
  },
  "Bozza": {
    title: "Creazione Pratica",
    description: "Inserisci i dati preliminari della pratica e verifica che tutte le informazioni di base siano corrette.",
    requirements: [
      { id: 'dati', label: 'Dati anagrafici completi', checked: true },
      { id: 'importo', label: 'Importo finanziamento inserito', checked: true }
    ],
    nextSteps: [
      { id: 1, text: 'Verifica i dati anagrafici del condominio.' },
      { id: 2, text: 'Conferma l\'importo da finanziare.' }
    ],
    warning: null,
    proceedLabel: 'Apri la pratica'
  }
};

export function OperatorAssistant({ isOpen, onClose }) {
  const { currentStep } = useWorkflow();

  const [showKOModal, setShowKOModal] = useState(false);
  const [koReason, setKoReason] = useState('');

  // Get configuration for current state
  const config = STATE_CONFIGS[currentStep.fullName] || STATE_CONFIGS["Bozza"];

  // Check if all requirements are met
  const allRequirementsMet = config.requirements.every(req => req.checked);

  const handleProceed = () => {
    alert(`Procedendo con: ${config.proceedLabel}`);
    // Here you would implement the actual proceed logic
  };

  const handleKO = () => {
    if (koReason.trim()) {
      alert(`Pratica mandata in KO. Motivo: ${koReason}`);
      setShowKOModal(false);
      setKoReason('');
      // Here you would implement the actual KO logic
    }
  };

  return (
    <>
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

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 flex flex-col"
            >


              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-violet-50 to-white">
                <div>
                  <h2 className="font-semibold text-lg text-slate-900">Supporto attività</h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white rounded-full text-slate-400 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Current Phase */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    FASE CORRENTE
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <h3 className="font-semibold text-slate-900">{config.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {config.description}
                    </p>

                    {/* Requirements Checklist */}
                    <div className="space-y-2 pt-2">
                      {config.requirements.map(req => (
                        <div key={req.id} className="flex items-center gap-2">
                          {req.checked ? (
                            <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                          ) : (
                            <Circle size={16} className="text-slate-300 flex-shrink-0" />
                          )}
                          <span className={cn(
                            "text-xs",
                            req.checked ? "text-slate-700" : "text-slate-400"
                          )}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    PROSSIMI PASSAGGI
                  </div>

                  <div className="space-y-3">
                    {config.nextSteps.map(step => (
                      <div key={step.id} className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
                          {step.id}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed pt-0.5">
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 border-t border-slate-100 space-y-3 bg-slate-50">
                <button
                  onClick={handleProceed}
                  disabled={!allRequirementsMet}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
                    allRequirementsMet
                      ? "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-200"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  )}
                >
                  <CheckCircle size={16} />
                  {config.proceedLabel}
                </button>

                <button
                  onClick={() => setShowKOModal(true)}
                  className="w-full px-4 py-3 border-2 border-red-200 bg-white text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                >
                  Manda in KO
                </button>

                <div className="pt-2 text-center">
                  <button className="text-xs text-slate-400 hover:text-slate-600 underline transition-colors">
                    Richiesta supporto tecnico
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* KO Modal */}
      <AnimatePresence>
        {showKOModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowKOModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">Manda pratica in KO</h3>
                    <p className="text-sm text-slate-500 mt-1">Inserisci il motivo del rifiuto</p>
                  </div>
                  <button
                    onClick={() => setShowKOModal(false)}
                    className="p-1 hover:bg-slate-100 rounded-full text-slate-400"
                  >
                    <X size={20} />
                  </button>
                </div>

                <textarea
                  value={koReason}
                  onChange={(e) => setKoReason(e.target.value)}
                  placeholder="Descrivi il motivo per cui la pratica viene rifiutata..."
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 resize-none"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowKOModal(false)}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Annulla
                  </button>
                  <button
                    onClick={handleKO}
                    disabled={!koReason.trim()}
                    className={cn(
                      "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      koReason.trim()
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    )}
                  >
                    Conferma KO
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
