import React, { lazy, Suspense, useMemo } from 'react';
import { useAppContext } from '@/context/app-context';
import { ROLE_POLICIES } from '@/config/roles';

// Lazy-load role-specific views
const GestoreView = lazy(() => import('../views/gestore-view'));
const AdminWalletView = lazy(() => import('../views/admin-wallet-view'));
const TechMonitorView = lazy(() => import('../views/tech-monitor-view'));

const VIEW_MAP = {
    GLOBAL_MONITORING: GestoreView,
    WALLET_DASHBOARD: AdminWalletView,
    SYSTEM_HEALTH: TechMonitorView,
};

export default function PaymentsPage() {
    const { user } = useAppContext();
    const policy = ROLE_POLICIES[user.role];
    const viewKey = policy?.payments?.view;
    const ViewComponent = VIEW_MAP[viewKey] || GestoreView;

    return (
        <Suspense fallback={<div className="py-8 text-center text-muted-foreground">Caricamento vista pagamenti...</div>}>
            <ViewComponent />
        </Suspense>
    );
}
