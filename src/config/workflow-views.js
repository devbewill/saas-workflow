/**
 * Workflow View Configuration
 * Maps workflow states to their corresponding view components and UI configuration
 */
import { lazy } from 'react';

// Lazy load view components for better performance
const StandardView = lazy(() => import('@/features/projects/views/StandardView'));
const DocumentsView = lazy(() => import('@/features/projects/views/DocumentsView'));
const AMLVerificationView = lazy(() => import('@/components/AMLVerificationView'));
const CreditCheckView = lazy(() => import('@/features/projects/views/CreditCheckView'));
const ApprovalView = lazy(() => import('@/features/projects/views/ApprovalView'));
const ContractView = lazy(() => import('@/features/projects/views/ContractView'));
const FascicoliView = lazy(() => import('@/components/FascicoliView'));

/**
 * View configuration for each workflow state
 *
 * @property {React.LazyExoticComponent} component - The main view component to render
 * @property {string[]} availableTabs - Which tabs to show in the project detail
 * @property {string} defaultTab - The default active tab
 * @property {boolean} showAssistant - Whether to show the operator assistant panel
 * @property {string|null} assistantConfigKey - Key to load specific assistant configuration
 * @property {boolean} showTimeline - Whether to show the workflow timeline
 * @property {string} primaryAction - Label for the main CTA button
 */
export const WORKFLOW_VIEW_CONFIG = {
    // ==================== BOZZA ====================
    "Bozza": {
        component: StandardView,
        availableTabs: ['info', 'documenti', 'pagamenti', 'fascicoli', 'team'],
        defaultTab: 'info',
        showAssistant: true,
        assistantConfigKey: 'draft',
        showTimeline: true,
        primaryAction: 'Apri Progetto',
    },

    // ==================== APERTA ====================
    "Aperta – Verifica preliminare": {
        component: StandardView,
        availableTabs: ['info', 'documenti', 'pagamenti', 'fascicoli', 'team'],
        defaultTab: 'info',
        showAssistant: true,
        assistantConfigKey: 'preliminary_check',
        showTimeline: true,
        primaryAction: 'Conferma Verifica',
    },

    "Aperta - Validazione documenti": {
        component: DocumentsView,
        availableTabs: ['documenti', 'fascicoli', 'pagamenti', 'info', 'team'],
        defaultTab: 'documenti',
        showAssistant: true,
        assistantConfigKey: 'document_validation',
        showTimeline: true,
        primaryAction: 'Completa Validazione',
    },

    // ==================== CARICATA ====================
    "Caricata - Lavorazione AML e Banche Dati": {
        component: AMLVerificationView,
        availableTabs: ['aml', 'documenti', 'fascicoli', 'info', 'team'],
        defaultTab: 'aml',
        showAssistant: true,
        assistantConfigKey: 'aml_check',
        showTimeline: true,
        primaryAction: 'Conferma Esito AML',
    },

    "Caricata - Valutazione istruttoria": {
        component: StandardView,
        availableTabs: ['documenti', 'fascicoli', 'info', 'team'],
        defaultTab: 'documenti',
        showAssistant: true,
        assistantConfigKey: 'evaluation',
        showTimeline: true,
        primaryAction: 'Invia a Valutazione',
    },

    "Caricata - Valutazione rating condominio": {
        component: StandardView,
        availableTabs: ['documenti', 'fascicoli', 'info', 'team'],
        defaultTab: 'documenti',
        showAssistant: false,
        assistantConfigKey: null,
        showTimeline: true,
        primaryAction: null, // Automatic step
    },

    "Caricata - Valutazione crediti": {
        component: CreditCheckView,
        availableTabs: ['crediti', 'finanziario', 'documenti'],
        defaultTab: 'crediti',
        showAssistant: true,
        assistantConfigKey: 'credit_check',
        showTimeline: true,
        primaryAction: 'Approva Credito',
    },

    // ==================== ESAME ====================
    "Esame - Valutazione organo deliberante": {
        component: ApprovalView,
        availableTabs: ['delibera', 'finanziario', 'documenti'],
        defaultTab: 'delibera',
        showAssistant: true,
        assistantConfigKey: 'deliberation',
        showTimeline: true,
        primaryAction: 'Delibera Approvazione',
    },

    // ==================== APPROVATA ====================
    "Approvata - Delibera OK": {
        component: StandardView,
        availableTabs: ['info', 'documenti', 'finanziario'],
        defaultTab: 'info',
        showAssistant: false,
        assistantConfigKey: null,
        showTimeline: true,
        primaryAction: 'Avvia Lavori',
    },

    "In attesa - Esecuzione lavori in corso": {
        component: StandardView,
        availableTabs: ['lavori', 'documenti', 'info'],
        defaultTab: 'lavori',
        showAssistant: false,
        assistantConfigKey: null,
        showTimeline: true,
        primaryAction: 'Segnala Fine Lavori',
    },

    "Approvata – Valutazione post fine lavori": {
        component: StandardView,
        availableTabs: ['lavori', 'documenti', 'finanziario'],
        defaultTab: 'lavori',
        showAssistant: true,
        assistantConfigKey: 'post_works',
        showTimeline: true,
        primaryAction: 'Conferma Valutazione',
    },

    "Approvata – Pronta per stampa contratto": {
        component: ContractView,
        availableTabs: ['contratto', 'documenti', 'info'],
        defaultTab: 'contratto',
        showAssistant: true,
        assistantConfigKey: 'contract_print',
        showTimeline: true,
        primaryAction: 'Stampa Contratto',
    },

    "Approvata – Inviato contratto in firma": {
        component: ContractView,
        availableTabs: ['contratto', 'documenti'],
        defaultTab: 'contratto',
        showAssistant: false,
        assistantConfigKey: null,
        showTimeline: true,
        primaryAction: null, // Waiting for external signature
    },

    "Approvata – Contratto firmato": {
        component: ContractView,
        availableTabs: ['contratto', 'documenti', 'finanziario'],
        defaultTab: 'contratto',
        showAssistant: true,
        assistantConfigKey: 'contract_signed',
        showTimeline: true,
        primaryAction: 'Procedi a Perfezionamento',
    },

    // ==================== PERFEZIONATA ====================
    "Perfezionata – Da liquidare": {
        component: StandardView,
        availableTabs: ['finanziario', 'documenti', 'info'],
        defaultTab: 'finanziario',
        showAssistant: true,
        assistantConfigKey: 'liquidation',
        showTimeline: true,
        primaryAction: 'Liquida',
    },

    "Perfezionata – Liquidata": {
        component: StandardView,
        availableTabs: ['finanziario', 'documenti', 'info', 'storico'],
        defaultTab: 'finanziario',
        showAssistant: false,
        assistantConfigKey: null,
        showTimeline: true,
        primaryAction: null, // Final state
        isFinal: true,
    },

    // ==================== HD BRK SPECIFIC ====================
    "Validazione Doc Preliminari": {
        component: DocumentsView,
        availableTabs: ['documenti', 'info', 'fascicoli', 'team'],
        defaultTab: 'documenti',
        showAssistant: true,
        assistantConfigKey: 'document_validation',
        showTimeline: true,
        primaryAction: 'Conferma Documenti',
    },
    "Attesa Antiriciclaggio": {
        component: AMLVerificationView,
        availableTabs: ['aml', 'documenti', 'info', 'team'],
        defaultTab: 'aml',
        showAssistant: true,
        assistantConfigKey: 'aml_check',
        showTimeline: true,
        primaryAction: 'Verifica AML',
    },
    "Antiriciclaggio Completato": {
        component: AMLVerificationView,
        availableTabs: ['aml', 'documenti', 'info', 'team'],
        defaultTab: 'aml',
        showAssistant: false,
        assistantConfigKey: null,
        showTimeline: true,
        primaryAction: 'Procedi a Valutazione',
    },
    "In attesa valutazione": {
        component: StandardView,
        availableTabs: ['info', 'documenti', 'fascicoli', 'team'],
        defaultTab: 'info',
        showAssistant: true,
        assistantConfigKey: 'evaluation',
        showTimeline: true,
        primaryAction: 'Completa Rating',
    },
    "Rating completato": {
        component: StandardView,
        availableTabs: ['info', 'documenti', 'fascicoli', 'team'],
        defaultTab: 'info',
        showAssistant: false,
        assistantConfigKey: null,
        showTimeline: true,
        primaryAction: 'Presenta in Banca',
    },
    "Presentazione in Banca": {
        component: StandardView,
        availableTabs: ['info', 'documenti', 'team'],
        defaultTab: 'info',
        showAssistant: true,
        assistantConfigKey: 'delegation',
        showTimeline: true,
        primaryAction: 'Carica Esito Banca',
    },
    "Presentata in Banca": {
        component: StandardView,
        availableTabs: ['info', 'documenti', 'team'],
        defaultTab: 'info',
        showAssistant: false,
        assistantConfigKey: null,
        showTimeline: true,
        primaryAction: 'Attendi Delibera',
    },
    "Finanziamento Approvato": {
        component: ApprovalView,
        availableTabs: ['delibera', 'documenti', 'info'],
        defaultTab: 'delibera',
        showAssistant: true,
        assistantConfigKey: null,
        showTimeline: true,
        primaryAction: 'Procedi a Erogazione',
    },
    "Finanziamento Erogato": {
        component: StandardView,
        availableTabs: ['info', 'documenti', 'finanziario', 'storico'],
        defaultTab: 'finanziario',
        showAssistant: false,
        assistantConfigKey: null,
        showTimeline: true,
        isFinal: true,
    },
};

/**
 * Default configuration for unknown/unmapped states
 */
export const DEFAULT_VIEW_CONFIG = {
    component: StandardView,
    availableTabs: ['info', 'documenti', 'pagamenti', 'team'],
    defaultTab: 'info',
    showAssistant: false,
    assistantConfigKey: null,
    showTimeline: true,
    primaryAction: null,
};

/**
 * Get view configuration for a given workflow state
 * @param {string} statusName - The full workflow status name
 * @returns {object} View configuration object
 */
export function getViewConfig(statusName) {
    return WORKFLOW_VIEW_CONFIG[statusName] || DEFAULT_VIEW_CONFIG;
}

/**
 * Tab label translations (Italian)
 */
export const TAB_LABELS = {
    info: 'Dati Progetto',
    documenti: 'Documenti',
    team: 'Team',
    aml: 'Verifica AML',
    finanziario: 'Dati Finanziari',
    crediti: 'Valutazione Crediti',
    delibera: 'Delibera',
    lavori: 'Stato Lavori',
    contratto: 'Contratto',
    storico: 'Storico',
    fascicoli: 'Fascicoli',
    pagamenti: 'Pagamenti',
};
