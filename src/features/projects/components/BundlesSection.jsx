/**
 * BundlesSection - Manages document bundles (Fascicoli) for digital signatures
 */
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FileStack, Send, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Mock bundles data
const INITIAL_BUNDLES = [
    { id: 1, name: 'Fascicolo Privacy', documentIds: [1, 2, 3], status: 'pending' },
    { id: 2, name: 'Fascicolo Contratto', documentIds: [8, 9, 10], status: 'sent' },
];

export function BundlesSection({ projectId, documents }) {
    const [bundles, setBundles] = useState(INITIAL_BUNDLES);

    const handleCreateBundle = () => {
        const newBundle = {
            id: Date.now(),
            name: `Nuovo Fascicolo ${bundles.length + 1}`,
            documentIds: [],
            status: 'pending',
        };
        setBundles([...bundles, newBundle]);
    };

    const handleDeleteBundle = (id) => {
        setBundles(bundles.filter(b => b.id !== id));
    };

    const handleSendForSignature = (bundle) => {
        setBundles(bundles.map(b =>
            b.id === bundle.id ? { ...b, status: 'sent' } : b
        ));
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <Badge variant="outline" className="text-slate-600">In preparazione</Badge>;
            case 'sent':
                return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Inviato in firma</Badge>;
            case 'signed':
                return <Badge className="bg-green-100 text-green-800 border-green-200">Firmato</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileStack className="h-5 w-5 text-violet-600" />
                    <CardTitle className="text-lg">Fascicoli per Firma</CardTitle>
                </div>
                <Button size="sm" onClick={handleCreateBundle}>
                    <Plus className="h-4 w-4 mr-2" /> Nuovo Fascicolo
                </Button>
            </CardHeader>
            <CardContent>
                {bundles.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <FileStack className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Nessun fascicolo creato</p>
                        <p className="text-sm">Crea un fascicolo per raggruppare documenti da inviare in firma</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {bundles.map((bundle) => (
                            <div
                                key={bundle.id}
                                className={cn(
                                    "p-4 rounded-lg border transition-all",
                                    bundle.status === 'sent'
                                        ? "bg-blue-50/50 border-blue-200"
                                        : "bg-white border-slate-200 hover:border-violet-300"
                                )}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-medium text-sm">{bundle.name}</h4>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {bundle.documentIds.length} documenti
                                        </p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Edit className="h-4 w-4 mr-2" /> Modifica
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-600"
                                                onClick={() => handleDeleteBundle(bundle.id)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" /> Elimina
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="flex items-center justify-between">
                                    {getStatusBadge(bundle.status)}

                                    {bundle.status === 'pending' && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleSendForSignature(bundle)}
                                        >
                                            <Send className="h-3 w-3 mr-1" /> Invia
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
