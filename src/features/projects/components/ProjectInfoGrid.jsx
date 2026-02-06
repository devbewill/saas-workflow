/**
 * ProjectInfoGrid - Displays project information in a grid layout
 */
import React from 'react';
import { CONDOMINIUM_DATA, FINANCIAL_DATA } from '@/data/mockData';

function DataGroup({ title, data }) {
    return (
        <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {data.map((item, i) => (
                    <div key={i} className="space-y-0.5">
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        <p className="text-sm font-medium">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ProjectInfoGrid({ project }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DataGroup title="Anagrafica Condominio" data={CONDOMINIUM_DATA.anagrafica} />
            <DataGroup title="Indirizzi" data={CONDOMINIUM_DATA.indirizzi} />
            <DataGroup title="Amministratore" data={CONDOMINIUM_DATA.amministratore} />
            <DataGroup title="Dati Catastali" data={CONDOMINIUM_DATA.dati_catastali} />
            <DataGroup title="Assicurazione" data={CONDOMINIUM_DATA.assicurazione} />
            <DataGroup title="Prodotto Finanziario" data={FINANCIAL_DATA.prodotto} />
        </div>
    );
}
