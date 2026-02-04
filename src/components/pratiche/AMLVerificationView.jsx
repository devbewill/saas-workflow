import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Upload, Eye, Trash2, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AMLVerificationView() {
  const [amlOutcome, setAmlOutcome] = useState('Rosso - Alto');
  const [dbOutcome, setDbOutcome] = useState('Verde - Positivo');
  const [amlNotes, setAmlNotes] = useState('');
  const [dbNotes, setDbNotes] = useState('');
  const [hawkDocument, setHawkDocument] = useState(null);
  const [dbDocument, setDbDocument] = useState({
    name: 'Esito_banche_dati.pdf',
    date: '03/02/2026'
  });

  // Dynamic risk configuration based on selection
  const getRiskConfig = (outcome) => {
    if (outcome.includes('Rosso')) {
      return {
        color: 'bg-red-500',
        textColor: 'text-red-500',
        label: 'KO',
        icon: '✕'
      };
    } else if (outcome.includes('Arancione')) {
      return {
        color: 'bg-orange-500',
        textColor: 'text-orange-500',
        label: 'Forzante',
        icon: '⚠'
      };
    } else {
      // Verde - Medio or Verde - Basso
      const isMedio = outcome.includes('Medio');
      return {
        color: 'bg-green-500',
        textColor: 'text-green-500',
        label: isMedio ? 'Rischio Medio' : 'Rischio Basso',
        icon: '✓'
      };
    }
  };

  const riskConfig = getRiskConfig(amlOutcome);
  const showWarning = amlOutcome === 'Arancione - Forzante';

  // Dynamic database check configuration
  const getDbConfig = (outcome) => {
    if (outcome.includes('Rosso')) {
      return {
        color: 'bg-red-500',
        textColor: 'text-red-500',
        label: 'KO',
        icon: '✕'
      };
    } else if (outcome.includes('Arancione')) {
      return {
        color: 'bg-orange-500',
        textColor: 'text-orange-500',
        label: 'Da verificare',
        icon: '⚠'
      };
    } else {
      return {
        color: 'bg-green-500',
        textColor: 'text-green-500',
        label: 'Positivo',
        icon: '✓'
      };
    }
  };

  const dbConfig = getDbConfig(dbOutcome);

  // File upload handlers
  const handleHawkUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setHawkDocument({
        name: file.name,
        date: new Date().toLocaleDateString('it-IT')
      });
    }
  };

  const handleDbUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setDbDocument({
        name: file.name,
        date: new Date().toLocaleDateString('it-IT')
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel: Verifica AML */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Verifica AML - Profilo di rischio</h3>
          <AlertTriangle size={20} className="text-amber-500" />
        </div>

        {/* Risk Status Indicator - Dynamic */}
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-3">
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-2xl",
              riskConfig.color
            )}>
              {riskConfig.icon}
            </div>
            <span className={cn("text-sm font-semibold", riskConfig.textColor)}>
              {riskConfig.label}
            </span>
          </div>
        </div>

        {/* Outcome Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Esito controllo</label>
          <select
            value={amlOutcome}
            onChange={(e) => setAmlOutcome(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300"
          >
            <option>Rosso - KO</option>
            <option>Arancione - Forzante</option>
            <option>Verde - Medio</option>
            <option>Verde - Basso</option>
          </select>
        </div>

        {/* Notes Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Motivazione / Note forzature</label>
          <textarea
            value={amlNotes}
            onChange={(e) => setAmlNotes(e.target.value)}
            placeholder="Richiesta adeguata verifica rafforzata"
            rows={4}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300 resize-none"
          />
        </div>

        {/* Warning Alert - Conditional */}
        {showWarning && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
            <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-amber-900">Adeguata verifica rafforzata in corso</p>
              <p className="text-amber-700 mt-1">
                Sono necessarie ulteriori informazioni per poter proseguire con il processo
              </p>
            </div>
          </div>
        )}

        {/* Document Upload/Display */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Documento HAWK</label>

          {!hawkDocument ? (
            <label className="block cursor-pointer">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleHawkUpload}
                className="hidden"
              />
              <div className="border-2 border-dashed border-red-300 bg-red-50 rounded-lg p-8 text-center hover:border-red-400 hover:bg-red-100 transition-colors">
                <Upload size={32} className="mx-auto text-red-400 mb-3" />
                <p className="text-sm text-slate-600 font-medium">
                  Trascina qui il file o clicca per selezionare
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Caricare il report/screenshot/esito generato da HAWK (PDF)
                </p>
              </div>
            </label>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{hawkDocument.name}</p>
                  <p className="text-xs text-slate-500">Caricato il {hawkDocument.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHawkDocument(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg text-violet-600 transition-colors">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Controllo Banche Dati */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Controllo Banche dati</h3>
          <CheckCircle size={20} className="text-green-500" />
        </div>

        {/* Database Status Indicator - Dynamic */}
        <div className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-3">
            <div className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center shadow-lg text-white font-bold text-2xl",
              dbConfig.color
            )}>
              {dbConfig.icon}
            </div>
            <span className={cn("text-sm font-semibold", dbConfig.textColor)}>
              {dbConfig.label}
            </span>
          </div>
        </div>

        {/* Outcome Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Esito controllo</label>
          <select
            value={dbOutcome}
            onChange={(e) => setDbOutcome(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300"
          >
            <option>Verde - Positivo</option>
            <option>Arancione - Da verificare</option>
            <option>Rosso - KO</option>
          </select>
        </div>

        {/* Notes Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Note</label>
          <textarea
            value={dbNotes}
            onChange={(e) => setDbNotes(e.target.value)}
            placeholder="Inserire eventuali note a supporto dell'esito"
            rows={4}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-300 resize-none"
          />
        </div>

        {/* Document Upload/Display */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Documento esito Banche dati</label>

          {!dbDocument ? (
            <label className="block cursor-pointer">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleDbUpload}
                className="hidden"
              />
              <div className="border-2 border-dashed border-slate-300 bg-slate-50 rounded-lg p-8 text-center hover:border-slate-400 hover:bg-slate-100 transition-colors">
                <Upload size={32} className="mx-auto text-slate-400 mb-3" />
                <p className="text-sm text-slate-600 font-medium">
                  Trascina qui il file o clicca per selezionare
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Caricare il documento di esito (PDF, JPG, PNG)
                </p>
              </div>
            </label>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{dbDocument.name}</p>
                  <p className="text-xs text-slate-500">Caricato il {dbDocument.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDbDocument(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg text-violet-600 transition-colors">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
