/**
 * assistant-steps.js
 * Configuration for the operator assistant checklist at each workflow step.
 * title       = nome dello stato della pratica
 * description = azione richiesta per avanzare al passo successivo
 * requirements = acceptance criteria da soddisfare
 */

export const ASSISTANT_STEPS = {
  draft: {
    title: "Bozza",
    description:
      "Quando un operatore sull'app YCB seleziona il prodotto finanziario CEFIN, il sistema crea automaticamente un nuovo progetto CEFIN ereditando tutti i documenti e i dati relativi al condominio.",
    requirements: [
      {
        id: "progetto_creato",
        label: "Nuovo progetto presente con tutti i dati necessari importati",
        checked: false,
      },
      {
        id: "assegnazione",
        label: "Progetto assegnato al supervisor",
        checked: false,
      },
      {
        id: "collegamento",
        label:
          "Collegamento con pratica broker e condominio di provenienza esposto",
        checked: false,
      },
    ],
    warning: null,
    proceedLabel: "Apri il progetto",
  },

  preliminary_check: {
    title: "Aperta – Verifica preliminare",
    description: "Verifica formale della documentazione e dei dati ricevuti.",
    requirements: [
      {
        id: "checklist_docs",
        label: "Tutti i documenti richiesti dalla checklist sono presenti",
        checked: false,
      },
      {
        id: "dati_condominio",
        label: "Tutti i dati del condominio sono stati importati",
        checked: false,
      },
      {
        id: "dati_prodotto",
        label: "Tutti i dati del prodotto finanziario sono stati importati",
        checked: false,
      },
    ],
    warning: {
      type: "info",
      title: "PROMEMORIA",
      message: "text",
    },
    proceedLabel: "Conferma verifica preliminare",
  },

  document_validation: {
    title: "Caricata - Validazione documenti",
    description: "Verifica approfondita dati e documenti.",
    requirements: [
      {
        id: "contenuto_docs",
        label: "Verificato il contenuto dei documenti",
        checked: false,
      },
      {
        id: "dati_condominio",
        label: "Verificata l'adeguatezza dei dati del condominio",
        checked: false,
      },
      {
        id: "dati_prodotto",
        label: "Verificata l'adeguatezza dei dati del prodotto finanziario",
        checked: false,
      },
    ],
    warning: {
      type: "info",
      title: "PROMEMORIA",
      message: "text",
    },
    proceedLabel: "Completa validazione",
  },

  aml_check: {
    title: "Caricata - Lavorazione AML e Banche Dati",
    description:
      "Esecuzione delle verifiche di compliance (AML) e merito creditizio (Banche Dati). L'avanzamento dipende dall'esito positivo di entrambe.",
    requirements: [
      { id: "report_aml", label: "Report AML caricato", checked: false },
      { id: "report_bd", label: "Report Banche Dati caricato", checked: false },
      {
        id: "form_compilati",
        label:
          "Compilazione dei form relativi ai due flussi da eseguire online",
        checked: false,
      },
    ],
    warning: {
      type: "warning",
      title: "ATTENZIONE",
      message:
        'In caso di esito "Arancione - Forzante" è necessaria una verifica rafforzata prima di procedere.',
    },
    proceedLabel: "Controlli AML completati",
  },

  evaluation: {
    title: "Caricata - Valutazioni finali istruttoria",
    description:
      "Dopo aver raccolto gli esiti AML e Banche Dati, il Middle Office scrive una relazione istruttoria (template: scoring e relazione di istruttoria) e indica se l'esito è OK o KO. Se OK si passa alla fase successiva.",
    requirements: [
      {
        id: "template_scoring",
        label: 'Compilato il template "scoring e relazione istruttoria"',
        checked: false,
      },
      {
        id: "rating_condominio",
        label: "Eseguito rating condominio",
        checked: false,
      },
    ],
    warning: null,
    proceedLabel: "Invia a valutazione Crediti",
  },

  credit_check: {
    title: "Caricata - Pronta per valutazione Crediti",
    description:
      "L'Ufficio Crediti legge la relazione istruttoria e fornisce l'ok o il ko con le relative giustificazioni, allegando eventuali documenti. Ad oggi questo processo avviene tramite email. Se KO, la pratica torna al Middle Office.",
    requirements: [
      {
        id: "lettura_relazione",
        label: "UC legge la relazione istruttoria",
        checked: false,
      },
      { id: "note_uc", label: "Integra con eventuali note", checked: false },
      { id: "esito_uc", label: "Dice se ok o ko", checked: false },
    ],
    warning: {
      type: "info",
      title: "NOTA",
      message:
        "In caso di KO la pratica viene restituita al Middle Office per le opportune integrazioni.",
    },
    proceedLabel: "Conferma esito UC",
  },

  deliberation: {
    title: "Esame - Inviata a organo deliberante",
    description:
      "L'Organo Deliberante esamina la relazione istruttoria. Se KO, rimbalza su Ufficio Crediti.",
    requirements: [
      {
        id: "lettura_od",
        label: "OD legge la relazione istruttoria",
        checked: false,
      },
      { id: "note_od", label: "Integra con eventuali note", checked: false },
      { id: "esito_od", label: "Dice se ok o ko", checked: false },
    ],
    warning: null,
    proceedLabel: "Registra delibera",
  },

  delibera_ok: {
    title: "Approvata - Delibera OK",
    description:
      "Viene comunicato all'amministratore e al mediatore l'esito positivo della delibera.",
    requirements: [
      {
        id: "notifica_admin",
        label: "Notificato l'amministratore dell'esito della Delibera",
        checked: false,
      },
      {
        id: "notifica_broker",
        label: "Notificato il mediatore Broker dell'esito della Delibera",
        checked: false,
      },
    ],
    warning: null,
    proceedLabel: "Avvia esecuzione lavori",
  },

  works_in_progress: {
    title: "In attesa - Esecuzione lavori in corso",
    description:
      "Devono essere caricati i documenti necessari per la verifica durante l'esecuzione dei lavori (TBD).",
    requirements: [
      {
        id: "documenti_lavori",
        label:
          "5 documenti caricati per verifica (fatture, dichiarazioni) (TBD)",
        checked: false,
      },
    ],
    warning: {
      type: "info",
      title: "IN DEFINIZIONE",
      message:
        "La lista completa dei documenti da caricare è in corso di definizione.",
    },
    proceedLabel: "Segnala fine lavori",
  },

  post_works: {
    title: "Approvata – Valutazione post fine lavori",
    description:
      "Ricezione documenti di fine lavori e ri-avvio delle verifiche AML e Banche Dati.",
    requirements: [
      {
        id: "docs_fine_lavori",
        label: "Caricamento documenti di fine lavori",
        checked: false,
      },
      {
        id: "verifica_3mesi",
        label: "Se >= 3 mesi: AML, Banche Dati e delibera da rifare",
        checked: false,
      },
      {
        id: "verifica_snella",
        label:
          "Se < 3 mesi: controlli semplificati eseguiti (cambio admin, importi, etc.)",
        checked: false,
      },
    ],
    warning: {
      type: "warning",
      title: "IMPORTANTE",
      message:
        "Verificare la data di approvazione per determinare il percorso di verifica (>=3 mesi: iter completo; <3 mesi: iter semplificato).",
    },
    proceedLabel: "Conferma fine lavori",
  },

  contract_print: {
    title: "Approvata – Pronta per stampa contratto",
    description:
      "Va compilato il contratto per l'invio in firma all'amministratore (template).",
    requirements: [
      {
        id: "template_compilato",
        label:
          "Template contratto compilato e pronto per l'invio in firma all'amministratore",
        checked: false,
      },
    ],
    warning: null,
    proceedLabel: "Invia contratto in firma",
  },

  contract_sent: {
    title: "Approvata – Inviato contratto in firma",
    description:
      "Il contratto viene generato e inviato al cliente per la firma digitale.",
    requirements: [
      {
        id: "contratto_inviato",
        label:
          "Contratto inviato in firma con verifica del timing per la firma entro i limiti",
        checked: false,
      },
      {
        id: "notifica_bo",
        label:
          "BO notificato alla ricezione della firma per operazioni su OCS entro i tempi stabiliti (rischio variazione tassi)",
        checked: false,
      },
    ],
    warning: {
      type: "warning",
      title: "ATTENZIONE TIMING",
      message:
        "Una volta che il cliente ha firmato, il BO deve eseguire le operazioni su OCS entro il timing stabilito per evitare variazioni di tasso.",
    },
    proceedLabel: "Contratto inviato",
  },

  contract_signed: {
    title: "Approvata – Contratto firmato",
    description:
      "Il sistema riceve il contratto firmato digitalmente dal cliente.",
    requirements: [
      {
        id: "firma_verificata",
        label: "Firma digitale verificata",
        checked: false,
      },
      {
        id: "contratto_archiviato",
        label: "Contratto firmato archiviato in piattaforma",
        checked: false,
      },
    ],
    warning: null,
    proceedLabel: "Procedi a perfezionamento",
  },

  liquidation: {
    title: "Perfezionata – Da liquidare",
    description:
      "Lo stato viene aggiornato sul sistema master (OCS) per preparare l'erogazione.",
    requirements: [
      {
        id: "ocs_aggiornato",
        label: "Stato aggiornato su OCS",
        checked: false,
      },
      {
        id: "iban_verificato",
        label: "IBAN condominio verificato",
        checked: false,
      },
      {
        id: "importo_confermato",
        label: "Importo da liquidare confermato",
        checked: false,
      },
    ],
    warning: {
      type: "warning",
      title: "ATTENZIONE",
      message:
        "Verificare che l'IBAN corrisponda a quello indicato nella delibera.",
    },
    proceedLabel: "Conferma liquidazione",
  },

  liquidated: {
    title: "Perfezionata – Liquidata",
    description:
      "Erogazione del bonifico e caricamento della contabile in piattaforma. La pratica è finanziata.",
    requirements: [
      { id: "bonifico_eseguito", label: "Bonifico erogato", checked: false },
      {
        id: "contabile_caricata",
        label: "Contabile caricata in piattaforma",
        checked: false,
      },
    ],
    warning: null,
    proceedLabel: null,
  },

  ceduta: {
    title: "Ceduta - Cessione completata",
    description:
      'La pratica, dopo essere stata inclusa in un "Lotto di Cessione", viene aggiornata a questo stato finale al completamento del processo di cessione del lotto.',
    requirements: [
      {
        id: "lotto_cessione",
        label: "Pratica inclusa nel lotto di cessione",
        checked: false,
      },
      {
        id: "cessione_completata",
        label: "Processo di cessione del lotto completato",
        checked: false,
      },
    ],
    warning: null,
    proceedLabel: null,
  },
};

export function getAssistantConfig(configKey) {
  return ASSISTANT_STEPS[configKey] || null;
}
