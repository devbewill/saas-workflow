import React from "react";
import { PageHeader } from "@/components/composed/page-header";
import { Card } from "@/components/ui/card";

export default function ImpreseProgettiPage() {
  return (
    <>
      <PageHeader title="Progetti" description="Gestisci i tuoi progetti" />
      <Card className="p-12">
        <div className="text-center text-muted-foreground">
          <p>Contenuto in arrivo...</p>
        </div>
      </Card>
    </>
  );
}
