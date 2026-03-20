import React from "react";
import { PageHeader } from "@/components/composed/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Eye } from "lucide-react";

// Dati di esempio per le gare
const GARE_DISPONIBILI = [
  {
    id: "15914",
    nome: "Gara 032026 - Corpo E",
    prezzo: "100.000,00 €",
    status: "Gara chiusa",
  },
  {
    id: "15894",
    nome: "Demo Gara 2 - test",
    prezzo: "550,00 €",
    status: "In Gara",
  },
  {
    id: "15893",
    nome: "Demo Gara 1 - test",
    prezzo: "180,00 €",
    status: "Gara chiusa",
  },
  {
    id: "15885",
    nome: "test - test",
    prezzo: "178,00 €",
    status: "Gara chiusa",
  },
  {
    id: "15836",
    nome: "Gara 032026 - Corpo D",
    prezzo: "10.000,00 €",
    status: "In Gara",
  },
  {
    id: "15750",
    nome: "Condominio Gara 1103 - Corpo B",
    prezzo: "10.000,00 €",
    status: "Gara chiusa",
  },
  {
    id: "15813",
    nome: "Gara 032026 - Corpo B",
    prezzo: "0,00 €",
    status: "Gara chiusa",
  },
  {
    id: "15812",
    nome: "Gara 032026 - Corpo A",
    prezzo: "0,00 €",
    status: "Gara chiusa",
  },
];

const LE_MIE_GARE = [
  {
    id: "15918",
    nome: "Gara 032026 - Corpo E",
    prezzo: "100.000,00 €",
    status: "Rejected",
  },
  {
    id: "15904",
    nome: "Demo Gara 2 - test",
    prezzo: "550,00 €",
    status: "Bozza",
  },
  {
    id: "15897",
    nome: "Demo Gara 1 - test",
    prezzo: "207,00 €",
    status: "Proposta di aggiudicazione",
  },
  {
    id: "15887",
    nome: "test - test",
    prezzo: "309,00 €",
    status: "Proposta di aggiudicazione",
  },
  {
    id: "15860",
    nome: "Gara 032026 - Corpo D",
    prezzo: "10.000,00 €",
    status: "Proposta di aggiudicazione",
  },
  {
    id: "15851",
    nome: "Gara 032026 - Corpo A",
    prezzo: "1357,00 €",
    status: "Rejected",
  },
  {
    id: "15840",
    nome: "Gara 032026 - Corpo B",
    prezzo: "123,00 €",
    status: "Proposta di aggiudicazione",
  },
];

export default function GarePage() {
  return (
    <>
      <PageHeader
        title="Gare"
        description={`In questa sezione hai a disposizione l'elenco delle gare a cui puoi partecipare, accedi al dettaglio e proponi il tuo preventivo. Tutte le gare vinte saranno visibili in "Progetti"`}
      />

      <Tabs defaultValue="gare-disponibili" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="gare-disponibili">Gare disponibili</TabsTrigger>
          <TabsTrigger value="le-mie-gare">Le mie gare</TabsTrigger>
        </TabsList>

        <TabsContent value="gare-disponibili" className="mt-6">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Prezzo al pubblico</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {GARE_DISPONIBILI.map((gara) => (
                  <TableRow key={gara.id}>
                    <TableCell className="font-medium">{gara.id}</TableCell>
                    <TableCell className="font-medium">{gara.nome}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {gara.prezzo}
                    </TableCell>
                    <TableCell>
                      {gara.status === "Gara chiusa" ? (
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: "rgb(251, 101, 126)",
                            color: "white",
                          }}
                        >
                          {gara.status}
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: "rgb(255, 239, 220)",
                            color: "rgb(142, 77, 0)",
                          }}
                        >
                          {gara.status}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          QE Impresa
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Progetto HDSR</DropdownMenuItem>
                            <DropdownMenuItem>QU progettista</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="le-mie-gare" className="mt-6">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Prezzo al pubblico</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LE_MIE_GARE.map((gara) => (
                  <TableRow key={gara.id}>
                    <TableCell className="font-medium">{gara.id}</TableCell>
                    <TableCell className="font-medium">{gara.nome}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {gara.prezzo}
                    </TableCell>
                    <TableCell>
                      {gara.status === "Rejected" ? (
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: "rgb(251, 101, 126)",
                            color: "white",
                          }}
                        >
                          {gara.status}
                        </span>
                      ) : gara.status === "Bozza" ? (
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: "rgb(229, 231, 235)",
                            color: "rgb(75, 85, 99)",
                          }}
                        >
                          {gara.status}
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: "rgb(255, 239, 220)",
                            color: "rgb(142, 77, 0)",
                          }}
                        >
                          {gara.status}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Progetto HDSR</DropdownMenuItem>
                            <DropdownMenuItem>QU progettista</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
