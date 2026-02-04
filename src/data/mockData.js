import { Share2, FileText, Calendar, Globe, LayoutDashboard } from "lucide-react";

export const USER = {
  name: "Marzia",
  role: "Operator"
};

export const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
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
  { name: "Istruttoria", value: 30, color: "#22d3ee" }, // Cyan
  { name: "Bozza", value: 47, color: "#1e293b" }, // Slate 900
  { name: "Aperta", value: 90, color: "#8b5cf6" }, // Violet 500
  { name: "KO", value: 12, color: "#ef4444" }, // Red 500
];

export const RECENT_ACTIONS = [
   { id: 1, type: 'status_change', text: 'Stato aggiornato a "Verifica Preliminare"', target: 'Pratica #0001', time: '10 min fa' },
   { id: 2, type: 'upload', text: 'Caricato documento "Privacy Policy"', target: 'Condominio Roma', time: '2 ore fa' },
   { id: 3, type: 'note', text: 'Aggiunta nota su anagrafica', target: 'Mario Rossi', time: '4 ore fa' },
];
