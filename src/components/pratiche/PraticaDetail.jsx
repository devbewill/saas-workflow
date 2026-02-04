import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRACTICES, CONDOMINIUM_DATA, FINANCIAL_DATA } from '@/data/mockData';
import { ArrowLeft, Clock, Info, Upload, Edit, FileText, CloudUpload, Headset, FileSignature, ShieldCheck, Plus, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TimelinePanel } from '../timeline/TimelinePanel';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../ui/Table';
import { motion } from 'framer-motion';
import { useWorkflow } from '@/context/WorkflowContext';
import { AMLVerificationView } from './AMLVerificationView';
import { OperatorAssistant } from '../assistant/OperatorAssistant';
import { FascicoloOffcanvas } from './FascicoloOffcanvas';

// Mock Documents Data
const DOCUMENTS = [
  { id: 1, name: "Codice Fiscale Condominio", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700" },
  { id: 2, name: "Informativa Privacy Condominio", file: "InformativaPrivacyCondominio.pdf", date: "23/06/25", status: "Caricato", statusColor: "bg-green-200 text-green-700" },
  { id: 3, name: "Informativa SIC Condominio", file: "InformativaSICCondominio.pdf", date: "23/06/25", status: "In attesa", statusColor: "bg-yellow-200 text-yellow-700" },
  { id: 4, name: "Verbale nomina", file: "Verbale_nomina.pdf", date: "23/06/25", status: "Caricato", statusColor: "bg-green-200 text-green-700" },
  { id: 5, name: "Tessera sanitaria", file: "Tessera:sanitaria.jpg", date: "23/06/25", status: "Caricato", statusColor: "bg-green-200 text-green-700" },
  { id: 6, name: "Presentazione Condominio", file: "PresentazioneCondominio.pdf", date: "23/05/25", status: "Caricato", statusColor: "bg-green-200 text-green-700" },
  { id: 7, name: "Preventivo spese", file: "Preventivo:spese.pdf", date: "23/06/25", status: "Caricato", statusColor: "bg-green-200 text-green-700" },
];

const DataGroup = ({ title, data, columns = 2 }) => {
  if (!Array.isArray(data)) {
    console.error(`DataGroup Error: data for ${title} is not an array`, data);
    return null;
  }
  return (
  <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
    <div className="px-4 py-2 bg-slate-100/50 border-b border-slate-200 font-semibold text-xs uppercase tracking-wider text-slate-500">
      {title.replace('_', ' ')}
    </div>
    <div className={cn("grid p-4 gap-y-4 gap-x-6", columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4")}>
      {data.map((item, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{item.label}</span>
          <span className="text-sm font-medium text-slate-900 truncate" title={item.value}>{item.value}</span>
        </div>
      ))}
    </div>
  </div>
)};

export default function PraticaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  // ... existing code ...

  const practiceData = PRACTICES.find(p => p.id === id) || PRACTICES[0];
  const { currentStatusName, currentStep, getStatusColor, setStatus } = useWorkflow();
  const [activeTab, setActiveTab] = useState("Documenti");

  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(true);

  // Fascicoli State
  const [bundles, setBundles] = useState([
    { id: 1, name: 'Documenti Amministratore', documentIds: [4, 5], isSignatureEnabled: true, updatedAt: '04/02/2026' }
  ]);
  const [isFascicoloOpen, setIsFascicoloOpen] = useState(false);
  const [editingFascicolo, setEditingFascicolo] = useState(null);

  const handleSaveFascicolo = (bundle) => {
    setBundles(prev => {
      const exists = prev.find(b => b.id === bundle.id);
      if (exists) return prev.map(b => b.id === bundle.id ? bundle : b);
      return [...prev, bundle];
    });
  };

  const handleDeleteFascicolo = (id) => {
    setBundles(prev => prev.filter(b => b.id !== id));
  };

  // Always reset to "Aperta - Validazione documenti" when entering the detail view from dashboard
  React.useEffect(() => {
    setStatus("Aperta - Validazione documenti");
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-8">
         <div className="flex items-start justify-between">
            <div>
               <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-semibold text-slate-900">Pratica {practiceData.displayId}</h1>
                  <button
                    onClick={() => setIsTimelineOpen(true)}
                    className={cn(
                      "px-3 py-1 rounded-md text-sm font-medium transition-colors hover:opacity-80 shadow-sm",
                      getStatusColor(currentStep.state)
                    )}
                  >
                    {currentStatusName}
                  </button>
               </div>
               <div className="text-sm text-slate-500 flex flex-wrap gap-x-6 gap-y-2">
                  <span>Creata il: <strong className="text-slate-700">{practiceData.created}</strong></span>
                  <span>Corpo-condominio: <strong className="text-slate-700">{practiceData.name}</strong></span>
                  <span>Importo da finanziare: <strong className="text-slate-700">€ {practiceData.amount?.toLocaleString()}</strong></span>
                  <span>Pratica Broker: <strong className="text-slate-700">{practiceData.brokerId}</strong></span>
                  <span>Pratica OCS: <strong className="text-slate-700">{practiceData.ocsId}</strong></span>
                  <button onClick={() => setActiveTab("Dati Completi")} className="text-slate-400 underline decoration-dotted hover:text-blue-600 hover:decoration-blue-600 transition-all">Mostra dati completi</button>
               </div>
            </div>
         </div>
      </div>

      {/* Conditional Content Based on Workflow State */}
      {currentStep.fullName === "Caricata - Lavorazione AML e Banche Dati" ? (
        <AMLVerificationView />
      ) : (
        <div>
          {/* Tabs */}
          <div className="flex gap-8 border-b border-slate-100 mb-6 font-medium">
            {["Documenti", "Dati Completi", "Fascicoli", "Team di lavoro"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-3 text-sm relative transition-colors",
                  activeTab === tab ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {activeTab === "Dati Completi" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
               {/* Left Column: Condominium Data */}
               <div className="space-y-6">
                 <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                   <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                     <Home size={16} />
                   </div>
                   <h3 className="font-semibold text-slate-900 text-lg">Dati Condominio</h3>
                 </div>

                 {CONDOMINIUM_DATA ? Object.entries(CONDOMINIUM_DATA).map(([key, data]) => (
                   <DataGroup key={key} title={key} data={data} columns={key === 'anagrafica' ? 4 : 2} />
                 )) : <p className="text-red-500">Errore caricamento dati condominio</p>}
               </div>

               {/* Right Column: Financial Data */}
               <div className="space-y-6">
                 <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
                   <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                     <FileText size={16} />
                   </div>
                   <h3 className="font-semibold text-slate-900 text-lg">Prodotto Finanziario</h3>
                 </div>

                 {FINANCIAL_DATA ? Object.entries(FINANCIAL_DATA).map(([key, data]) => (
                    <DataGroup key={key} title={key} data={data} columns={key === 'durata_tassi' ? 3 : 2} />
                 )) : <p className="text-red-500">Errore caricamento dati finanziari</p>}
               </div>
            </div>
          )}

          {/* Tab Content */}
          {activeTab === "Documenti" && (
            <div className="space-y-6">
               {/* Documents Table */}
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead className="w-12">Id</TableHead>
                        <TableHead>Documento</TableHead>
                        <TableHead>Caricato il</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead></TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     {DOCUMENTS.map((doc) => (
                        <TableRow key={doc.id}>
                           <TableCell className="text-slate-500">{doc.id}</TableCell>
                           <TableCell className="text-slate-700 flex items-center gap-1 font-medium">
                              {doc.name}
                           </TableCell>
                           <TableCell className="text-slate-500">{doc.date}</TableCell>
                           <TableCell>
                              <button className="p-1 hover:bg-slate-100 rounded text-slate-400"><Edit size={14} /></button>
                           </TableCell>
                           <TableCell>
                              <span className={cn("px-2 py-1 rounded text-[10px] font-semibold uppercase tracking-wider", doc.statusColor)}>
                                 {doc.status}
                              </span>
                           </TableCell>
                           <TableCell className="text-right flex items-center justify-end gap-2">
                               <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors" title="Manda in firma"><FileSignature size={16} /></button>
                              {doc.status === "Da caricare" ? (
                                 <button className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"><CloudUpload size={16} /></button>
                              ) : (
                                 <>
                                    <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"><Edit size={16} /></button>
                                    <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"><CloudUpload size={16} /></button>
                                 </>
                              )}
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
          )}

          {activeTab === "Fascicoli" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                 <div>
                   <h3 className="text-xl font-semibold text-slate-900 leading-tight">Documenti in lavorazione</h3>
                   <p className="text-sm text-slate-500 mt-1 italic leading-relaxed">Gestisci i raggruppamenti di documenti per questa pratica.</p>
                 </div>
                  <button
                    onClick={() => { setEditingFascicolo(null); setIsFascicoloOpen(true); }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-sm"
                  >
                    <Plus size={16} /> Crea nuovo fascicolo
                  </button>
              </div>

              {bundles.length === 0 ? (
                 <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] p-20 text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mx-auto mb-6">
                      <FileText size={32} className="text-slate-300" />
                    </div>
                    <p className="text-slate-500 font-medium italic">Nessun fascicolo creato per questa pratica.</p>
                    <p className="text-slate-400 text-xs mt-2">Crea un fascicolo per organizzare i documenti o richiedere firme massive.</p>
                 </div>
              ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                     {bundles.map(bundle => (
                        <button
                           key={bundle.id}
                           onClick={() => { setEditingFascicolo(bundle); setIsFascicoloOpen(true); }}
                           className="bg-white border border-slate-200 p-5 rounded-lg hover:border-blue-300 hover:shadow-md transition-all text-left flex flex-col gap-4 group relative overflow-hidden"
                        >
                           <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full translate-x-12 -translate-y-12" />

                           <div className="flex items-center justify-between w-full relative z-10">
                             <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-slate-100">
                               <FileText size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                             </div>
                             {bundle.isSignatureEnabled && (
                               <div className="px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-blue-100">
                                 <ShieldCheck size={12} className="text-blue-600" /> Signature
                               </div>
                             )}
                           </div>
                           <div className="relative z-10 w-full">
                              <h4 className="font-semibold text-base text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">{bundle.name}</h4>
                              <div className="flex items-center gap-3 mt-2 border-t border-slate-50 pt-3 w-full">
                                 <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                                   {bundle.documentIds.length} docs
                                 </span>
                                 <span className="text-[10px] text-slate-400 font-medium ml-auto">Aggiornato: {bundle.updatedAt}</span>
                              </div>
                           </div>
                        </button>
                     ))}
                 </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Timeline Panel Overlay */}
      <TimelinePanel
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
      />

      {/* Floating Assistant Button */}
      {!isAssistantOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-900/20 hover:bg-blue-700 transition-all flex items-center justify-center z-30 group hover:scale-105"
        >
          <Headset size={24} className="group-hover:animate-pulse" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></span>
        </motion.button>
      )}

      {/* Operator Assistant Panel */}
      <OperatorAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />

      {/* Fascicolo Offcanvas */}
      <FascicoloOffcanvas
        isOpen={isFascicoloOpen}
        onClose={() => setIsFascicoloOpen(false)}
        initialData={editingFascicolo}
        availableDocuments={DOCUMENTS}
        onSave={handleSaveFascicolo}
        onDelete={handleDeleteFascicolo}
      />

    </div>
  );
}
