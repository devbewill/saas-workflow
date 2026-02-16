/**
 * navigation.js
 * Centralized navigation configuration.
 * Defines sidebar nav items for each app.
 */
import { LayoutDashboard, FileText, Settings, Wallet, Building2, Network } from 'lucide-react';

const COMMON_NAV = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Progetti', path: '/projects' },
    { icon: Wallet, label: 'Pagamenti', path: '/payments' },
    { icon: Settings, label: 'Impostazioni', path: '/settings' },
];

/**
 * Get navigation items for a given app ID.
 * @param {string} appId
 * @returns {Array} navigation items
 */
export function getNavItems(appId) {
    switch (appId) {
        case 'HD_RISTR':
            return [
                COMMON_NAV[0], // Dashboard
                COMMON_NAV[1], // Progetti
                COMMON_NAV[2], // Pagamenti
                { icon: Building2, label: 'Imprese', path: '/imprese' },
                { icon: Network, label: 'Rete commerciale', path: '/rete-commerciale' },
                COMMON_NAV[3], // Impostazioni
            ];
        default:
            return [...COMMON_NAV];
    }
}
