import React from 'react';
import { Search } from 'lucide-react';
import { PAYMENT_PROJECTS } from '@/data/paymentsMockData';
import { useAppContext } from '@/context/AppContext';
import { ROLE_POLICIES } from '@/config/roles-config';

// Role-specific components
import { AdminPaymentsView } from '@/components/specific/AdminPaymentsView';
import { GestorePaymentsTable } from '@/components/specific/GestorePaymentsTable';
import { TechPaymentsMonitor } from '@/components/specific/TechPaymentsMonitor';

export default function PaymentsOverview() {
    const { user } = useAppContext();
    const policy = ROLE_POLICIES[user.role]?.payments;

    // Data Filtering based on policy (e.g., viewing only assigned projects)
    const displayedProjects = policy?.view === 'WALLET_DASHBOARD'
        ? PAYMENT_PROJECTS.slice(0, 2) // Simulating "My Wallet" by taking first two
        : PAYMENT_PROJECTS;

    const renderRoleView = () => {
        switch (policy?.view) {
            case 'WALLET_DASHBOARD':
                return <AdminPaymentsView projects={displayedProjects} />;
            case 'GLOBAL_MONITORING':
                return <GestorePaymentsTable projects={displayedProjects} />;
            case 'SYSTEM_HEALTH':
                return <TechPaymentsMonitor />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                        <p className="text-slate-400 font-medium">Questa vista ({policy?.view || 'nessuna'}) non è ancora stata implementata per il ruolo {user.role}.</p>
                    </div>
                );
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-primary">
                        {policy?.view === 'WALLET_DASHBOARD' ? 'Gestione Wallet' :
                            policy?.view === 'SYSTEM_HEALTH' ? 'Tech Monitor' : 'Monitoraggio Wallet'}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {policy?.view === 'WALLET_DASHBOARD'
                            ? 'Profilo proprietario wallet: controlla i tuoi fondi e le fatture' :
                            policy?.view === 'SYSTEM_HEALTH' ? 'System Health & Node Persistence Monitor'
                                : 'Stato attivazione wallet per i progetti in carico'}
                    </p>
                </div>

                {policy?.view === 'GLOBAL_MONITORING' && (
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input
                                type="text"
                                placeholder="Cerca progetto..."
                                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none w-64 bg-white shadow-sm"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Dynamic Content */}
            {renderRoleView()}
        </div>
    );
}
