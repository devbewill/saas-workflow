import React from 'react';
import { Upload } from 'lucide-react';

/**
 * FileUpload — Drop zone / upload area for documents.
 * Used in AML verification and document management.
 */
export function FileUpload({ label = 'Carica file', accept, onChange, fileName }) {
    const inputRef = React.useRef(null);

    return (
        <div
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted p-6 text-center cursor-pointer hover:border-accent/50 hover:bg-muted/50 transition-colors"
        >
            <Upload size={20} className="text-muted-foreground" />
            <p className="text-sm font-medium">{fileName || label}</p>
            <p className="text-xs text-muted-foreground">Clicca per selezionare un file</p>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={onChange}
                className="hidden"
            />
        </div>
    );
}
