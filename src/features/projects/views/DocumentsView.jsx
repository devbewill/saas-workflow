/**
 * DocumentsView - View for document management states
 * Shows the documents table with filtering and actions
 */
import React from 'react';
import { DocumentsTable } from '@/components/DocumentsTable';

export default function DocumentsView({ project }) {
    return (
        <div className="space-y-6">
            <DocumentsTable projectId={project?.id} />
        </div>
    );
}
