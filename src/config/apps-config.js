import { ShieldCheck, Home, Briefcase, LayoutDashboard, FileText, Users, BarChart3, Settings, Wallet, Building2, Network } from 'lucide-react';

const COMMON_NAV = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Progetti', path: '/projects' },
    { icon: Settings, label: 'Impostazioni', path: '/settings' },
];

export const APPS = {
    HD_CEF: {
        id: 'HD_CEF',
        name: 'HD CEF',
        label: 'Credito Extra Fondiario',
        icon: ShieldCheck,
        color: 'primary', // Use theme primary
        version: 'v0.1',
        features: {
            aml: true,
            banche_dati: true,
            tabs: ['info', 'documenti', 'fascicoli', 'aml', 'crediti', 'delibera', 'contratto', 'team']
        },
        navItems: [...COMMON_NAV]
    },
    HD_RISTR: {
        id: 'HD_RISTR',
        name: 'HD RISTR',
        label: 'Ristrutturazioni',
        icon: Home,
        color: 'primary',
        version: 'v0.1',
        features: {
            aml: false,
            banche_dati: false,
            tabs: ['info', 'documenti', 'pagamenti', 'fascicoli', 'delibera', 'contratto', 'team']
        },
        navItems: (function () {
            const items = [...COMMON_NAV];
            items.splice(2, 0, { icon: Wallet, label: 'Pagamenti', path: '/payments' });
            items.splice(3, 0, { icon: Building2, label: 'Imprese', path: '/imprese' });
            items.splice(4, 0, { icon: Network, label: 'Rete commerciale', path: '/rete-commerciale' });
            return items;
        })()
    },
    HD_BRK: {
        id: 'HD_BRK',
        name: 'HD BRK',
        label: 'Broker Esterni',
        icon: Briefcase,
        color: 'orange-500',
        version: 'v0.1',
        features: {
            aml: false,
            banche_dati: false,
            tabs: ['info', 'documenti', 'aml', 'fascicoli', 'team']
        },
        navItems: [...COMMON_NAV]
    }
};

export const DEFAULT_APP = APPS.HD_CEF;
