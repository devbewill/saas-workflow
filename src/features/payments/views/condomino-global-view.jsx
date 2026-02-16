import React from 'react';
import WalletDashboardView from './wallet-dashboard-view';
import { PAYMENT_PROJECTS, WALLET_STATUS } from '@/data/payments';

export default function CondominoGlobalView() {
    // Mock: Get first project/unit for global view
    // In a real app, this would show a summary of all units or a specific dashboard
    const project = PAYMENT_PROJECTS[0];
    const condoId = 'condomino_0';

    // Mock data preparation
    const personalBalance = 1250.00;
    const walletStatus = project.wallets.condomino[0] || WALLET_STATUS.ACTIVE;

    const invoices = project.invoiceDetails.filter(inv => inv.to === condoId);

    const transactions = [
        { id: 'tr1', type: 'topup', amount: 500, date: '12/02/2026' },
        { id: 'tr2', type: 'payment', amount: 150, date: '10/02/2026' },
        { id: 'tr3', type: 'payment', amount: 85, date: '05/02/2026' },
    ];

    return (
        <div className="container max-w-7xl mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">I Miei Pagamenti</h1>
                <p className="text-muted-foreground">Riepilogo situazione contabile e scadenze</p>
            </div>

            <WalletDashboardView
                balance={personalBalance}
                lastUpdate={project.updated}
                invoices={invoices}
                transactions={transactions}
                roleLabel="Il Mio Wallet"
                walletStatus={walletStatus}
            />
        </div>
    );
}
