import React from "react";
import { PageHeader } from "@/components/composed/page-header";
import { Card } from "@/components/ui/card";

export default function ImpreseDashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Benvenuto nella dashboard di Imprese"
      />
      <Card className="p-12">
        <div className="text-center text-muted-foreground">
          <p>Contenuto in arrivo...</p>
        </div>
      </Card>
    </>
  );
}
