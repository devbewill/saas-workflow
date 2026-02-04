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
