import React, { useState, useEffect } from 'react';
import { X, Check, Search, FileText, Trash2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function FascicoloOffcanvas({ isOpen, onClose, onSave, onDelete, initialData, availableDocuments }) {
  const [name, setName] = useState('');
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [isSignatureEnabled, setIsSignatureEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setSelectedDocs(initialData.documentIds || []);
      setIsSignatureEnabled(initialData.isSignatureEnabled || false);
    } else {
      setName('');
      setSelectedDocs([]);
      setIsSignatureEnabled(false);
    }
  }, [initialData, isOpen]);

  const toggleDoc = (docId) => {
    setSelectedDocs(prev =>
      prev.includes(docId)
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Inserisci un nome per il fascicolo');
      return;
    }
    if (selectedDocs.length === 0) {
      alert('Seleziona almeno un documento');
      return;
    }
    onSave({
      id: initialData?.id || Date.now(),
      name,
      documentIds: selectedDocs,
      isSignatureEnabled,
      updatedAt: new Date().toLocaleDateString('it-IT')
    });
    onClose();
  };

  const filteredDocs = availableDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-[450px] bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-xl text-slate-900">
                  {initialData ? 'Modifica Fascicolo' : 'Nuovo Fascicolo'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">Raggruppa i documenti della pratica</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Bundle Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nome del fascicolo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="es. Fascicolo per Firma Amministratore"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300 transition-all"
                />
              </div>

              {/* Signature Toggle */}
              <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <ShieldCheck className="text-violet-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-violet-900">Abilita firma digitale</p>
                    <p className="text-[11px] text-violet-600">Richiedi la firma per tutti i documenti selezionati</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSignatureEnabled(!isSignatureEnabled)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative",
                    isSignatureEnabled ? "bg-violet-600" : "bg-slate-200"
                  )}
                >
                  <motion.div
                    animate={{ x: isSignatureEnabled ? 26 : 2 }}
                    className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </button>
              </div>

              {/* Document Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">Documenti da inserire</label>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {selectedDocs.length} selezionati
                  </span>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cerca documento..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-slate-300 transition-all"
                  />
                </div>

                {/* Document List */}
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredDocs.map(doc => {
                    const isSelected = selectedDocs.includes(doc.id);
                    return (
                      <button
                        key={doc.id}
                        onClick={() => toggleDoc(doc.id)}
                        className={cn(
                          "w-full flex items-center gap-4 p-3 rounded-xl border transition-all text-left group",
                          isSelected
                            ? "bg-white border-violet-200 shadow-sm"
                            : "bg-white border-slate-100 hover:border-slate-200"
                        )}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                          isSelected ? "bg-violet-600 border-violet-600" : "bg-white border-slate-200 group-hover:border-slate-300"
                        )}>
                          {isSelected && <Check size={12} className="text-white" strokeWidth={4} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm font-medium transition-colors truncate",
                            isSelected ? "text-violet-900" : "text-slate-700"
                          )}>
                            {doc.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                            {doc.status}
                          </p>
                        </div>
                        <FileText size={16} className={cn(
                          "transition-colors",
                          isSelected ? "text-violet-400" : "text-slate-300"
                        )} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
              {initialData && (
                <button
                  onClick={() => {
                    if (window.confirm('Sei sicuro di voler eliminare questo fascicolo?')) {
                      onDelete(initialData.id);
                      onClose();
                    }
                  }}
                  className="flex items-center justify-center p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                  title="Elimina fascicolo"
                >
                  <Trash2 size={20} />
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-white hover:border-slate-300 transition-all"
              >
                Annulla
              </button>
              <button
                onClick={handleSave}
                className="flex-[2] px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all flex items-center justify-center gap-2"
              >
                {initialData ? 'Aggiorna Fascicolo' : 'Salva Fascicolo'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
