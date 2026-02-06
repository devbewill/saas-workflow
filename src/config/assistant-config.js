/**
 * Operator Assistant Configuration
 * Defines checklists, warnings, and guidance for each workflow state
 */

export const ASSISTANT_CONFIG = {
    draft: {
        title: "Creazione Progetto",
        description: "Inserisci i dati preliminari del progetto e verifica che tutte le informazioni di base siano corrette.",
        requirements: [
            { id: 'dati', label: 'Dati anagrafici completi', checked: true },
            { id: 'importo', label: 'Importo finanziamento inserito', checked: true },
        ],
        warning: null,
        proceedLabel: 'Apri il progetto',
    },

    preliminary_check: {
        title: "Verifica Preliminare",
        description: "Controlla i dati inseriti e verifica la completezza delle informazioni prima di procedere.",
        requirements: [
            { id: 'anagrafica', label: 'Anagrafica condominio verificata', checked: false },
            { id: 'admin', label: 'Dati amministratore confermati', checked: false },
            { id: 'importo', label: 'Importo coerente con delibera', checked: false },
        ],
        warning: {
            type: 'info',
            title: 'NOTA',
            message: 'Verifica che il codice fiscale del condominio sia corretto prima di procedere.',
        },
        proceedLabel: 'Conferma verifica preliminare',
    },

    document_validation: {
        title: "Verifica Documentale",
        description: "Analizza attentamente tutti i documenti caricati e procedi con la validazione.",
        requirements: [
            { id: 'privacy', label: 'Validità documenti privacy', checked: true },
            { id: 'verbali', label: 'Coerenza date verbali', checked: false },
            { id: 'firme', label: 'Firme presenti e leggibili', checked: false },
        ],
        warning: {
            type: 'info',
            title: 'PROMEMORIA',
            message: 'Ricorda che il documento di identità deve essere in corso di validità.',
        },
        proceedLabel: 'Ho verificato i documenti',
    },

    aml_check: {
        title: "Controllo AML e Banche Dati",
        description: "Esegui le verifiche AML (Anti-Money Laundering) e controlla le banche dati per valutare il profilo di rischio.",
        requirements: [
            { id: 'hawk', label: 'Documento HAWK caricato', checked: false },
            { id: 'db', label: 'Esito banche dati caricato', checked: true },
            { id: 'aml', label: 'Esito AML selezionato', checked: true },
        ],
        warning: {
            type: 'warning',
            title: 'ATTENZIONE',
            message: 'In caso di esito "Arancione - Forzante" è necessaria una verifica rafforzata prima di procedere.',
        },
        proceedLabel: 'Controlli completati',
    },

    evaluation: {
        title: "Valutazione Istruttoria",
        description: "Verifica tutti i dati raccolti e prepara la pratica per la valutazione crediti.",
        requirements: [
            { id: 'docs_complete', label: 'Documentazione completa', checked: false },
            { id: 'aml_ok', label: 'Esito AML positivo', checked: false },
            { id: 'financial_check', label: 'Dati finanziari verificati', checked: false },
        ],
        warning: null,
        proceedLabel: 'Invia a valutazione crediti',
    },

    credit_check: {
        title: "Valutazione Crediti",
        description: "Analizza il merito creditizio del condominio e dei soggetti coinvolti.",
        requirements: [
            { id: 'rating', label: 'Rating condominio calcolato', checked: false },
            { id: 'delibera_check', label: 'Delibera assembleare conforme', checked: false },
            { id: 'garanzie', label: 'Garanzie verificate', checked: false },
        ],
        warning: {
            type: 'info',
            title: 'NOTA',
            message: 'Verifica la presenza di garanzie MCC se applicabili.',
        },
        proceedLabel: 'Approva credito',
    },

    deliberation: {
        title: "Delibera Organo Deliberante",
        description: "Il progetto è in attesa di approvazione dall\'organo deliberante.",
        requirements: [
            { id: 'docs_reviewed', label: 'Documentazione revisionata', checked: true },
            { id: 'credit_ok', label: 'Valutazione crediti positiva', checked: true },
        ],
        warning: null,
        proceedLabel: 'Registra delibera approvazione',
    },

    post_works: {
        title: "Valutazione Post Fine Lavori",
        description: "Verifica la documentazione di fine lavori e la conformità con quanto previsto.",
        requirements: [
            { id: 'sal', label: 'SAL finale verificato', checked: false },
            { id: 'ape', label: 'APE post lavori caricato', checked: false },
            { id: 'collaudo', label: 'Collaudo effettuato', checked: false },
        ],
        warning: {
            type: 'warning',
            title: 'IMPORTANTE',
            message: 'Verificare che i lavori siano conformi al capitolato approvato.',
        },
        proceedLabel: 'Conferma fine lavori',
    },

    contract_print: {
        title: "Preparazione Contratto",
        description: "Prepara e stampa il contratto di finanziamento.",
        requirements: [
            { id: 'dati_ok', label: 'Dati contrattuali verificati', checked: false },
            { id: 'importo_finale', label: 'Importo finale confermato', checked: false },
        ],
        warning: null,
        proceedLabel: 'Stampa contratto',
    },

    contract_signed: {
        title: "Contratto Firmato",
        description: "Il contratto è stato firmato. Procedi con il perfezionamento.",
        requirements: [
            { id: 'firma_verificata', label: 'Firma digitale verificata', checked: true },
            { id: 'contratto_archiviato', label: 'Contratto archiviato', checked: false },
        ],
        warning: null,
        proceedLabel: 'Perfeziona progetto',
    },

    liquidation: {
        title: "Liquidazione",
        description: "Procedi con la liquidazione del finanziamento.",
        requirements: [
            { id: 'iban_verificato', label: 'IBAN condominio verificato', checked: true },
            { id: 'importo_confermato', label: 'Importo da liquidare confermato', checked: false },
        ],
        warning: {
            type: 'warning',
            title: 'ATTENZIONE',
            message: 'Verificare che l\'IBAN corrisponda a quello indicato nella delibera.',
        },
        proceedLabel: 'Conferma liquidazione',
    },
};

/**
 * Get assistant configuration for a given key
 * @param {string} configKey - The assistant configuration key
 * @returns {object|null} Assistant configuration object or null
 */
export function getAssistantConfig(configKey) {
    return ASSISTANT_CONFIG[configKey] || null;
}
