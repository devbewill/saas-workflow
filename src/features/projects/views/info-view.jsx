import React from 'react';
import { SectionPanel } from '@/components/composed/section-panel';
import { InfoGrid } from '@/components/composed/info-grid';
import { CONDOMINIUM_DATA, FINANCIAL_DATA } from '@/data/condominium';
import { Building2, User, MapPin, FileText, Shield } from 'lucide-react';

export default function InfoView() {
    return (
        <div className="space-y-6 pt-4">
            <SectionPanel title="Anagrafica Condominio" icon={Building2}>
                <InfoGrid items={CONDOMINIUM_DATA.anagrafica} columns={3} />
            </SectionPanel>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SectionPanel title="Indirizzi" icon={MapPin}>
                    <InfoGrid items={CONDOMINIUM_DATA.indirizzi} />
                </SectionPanel>

                <SectionPanel title="Amministratore" icon={User}>
                    <InfoGrid items={CONDOMINIUM_DATA.amministratore} />
                </SectionPanel>

                <SectionPanel title="Dati Catastali" icon={FileText}>
                    <InfoGrid items={CONDOMINIUM_DATA.dati_catastali} />
                </SectionPanel>

                <SectionPanel title="Assicurazione" icon={Shield}>
                    <InfoGrid items={CONDOMINIUM_DATA.assicurazione} />
                </SectionPanel>
            </div>

            <SectionPanel title="Dati Finanziari — Prodotto" icon={FileText}>
                <InfoGrid items={FINANCIAL_DATA.prodotto} columns={3} />
            </SectionPanel>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SectionPanel title="Importi">
                    <InfoGrid items={FINANCIAL_DATA.importi} />
                </SectionPanel>
                <SectionPanel title="Durata e Tassi">
                    <InfoGrid items={FINANCIAL_DATA.durata_tassi} />
                </SectionPanel>
                <SectionPanel title="Garanzie">
                    <InfoGrid items={FINANCIAL_DATA.garanzie} />
                </SectionPanel>
                <SectionPanel title="Condizioni">
                    <InfoGrid items={FINANCIAL_DATA.condizioni} />
                </SectionPanel>
            </div>
        </div>
    );
}
