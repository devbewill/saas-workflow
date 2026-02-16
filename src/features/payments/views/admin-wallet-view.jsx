import React from 'react';
import WalletDashboardView from './wallet-dashboard-view';
import { PAYMENT_PROJECTS, WALLET_STATUS } from '@/data/payments';

export default function AdminWalletView() {
    // Mock: Get aggregation for Admin global view
    // In a real app, this would be an aggregation of all managed condos
    // For now, we show the "Global Admin Wallet" status

    const totalBalance = 45000.00; // Mock global balance
    const lastUpdate = new Date().toLocaleDateString('it-IT');
    const adminWalletStatus = WALLET_STATUS.ACTIVE;

    // Aggregate invoices for admin across projects (mock)
    const allAdminInvoices = PAYMENT_PROJECTS.flatMap(p =>
        p.invoiceDetails.filter(i => i.to === 'amministratore')
    ).slice(0, 5); // Just take recent 5

    const transactions = [
        { id: 'tr1', type: 'topup', amount: 5000, date: '12/02/2026' },
        { id: 'tr2', type: 'payment', amount: 1500, date: '10/02/2026' },
        { id: 'tr3', type: 'payment', amount: 850, date: '05/02/2026' },
        { id: 'tr4', type: 'topup', amount: 10000, date: '01/02/2026' },
    ];

    return (
        <div className="container max-w-7xl mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Wallet Amministrazione</h1>
                <p className="text-muted-foreground">Panoramica globale fondi e movimenti</p>
            </div>

            <WalletDashboardView
                balance={totalBalance}
                lastUpdate={lastUpdate}
                invoices={allAdminInvoices}
                transactions={transactions}
                roleLabel="Amministrazione Globale"
                walletStatus={adminWalletStatus}
            />
        </div>
    );
}
