/**
 * workflow-views.js
 * Maps workflow states to their view configuration.
 * Determines which tabs, views, and assistant configs are available for each state.
 */

export const WORKFLOW_VIEW_CONFIG = {
    'Bozza': {
        availableTabs: ['info', 'documenti', 'pagamenti', 'fascicoli', 'team'],
        defaultTab: 'info',
        showAssistant: true,
        assistantConfigKey: 'draft',
        primaryAction: 'Apri Progetto',
    },
    'Aperta – Verifica preliminare': {
        availableTabs: ['info', 'documenti', 'pagamenti', 'fascicoli', 'team'],
        defaultTab: 'info',
        showAssistant: true,
        assistantConfigKey: 'preliminary_check',
        primaryAction: 'Conferma Verifica',
    },
    'Aperta - Validazione documenti': {
        availableTabs: ['documenti', 'fascicoli', 'pagamenti', 'info', 'team'],
        defaultTab: 'documenti',
        showAssistant: true,
        assistantConfigKey: 'document_validation',
        primaryAction: 'Completa Validazione',
    },
    'Caricata - Lavorazione AML e Banche Dati': {
        availableTabs: ['aml', 'documenti', 'fascicoli', 'info', 'team'],
        defaultTab: 'aml',
        showAssistant: true,
        assistantConfigKey: 'aml_check',
        primaryAction: 'Conferma Esito AML',
    },
    'Caricata - Valutazione istruttoria': {
        availableTabs: ['documenti', 'fascicoli', 'info', 'team'],
        defaultTab: 'documenti',
        showAssistant: true,
        assistantConfigKey: 'evaluation',
        primaryAction: 'Invia a Valutazione',
    },
    'Caricata - Valutazione rating condominio': {
        availableTabs: ['documenti', 'fascicoli', 'info', 'team'],
        defaultTab: 'documenti',
        showAssistant: false,
        assistantConfigKey: null,
        primaryAction: null,
    },
    'Caricata - Valutazione crediti': {
        availableTabs: ['crediti', 'finanziario', 'documenti'],
        defaultTab: 'crediti',
        showAssistant: true,
        assistantConfigKey: 'credit_check',
        primaryAction: 'Approva Credito',
    },
    'Esame - Valutazione organo deliberante': {
        availableTabs: ['delibera', 'finanziario', 'documenti'],
        defaultTab: 'delibera',
        showAssistant: true,
        assistantConfigKey: 'deliberation',
        primaryAction: 'Delibera Approvazione',
    },
    'Approvata - Delibera OK': {
        availableTabs: ['info', 'documenti', 'finanziario'],
        defaultTab: 'info',
        showAssistant: false,
        assistantConfigKey: null,
        primaryAction: 'Avvia Lavori',
    },
    'In attesa - Esecuzione lavori in corso': {
        availableTabs: ['lavori', 'documenti', 'info'],
        defaultTab: 'lavori',
        showAssistant: false,
        assistantConfigKey: null,
        primaryAction: 'Segnala Fine Lavori',
    },
    'Approvata – Valutazione post fine lavori': {
        availableTabs: ['lavori', 'documenti', 'finanziario'],
        defaultTab: 'lavori',
        showAssistant: true,
        assistantConfigKey: 'post_works',
        primaryAction: 'Conferma Valutazione',
    },
    'Approvata – Pronta per stampa contratto': {
        availableTabs: ['contratto', 'documenti', 'info'],
        defaultTab: 'contratto',
        showAssistant: true,
        assistantConfigKey: 'contract_print',
        primaryAction: 'Stampa Contratto',
    },
    'Approvata – Inviato contratto in firma': {
        availableTabs: ['contratto', 'documenti'],
        defaultTab: 'contratto',
        showAssistant: false,
        assistantConfigKey: null,
        primaryAction: null,
    },
    'Approvata – Contratto firmato': {
        availableTabs: ['contratto', 'documenti', 'finanziario'],
        defaultTab: 'contratto',
        showAssistant: true,
        assistantConfigKey: 'contract_signed',
        primaryAction: 'Procedi a Perfezionamento',
    },
    'Perfezionata – Da liquidare': {
        availableTabs: ['finanziario', 'documenti', 'info'],
        defaultTab: 'finanziario',
        showAssistant: true,
        assistantConfigKey: 'liquidation',
        primaryAction: 'Liquida',
    },
    'Perfezionata – Liquidata': {
        availableTabs: ['finanziario', 'documenti', 'info', 'storico'],
        defaultTab: 'finanziario',
        showAssistant: false,
        assistantConfigKey: null,
        primaryAction: null,
        isFinal: true,
    },
    // HD BRK specific states
    'Validazione Doc Preliminari': {
        availableTabs: ['documenti', 'info', 'fascicoli', 'team'],
        defaultTab: 'documenti',
        showAssistant: true,
        assistantConfigKey: 'document_validation',
        primaryAction: 'Conferma Documenti',
    },
    'Attesa Antiriciclaggio': {
        availableTabs: ['aml', 'documenti', 'info', 'team'],
        defaultTab: 'aml',
        showAssistant: true,
        assistantConfigKey: 'aml_check',
        primaryAction: 'Verifica AML',
    },
    'Antiriciclaggio Completato': {
        availableTabs: ['aml', 'documenti', 'info', 'team'],
        defaultTab: 'aml',
        showAssistant: false,
        assistantConfigKey: null,
        primaryAction: 'Procedi a Valutazione',
    },
    'In attesa valutazione': {
        availableTabs: ['info', 'documenti', 'fascicoli', 'team'],
        defaultTab: 'info',
        showAssistant: true,
        assistantConfigKey: 'evaluation',
        primaryAction: 'Completa Rating',
    },
    'Rating completato': {
        availableTabs: ['info', 'documenti', 'fascicoli', 'team'],
        defaultTab: 'info',
        showAssistant: false,
        assistantConfigKey: null,
        primaryAction: 'Presenta in Banca',
    },
    'Presentazione in Banca': {
        availableTabs: ['info', 'documenti', 'team'],
        defaultTab: 'info',
        showAssistant: true,
        assistantConfigKey: 'delegation',
        primaryAction: 'Carica Esito Banca',
    },
    'Presentata in Banca': {
        availableTabs: ['info', 'documenti', 'team'],
        defaultTab: 'info',
        showAssistant: false,
        assistantConfigKey: null,
        primaryAction: 'Attendi Delibera',
    },
    'Finanziamento Approvato': {
        availableTabs: ['delibera', 'documenti', 'info'],
        defaultTab: 'delibera',
        showAssistant: true,
        assistantConfigKey: null,
        primaryAction: 'Procedi a Erogazione',
    },
    'Finanziamento Erogato': {
        availableTabs: ['info', 'documenti', 'finanziario', 'storico'],
        defaultTab: 'finanziario',
        showAssistant: false,
        assistantConfigKey: null,
        isFinal: true,
    },
};

const DEFAULT_VIEW_CONFIG = {
    availableTabs: ['info', 'documenti', 'pagamenti', 'team'],
    defaultTab: 'info',
    showAssistant: false,
    assistantConfigKey: null,
    primaryAction: null,
};

export function getViewConfig(statusName) {
    return WORKFLOW_VIEW_CONFIG[statusName] || DEFAULT_VIEW_CONFIG;
}

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
