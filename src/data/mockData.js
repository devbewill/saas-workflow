import { Share2, FileText, Calendar, Globe, Home, Clock, CheckCircle, AlertCircle } from "lucide-react";

export const USER = {
  name: "Marzia",
  role: "Operator"
};

export const MENU_ITEMS = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Share2, label: "Reti", path: "/reti" },
  { icon: FileText, label: "Pratiche", path: "/pratiche" },
  { icon: Calendar, label: "Appuntamenti", path: "/appuntamenti" },
  { icon: Globe, label: "Traduzioni", path: "/traduzioni" },
];

export const PRACTICES = [
  {
    id: "PRA-2024-001",
    displayId: "#0001",
    name: "Condominio Einaudi - Corpo 1",
    status: "Aperta - Verifica preliminare",
    statusCategory: "Aperta",
    amount: 300000,
    created: "20/05/2024",
    updated: "01/01/2026",
    owner: "Stefano Perelli",
    brokerId: "0556",
    ocsId: "-"
  },
  {
    id: "1",
    displayId: "1",
    name: "Condominio - Giambellino 12",
    status: "Aperta - Verifica preliminare",
    statusCategory: "Aperta",
    updated: "01/01/2026",
    created: "23/06/25",
    owner: "23/06/25" // Date as owner in screenshot? "Owner 23/06/25". Likely a generic placeholder in mock. I'll use "Stefano Perelli" relative to filter.
  },
  {
    id: "6",
    displayId: "6",
    name: "Condominio - Piazza Napoli 2",
    status: "Aperta - Verifica AML",
    statusCategory: "Aperta",
    updated: "01/01/2026",
    created: "23/06/25",
    owner: "23/06/25"
  },
  {
    id: "7",
    displayId: "7",
    name: "Condominio - Roma 123",
    status: "Aperta - Verifica preliminare",
    statusCategory: "Aperta",
    updated: "01/01/2026",
    created: "23/06/25",
    owner: "23/06/25"
  }
];

export const WORKFLOW_STEPS = [
  {
    category: "Aperta",
    steps: [
      { id: "bozza", label: "Bozza", state: "completed" },
      { id: "preliminare", label: "Verifica preliminare", state: "completed" },
      { id: "documenti", label: "Validazione documenti", state: "current", subLabel: "Richiesta integrazione" },
    ]
  },
  {
    category: "Istruttoria",
    steps: [
      { id: "aml", label: "Verifica AML", state: "future" },
      { id: "credit_check", label: "Credit Check", state: "future" },
    ]
  },
  {
    category: "Approvata",
    steps: [
      { id: "approved", label: "Approvata", state: "future" },
    ]
  },
  {
    category: "Perfezionata",
    steps: [
      { id: "done", label: "Erogata", state: "future" },
    ]
  },
];

export const STATS = [
  { label: "Pratiche Totali", value: "1,240", change: "+12%", trend: "up", icon: FileText, color: "indigo" },
  { label: "In Lavorazione", value: "95", change: "+5%", trend: "up", icon: Clock, color: "violet" },
  { label: "Approvate", value: "842", change: "+18%", trend: "up", icon: CheckCircle, color: "emerald" },
  { label: "Da Revisionare", value: "12", change: "-2%", trend: "down", icon: AlertCircle, color: "rose" },
];

export const RECENT_ACTIONS = [
  { id: 1, type: 'status_change', text: 'Stato aggiornato a "Verifica Preliminare"', target: 'Pratica #0001', time: '10 min fa' },
  { id: 2, type: 'upload', text: 'Caricato documento "Privacy Policy"', target: 'Condominio Roma', time: '2 ore fa' },
  { id: 3, type: 'note', text: 'Aggiunta nota su anagrafica', target: 'Mario Rossi', time: '4 ore fa' },
];

export const CONDOMINIUM_DATA = {
  anagrafica: [
    { label: "Denominazione", value: "Condominio Einaudi - Corpo 1" },
    { label: "Codice Fiscale", value: "80012345678" },
    { label: "Tipologia", value: "Supercondominio" },
    { label: "Costituzione", value: "12/05/1980" },
    { label: "Codice Ateco", value: "97.00.00" },
    { label: "Partita IVA", value: "-" },
    { label: "Numero Unità", value: "48" },
    { label: "Numero Scale", value: "4" },
  ],
  indirizzi: [
    { label: "Indirizzo Sede", value: "Via Luigi Einaudi, 12" },
    { label: "CAP", value: "20100" },
    { label: "Comune", value: "Milano" },
    { label: "Provincia", value: "MI" },
    { label: "Regione", value: "Lombardia" },
    { label: "Paese", value: "Italia" },
    { label: "Presso", value: "Studio Amm. Rossi" },
  ],
  amministratore: [
    { label: "Nome", value: "Mario Rossi" },
    { label: "Studio", value: "Studio Associato Rossi & Verdi" },
    { label: "Telefono", value: "+39 02 1234567" },
    { label: "Email", value: "mario.rossi@studio.it" },
    { label: "PEC", value: "studio.rossi@pec.it" },
    { label: "Data Nomina", value: "15/01/2024" },
    { label: "Scadenza Mandato", value: "15/01/2025" },
  ],
  dati_catastali: [
    { label: "Comune", value: "Milano (F205)" },
    { label: "Foglio", value: "34" },
    { label: "Particella", value: "1256" },
    { label: "Subalterno", value: "Tutti" },
    { label: "Categoria", value: "A/2" },
    { label: "Classe", value: "3" },
    { label: "Rendita", value: "€ 45.000,00" },
  ],
  assicurazione: [
    { label: "Compagnia", value: "Generali Italia" },
    { label: "Polizza N.", value: "34567890" },
    { label: "Scadenza", value: "31/12/2025" },
    { label: "Massimale", value: "€ 2.000.000" },
    { label: "Premio Annuo", value: "€ 4.500" },
  ]
};

export const FINANCIAL_DATA = {
  prodotto: [
    { label: "Nome Prodotto", value: "Finanziamento Ristrutturazione Green" },
    { label: "Codice Prodotto", value: "FIN-ECO-110" },
    { label: "Finalità", value: "Riqualificazione Energetica (Superbonus)" },
    { label: "Tipo Tasso", value: "Variabile con Cap" },
    { label: "Indicizzazione", value: "Euribor 3M" },
    { label: "Piano Amm.", value: "Francese" },
  ],
  importi: [
    { label: "Importo Richiesto", value: "€ 300.000,00" },
    { label: "Importo Finanziabile", value: "€ 300.000,00" },
    { label: "Valore Lavori", value: "€ 350.000,00" },
    { label: "LTV", value: "85%" },
    { label: "Rata Stimata", value: "€ 2.850,00" },
    { label: "Debito Residuo", value: "€ 0,00" },
  ],
  durata_tassi: [
    { label: "Durata Mesi", value: "120" },
    { label: "Preammortamento", value: "12 Mesi" },
    { label: "Ammortamento", value: "108 Mesi" },
    { label: "Periodicità", value: "Mensile" },
    { label: "Tasso Nominale", value: "4.50%" },
    { label: "TAEG", value: "4.75%" },
    { label: "Spread", value: "1.20%" },
    { label: "Floor", value: "0.00%" },
    { label: "Cap", value: "6.00%" },
  ],
  garanzie: [
    { label: "Tipo Garanzia", value: "Chirografario" },
    { label: "Garanzia MCC", value: "Sì" },
    { label: "Percentuale MCC", value: "80%" },
    { label: "Fideiussioni", value: "No" },
  ],
  condizioni: [
    { label: "Spese Istruttoria", value: "€ 1.500,00" },
    { label: "Spese Incasso", value: "€ 2,50" },
    { label: "Imposta Sostitutiva", value: "0.25%" },
    { label: "Estinzione Anticipata", value: "1% del capitale rimborsato" },
  ]
};

export const DOCUMENTS = [
  { id: 1, category: "BROKER", name: "Ricevuta consegna foglio informativo e informative obbligatorie di BROKER", file: "--", date: "--", status: "Caricato", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 2, category: "BROKER", name: "Questionario adeguata verifica Broker", file: "--", date: "--", status: "Caricato", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 3, category: "BROKER", name: "Foglio informativo Broker", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 4, category: "BROKER", name: "Informativa privacy Broker", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 5, category: "BROKER", name: "Lettera incarico Collaboratore", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 6, category: "BROKER", name: "Mandato mediazione", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 7, category: "BROKER", name: "Lettera calcolo TAEG", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 8, category: "CEFIN", name: "Ricevuta consegna foglio informativo e informative obbligatorie di CEFIN", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 9, category: "CEFIN", name: "Domanda di finanziamento", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 10, category: "CEFIN", name: "Questionario adeguata verifica AML", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 11, category: "Condominio", name: "Certificato Codice Fiscale Condominio", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 12, category: "Condominio", name: "Informativa Privacy Condominio", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 13, category: "Condominio", name: "Informativa SIC Condominio", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 14, category: "Condominio", name: "Verbale nomina / ultimo rinnovo amministratore in carica", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 15, category: "Condominio", name: "Regolamento condominiale", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 16, category: "Condominio", name: "Presentazione Condominio dell'amministratore", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 17, category: "Condominio", name: "Presentazione Condominio del Broker", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 18, category: "Condominio", name: "Dichiarazione non morosità Condominio", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 19, category: "Condominio", name: "Penultimo verbale assemblea precedente all’approvazione e all'esecuzione dei lavori", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 20, category: "Condominio", name: "Ultimo verbale assemblea precedente all’approvazione e all'esecuzione dei lavori", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 21, category: "Condominio", name: "Elenco completo condòmini e unità immobiliari", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 22, category: "Condominio", name: "Penultimo rendiconto annuale Condominio e relativo verbale di approvazione", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 23, category: "Condominio", name: "Ultimo rendiconto annuale Condominio  e relativo verbale di approvazione", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 24, category: "Condominio", name: "Polizza assicurativa Condominio", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 25, category: "Condominio", name: "Dichiarazione Amministratore stato dei pagamenti", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 26, category: "Condominio", name: "Dichiarazione Amministratore stato recupero crediti", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 27, category: "Condominio", name: "APE pre lavori Condominio", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 28, category: "Condominio", name: "Attestazione Banca IBAN Condominio", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 29, category: "Condominio", name: "Dichiarazione assenza ulteriori spese straordinarie deliberate", file: "--", date: "--", status: "Caricato", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 30, category: "Condominio", name: "Dichiarazione dell'amministratore di assenza di liti o contenzioni", file: "--", date: "--", status: "Caricato", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 31, category: "Condominio", name: "Estratto conto degli ultimi 12 mesi del condominio", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 32, category: "Progetto Edilizio", name: "Delibera di approvazione lavori e richiesta finanziamento", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 33, category: "Progetto Edilizio", name: "Evidenza regolare convocazione assemblea", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 34, category: "Progetto Edilizio", name: "Dichiarazione di assenza impugnazioni della delibera", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 35, category: "Progetto Edilizio", name: "Dichiarazione quorum costitutivi, deliberativi", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 36, category: "Progetto Edilizio", name: "Preventivo spese", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 37, category: "Progetto Edilizio", name: "Computo metrico estimativo e Capitolato", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 38, category: "Progetto Edilizio", name: "Cronoprogramma dei lavori", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 39, category: "Progetto Edilizio", name: "Contratto di appalto", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 40, category: "Progetto Edilizio", name: "Dichiarazione del progettista per assenza abusi edilizi e esistenza edificio", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 41, category: "Progetto Edilizio", name: "Titolo autorizzativo dei lavori", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 42, category: "Progetto Edilizio", name: "Perizia o relazione di un terzo esterno", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 43, category: "Progetto Edilizio", name: "Riparto delle spese straordinarie", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 44, category: "Progetto Edilizio", name: "Atto negoziale per ripartizione spese diversa", file: "--", date: "--", status: "caricato", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 45, category: "Progetto Edilizio", name: "Prospetto rate condominiali future inclusi i lavori", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 46, category: "Amministratore", name: "Documento di identità", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 47, category: "Amministratore", name: "Tessera sanitaria", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 48, category: "Amministratore", name: "Informativa privacy amministratore", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 49, category: "Amministratore", name: "Informativa SIC amministratore", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 50, category: "Amministratore", name: "Attestazione avvenuta identificazione", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 51, category: "Amministratore", name: "Presentazione Amministratore", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 52, category: "Amministratore", name: "Residenza diversa da documento identità", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 53, category: "Amministratore", name: "Eventuali polizze dell'amministratore", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 54, category: "Presidente Assemblea", name: "Documento di identità", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 55, category: "Presidente Assemblea", name: "Tessera sanitaria", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 56, category: "Presidente Assemblea", name: "Informativa privacy", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 57, category: "Presidente Assemblea", name: "Attestazione avvenuta identificazione", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 58, category: "Condòmini rilevanti", name: "Documento di identità", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 59, category: "Condòmini rilevanti", name: "Tessera sanitaria", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 60, category: "Condòmini rilevanti", name: "Informativa privacy", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 61, category: "Condòmini rilevanti", name: "Informativa SIC", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 62, category: "Condòmini rilevanti", name: "Attestazione avvenuta identificazione", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
  { id: 63, category: "Condòmini rilevanti", name: "Ultima dichiarazione dei redditi", file: "--", date: "--", status: "Da caricare", statusColor: "bg-red-200 text-red-700", isSigned: false, validation: false },
];
