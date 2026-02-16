export const WALLET_STATUS = {
    ACTIVE: 'attivo',
    TO_ACTIVATE: 'da_attivare',
    PENDING: 'in_attesa'
};

export const PAYMENT_PROJECTS = [
    {
        id: "PRJ-001",
        name: "Condominio Belvedere",
        owner: "Mario Rossi",
        updated: "10/02/2026",
        totalInvoices: 245000,
        wallets: {
            amministratore: WALLET_STATUS.ACTIVE,
            impresa: WALLET_STATUS.ACTIVE,
            condomino: [WALLET_STATUS.ACTIVE, WALLET_STATUS.PENDING, WALLET_STATUS.TO_ACTIVATE],
            professionista: WALLET_STATUS.TO_ACTIVATE
        },
        invoiceDetails: [
            { id: 'FT-001', from: 'impresa', to: 'amministratore', amount: 45000, status: 'pending', date: '05/02/2026' },
            { id: 'FT-002', from: 'impresa', to: 'condomino_0', amount: 35000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-003', from: 'impresa', to: 'condomino_1', amount: 35000, status: 'pending', date: '10/02/2026' },
            { id: 'FT-004', from: 'impresa', to: 'condomino_2', amount: 35000, status: 'pending', date: '10/02/2026' },
            { id: 'FT-005', from: 'professionista', to: 'impresa', amount: 15000, status: 'pending', date: '25/01/2026' },
            { id: 'FT-006', from: 'piattaforma', to: 'professionista', amount: 2500, status: 'pending', date: '12/02/2026' }
        ]
    },
    {
        id: "PRJ-002",
        name: "Residenza Solar",
        owner: "Elena Bianchi",
        updated: "12/02/2026",
        totalInvoices: 128000,
        wallets: {
            amministratore: WALLET_STATUS.ACTIVE,
            impresa: WALLET_STATUS.PENDING,
            condomino: [WALLET_STATUS.PENDING, WALLET_STATUS.PENDING],
            professionista: WALLET_STATUS.TO_ACTIVATE
        },
        invoiceDetails: [
            { id: 'FT-007', from: 'impresa', to: 'amministratore', amount: 28000, status: 'pending', date: '06/02/2026' },
            { id: 'FT-008', from: 'impresa', to: 'condomino_0', amount: 50000, status: 'pending', date: '08/02/2026' },
            { id: 'FT-009', from: 'impresa', to: 'condomino_1', amount: 50000, status: 'pending', date: '08/02/2026' },
            { id: 'FT-010', from: 'professionista', to: 'impresa', amount: 12000, status: 'pending', date: '09/02/2026' },
            { id: 'FT-011', from: 'piattaforma', to: 'professionista', amount: 1200, status: 'pending', date: '10/02/2026' }
        ]
    },
    {
        id: "PRJ-003",
        name: "Villa Flora",
        owner: "Giuseppe Verdi",
        updated: "08/02/2026",
        totalInvoices: 185000,
        wallets: {
            amministratore: WALLET_STATUS.ACTIVE,
            impresa: WALLET_STATUS.ACTIVE,
            condomino: [WALLET_STATUS.ACTIVE],
            professionista: WALLET_STATUS.ACTIVE
        },
        invoiceDetails: [
            { id: 'FT-012', from: 'impresa', to: 'amministratore', amount: 120000, status: 'paid', date: '15/01/2026' },
            { id: 'FT-013', from: 'impresa', to: 'amministratore', amount: 45000, status: 'pending', date: '08/02/2026' },
            { id: 'FT-014', from: 'impresa', to: 'condomino_0', amount: 45000, status: 'paid', date: '20/01/2026' },
            { id: 'FT-015', from: 'impresa', to: 'condomino_0', amount: 15000, status: 'pending', date: '08/02/2026' },
            { id: 'FT-016', from: 'professionista', to: 'impresa', amount: 20000, status: 'paid', date: '10/01/2026' },
            { id: 'FT-017', from: 'professionista', to: 'impresa', amount: 5000, status: 'pending', date: '08/02/2026' },
            { id: 'FT-018', from: 'piattaforma', to: 'professionista', amount: 800, status: 'pending', date: '08/02/2026' }
        ]
    },
    {
        id: "PRJ-004",
        name: "Palazzo Ducale",
        owner: "Laura Neri",
        updated: "14/02/2026",
        totalInvoices: 290000,
        wallets: {
            amministratore: WALLET_STATUS.PENDING,
            impresa: WALLET_STATUS.TO_ACTIVATE,
            condomino: [WALLET_STATUS.TO_ACTIVATE, WALLET_STATUS.TO_ACTIVATE, WALLET_STATUS.TO_ACTIVATE, WALLET_STATUS.TO_ACTIVATE],
            professionista: WALLET_STATUS.TO_ACTIVATE
        },
        invoiceDetails: [
            { id: 'FT-019', from: 'impresa', to: 'amministratore', amount: 90000, status: 'pending', date: '12/02/2026' },
            { id: 'FT-020', from: 'impresa', to: 'condomino_0', amount: 50000, status: 'pending', date: '12/02/2026' },
            { id: 'FT-021', from: 'impresa', to: 'condomino_1', amount: 50000, status: 'pending', date: '12/02/2026' },
            { id: 'FT-022', from: 'impresa', to: 'condomino_2', amount: 50000, status: 'pending', date: '12/02/2026' },
            { id: 'FT-023', from: 'impresa', to: 'condomino_3', amount: 50000, status: 'pending', date: '12/02/2026' },
            { id: 'FT-024', from: 'professionista', to: 'impresa', amount: 25000, status: 'pending', date: '12/02/2026' },
            { id: 'FT-025', from: 'piattaforma', to: 'professionista', amount: 3000, status: 'pending', date: '12/02/2026' }
        ]
    },
    {
        id: "PRJ-005",
        name: "Green Park Residence",
        owner: "Marco Gallo",
        updated: "11/02/2026",
        totalInvoices: 165000,
        wallets: {
            amministratore: WALLET_STATUS.ACTIVE,
            impresa: WALLET_STATUS.ACTIVE,
            condomino: [WALLET_STATUS.ACTIVE, WALLET_STATUS.ACTIVE, WALLET_STATUS.ACTIVE, WALLET_STATUS.PENDING],
            professionista: WALLET_STATUS.ACTIVE
        },
        invoiceDetails: [
            { id: 'FT-026', from: 'impresa', to: 'amministratore', amount: 45000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-027', from: 'impresa', to: 'amministratore', amount: 15000, status: 'pending', date: '11/02/2026' },
            { id: 'FT-028', from: 'impresa', to: 'condomino_0', amount: 25000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-029', from: 'impresa', to: 'condomino_1', amount: 25000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-030', from: 'impresa', to: 'condomino_2', amount: 25000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-031', from: 'impresa', to: 'condomino_3', amount: 25000, status: 'pending', date: '11/02/2026' },
            { id: 'FT-032', from: 'professionista', to: 'impresa', amount: 20000, status: 'paid', date: '20/01/2026' },
            { id: 'FT-033', from: 'professionista', to: 'impresa', amount: 8000, status: 'pending', date: '11/02/2026' },
            { id: 'FT-034', from: 'piattaforma', to: 'professionista', amount: 1500, status: 'pending', date: '11/02/2026' }
        ]
    },
    {
        id: "PRJ-006",
        name: "Torre Nord",
        owner: "Silvia Romano",
        updated: "13/02/2026",
        totalInvoices: 210000,
        wallets: {
            amministratore: WALLET_STATUS.TO_ACTIVATE,
            impresa: WALLET_STATUS.TO_ACTIVATE,
            condomino: [WALLET_STATUS.TO_ACTIVATE, WALLET_STATUS.TO_ACTIVATE, WALLET_STATUS.TO_ACTIVATE, WALLET_STATUS.TO_ACTIVATE, WALLET_STATUS.TO_ACTIVATE, WALLET_STATUS.TO_ACTIVATE],
            professionista: WALLET_STATUS.TO_ACTIVATE
        },
        invoiceDetails: [
            { id: 'FT-035', from: 'impresa', to: 'amministratore', amount: 50000, status: 'pending', date: '13/02/2026' },
            { id: 'FT-036', from: 'impresa', to: 'condomino_0', amount: 25000, status: 'pending', date: '13/02/2026' },
            { id: 'FT-037', from: 'professionista', to: 'impresa', amount: 15000, status: 'pending', date: '13/02/2026' },
            { id: 'FT-038', from: 'piattaforma', to: 'professionista', amount: 2000, status: 'pending', date: '13/02/2026' }
        ]
    },
    {
        id: "PRJ-007",
        name: "Borgo Antico",
        owner: "Roberto Ricci",
        updated: "09/02/2026",
        totalInvoices: 145000,
        wallets: {
            amministratore: WALLET_STATUS.ACTIVE,
            impresa: WALLET_STATUS.PENDING,
            condomino: [WALLET_STATUS.ACTIVE, WALLET_STATUS.ACTIVE],
            professionista: WALLET_STATUS.PENDING
        },
        invoiceDetails: [
            { id: 'FT-039', from: 'impresa', to: 'amministratore', amount: 65000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-040', from: 'impresa', to: 'amministratore', amount: 15000, status: 'pending', date: '09/02/2026' },
            { id: 'FT-041', from: 'impresa', to: 'condomino_0', amount: 30000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-042', from: 'impresa', to: 'condomino_0', amount: 10000, status: 'pending', date: '09/02/2026' },
            { id: 'FT-043', from: 'impresa', to: 'condomino_1', amount: 30000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-044', from: 'impresa', to: 'condomino_1', amount: 10000, status: 'pending', date: '09/02/2026' },
            { id: 'FT-045', from: 'professionista', to: 'impresa', amount: 20000, status: 'pending', date: '09/02/2026' },
            { id: 'FT-046', from: 'piattaforma', to: 'professionista', amount: 1800, status: 'pending', date: '09/02/2026' }
        ]
    },
    {
        id: "PRJ-008",
        name: "Vista Mare 1",
        owner: "Anna Esposito",
        updated: "15/02/2026",
        totalInvoices: 178000,
        wallets: {
            amministratore: WALLET_STATUS.ACTIVE,
            impresa: WALLET_STATUS.ACTIVE,
            condomino: [WALLET_STATUS.ACTIVE, WALLET_STATUS.ACTIVE, WALLET_STATUS.ACTIVE],
            professionista: WALLET_STATUS.TO_ACTIVATE
        },
        invoiceDetails: [
            { id: 'FT-047', from: 'impresa', to: 'amministratore', amount: 58000, status: 'paid', date: '05/02/2026' },
            { id: 'FT-048', from: 'impresa', to: 'amministratore', amount: 12000, status: 'pending', date: '15/02/2026' },
            { id: 'FT-049', from: 'impresa', to: 'condomino_0', amount: 40000, status: 'paid', date: '05/02/2026' },
            { id: 'FT-050', from: 'impresa', to: 'condomino_0', amount: 8000, status: 'pending', date: '15/02/2026' },
            { id: 'FT-051', from: 'impresa', to: 'condomino_1', amount: 40000, status: 'paid', date: '05/02/2026' },
            { id: 'FT-052', from: 'impresa', to: 'condomino_2', amount: 40000, status: 'paid', date: '05/02/2026' },
            { id: 'FT-053', from: 'professionista', to: 'impresa', amount: 18000, status: 'pending', date: '15/02/2026' },
            { id: 'FT-054', from: 'piattaforma', to: 'professionista', amount: 1600, status: 'pending', date: '15/02/2026' }
        ]
    },
    {
        id: "PRJ-009",
        name: "Condominio Oasi",
        owner: "Paolo Greco",
        updated: "07/02/2026",
        totalInvoices: 115000,
        wallets: {
            amministratore: WALLET_STATUS.PENDING,
            impresa: WALLET_STATUS.PENDING,
            condomino: [WALLET_STATUS.PENDING, WALLET_STATUS.TO_ACTIVATE],
            professionista: WALLET_STATUS.PENDING
        },
        invoiceDetails: [
            { id: 'FT-055', from: 'impresa', to: 'amministratore', amount: 45000, status: 'pending', date: '07/02/2026' },
            { id: 'FT-056', from: 'impresa', to: 'condomino_0', amount: 35000, status: 'pending', date: '07/02/2026' },
            { id: 'FT-057', from: 'impresa', to: 'condomino_1', amount: 35000, status: 'pending', date: '07/02/2026' },
            { id: 'FT-058', from: 'professionista', to: 'impresa', amount: 12000, status: 'pending', date: '07/02/2026' },
            { id: 'FT-059', from: 'piattaforma', to: 'professionista', amount: 1200, status: 'pending', date: '07/02/2026' }
        ]
    },
    {
        id: "PRJ-010",
        name: "Residence Aurora",
        owner: "Chiara Serra",
        updated: "16/02/2026",
        totalInvoices: 265000,
        wallets: {
            amministratore: WALLET_STATUS.ACTIVE,
            impresa: WALLET_STATUS.ACTIVE,
            condomino: [WALLET_STATUS.ACTIVE, WALLET_STATUS.ACTIVE, WALLET_STATUS.ACTIVE, WALLET_STATUS.ACTIVE, WALLET_STATUS.ACTIVE],
            professionista: WALLET_STATUS.ACTIVE
        },
        invoiceDetails: [
            { id: 'FT-060', from: 'impresa', to: 'amministratore', amount: 90000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-061', from: 'impresa', to: 'amministratore', amount: 20000, status: 'pending', date: '16/02/2026' },
            { id: 'FT-062', from: 'impresa', to: 'condomino_0', amount: 35000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-063', from: 'impresa', to: 'condomino_1', amount: 35000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-064', from: 'impresa', to: 'condomino_2', amount: 35000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-065', from: 'impresa', to: 'condomino_3', amount: 35000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-066', from: 'impresa', to: 'condomino_4', amount: 35000, status: 'paid', date: '01/02/2026' },
            { id: 'FT-067', from: 'impresa', to: 'condomino_0', amount: 10000, status: 'pending', date: '16/02/2026' },
            { id: 'FT-068', from: 'professionista', to: 'impresa', amount: 25000, status: 'paid', date: '20/01/2026' },
            { id: 'FT-069', from: 'professionista', to: 'impresa', amount: 10000, status: 'pending', date: '16/02/2026' },
            { id: 'FT-070', from: 'piattaforma', to: 'professionista', amount: 2500, status: 'pending', date: '16/02/2026' }
        ]
    }
];
