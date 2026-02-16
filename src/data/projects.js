import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const PROJECTS = [
    {
        id: 'PRA-2024-001',
        displayId: '99',
        name: 'Condominio Einaudi - Corpo 1',
        status: 'Aperta - Verifica preliminare',
        statusCategory: 'Aperta',
        amount: 300000,
        created: '20/05/2024',
        updated: '01/01/2026',
        owner: 'Stefano Perelli',
        brokerId: '0556',
        ocsId: '-',
    },
    {
        id: '1',
        displayId: '1',
        name: 'Condominio - Giambellino 12',
        status: 'Aperta - Verifica preliminare',
        statusCategory: 'Aperta',
        updated: '01/01/2026',
        created: '23/06/25',
        owner: 'Stefano Perelli',
        brokerId: '0556',
        ocsId: '-',
    },
    {
        id: '6',
        displayId: '6',
        name: 'Condominio - Piazza Napoli 2',
        status: 'Aperta - Verifica AML',
        statusCategory: 'Aperta',
        updated: '01/01/2026',
        created: '23/06/25',
        owner: 'Stefano Perelli',
        brokerId: '0556',
        ocsId: '-',
    },
    {
        id: '7',
        displayId: '7',
        name: 'Condominio - Roma 123',
        status: 'Aperta - Verifica preliminare',
        statusCategory: 'Aperta',
        updated: '01/01/2026',
        created: '23/06/25',
        owner: 'Stefano Perelli',
        brokerId: '0556',
        ocsId: '-',
    },
];

export const STATS = [
    { label: 'Progetti Totali', value: '1,240', change: '+12%', trend: 'up', icon: FileText },
    { label: 'In Lavorazione', value: '95', change: '+5%', trend: 'up', icon: Clock },
    { label: 'Approvate', value: '842', change: '+18%', trend: 'up', icon: CheckCircle },
    { label: 'Da Revisionare', value: '12', change: '-2%', trend: 'down', icon: AlertCircle },
];

export const RECENT_ACTIONS = [
    { id: 1, type: 'status_change', text: 'Stato aggiornato a "Verifica Preliminare"', target: 'Pratica 99', time: '10 min fa' },
    { id: 2, type: 'upload', text: 'Caricato documento "Privacy Policy"', target: 'Condominio Roma', time: '2 ore fa' },
    { id: 3, type: 'note', text: 'Aggiunta nota su anagrafica', target: 'Mario Rossi', time: '4 ore fa' },
];
