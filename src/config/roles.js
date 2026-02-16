/**
 * roles.js
 * Centralized RBAC configuration.
 * Defines roles, their policies, and the default user for simulation.
 */

export const ROLES = {
    GESTORE: 'gestore',
    AMMINISTRATORE: 'amministratore',
    IMPRESA: 'impresa',
    PROFESSIONISTA: 'professionista',
    CONDOMINO: 'condomino',
    TECH: 'tech',
};

export const ROLE_POLICIES = {
    [ROLES.GESTORE]: {
        label: 'Gestore (Backoffice)',
        payments: {
            view: 'GLOBAL_MONITORING',
            features: ['search_all', 'export_excel'],
        },
    },
    [ROLES.AMMINISTRATORE]: {
        label: 'Amministratore (Condominio)',
        payments: {
            view: 'WALLET_DASHBOARD',
            features: ['wallet_management', 'invoice_acceptance'],
        },
    },
    [ROLES.IMPRESA]: {
        label: 'Impresa Esecutrice',
        payments: {
            view: 'INVOICE_MANAGER',
            features: ['issue_invoice'],
        },
    },
    [ROLES.PROFESSIONISTA]: {
        label: 'Professionista (Direttore Lavori)',
        payments: {
            view: 'DOCUMENT_VERIFIER',
            features: ['verify_docs'],
        },
    },
    [ROLES.CONDOMINO]: {
        label: 'Condomino',
        payments: {
            view: 'PERSONAL_VIEW',
            features: ['view_status'],
        },
    },
    [ROLES.TECH]: {
        label: 'Tech Support (Developer)',
        payments: {
            view: 'SYSTEM_HEALTH',
            features: ['debug_logs', 'system_wide_access', 'log_viewer'],
        },
    },
};

export const MOCK_USER = {
    id: 'user-123',
    name: 'Stefano Perelli',
    email: 'stefano.perelli@blueprint.it',
    initials: 'SP',
    role: ROLES.GESTORE,
};
