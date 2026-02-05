import React from 'react';
import { FolderOpen, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function BundleWidget({ bundles = [], onCreate }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Fascicoli</CardTitle>
        <Button size="sm" variant="outline" onClick={onCreate}>
          <Plus className="h-4 w-4 mr-2" /> Nuovo
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {bundles.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-muted rounded-lg text-center">
             <FolderOpen className="h-8 w-8 text-muted-foreground mb-3" />
             <p className="text-sm text-muted-foreground">Nessun fascicolo creato</p>
          </div>
        ) : (
          <div className="grid gap-3">
             {bundles.map(bundle => (
                <div key={bundle.id} className="flex items-center justify-between p-3 border rounded-md">
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center text-primary">
                         <FolderOpen className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{bundle.name}</span>
                   </div>
                   <span className="text-xs text-muted-foreground">{bundle.docCount} docs</span>
                </div>
             ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
