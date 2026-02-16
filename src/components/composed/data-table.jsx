import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/Table';
import { Card } from '@/components/ui/card';

/**
 * DataTable — Reusable table wrapped in a Card.
 * Accepts column definitions and row data, renders a clean sortable table.
 *
 * columns: [{ key, label, className?, render? }]
 * data: array of objects
 * onRowClick: optional callback with row data
 */
export function DataTable({ columns, data, onRowClick, emptyMessage = 'Nessun dato disponibile' }) {
    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col) => (
                            <TableHead key={col.key} className={col.className}>
                                {col.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center text-muted-foreground py-8">
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, rowIndex) => (
                            <TableRow
                                key={row.id || rowIndex}
                                onClick={() => onRowClick?.(row)}
                                className={onRowClick ? 'cursor-pointer' : ''}
                            >
                                {columns.map((col) => (
                                    <TableCell key={col.key} className={col.cellClassName}>
                                        {col.render ? col.render(row) : row[col.key]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}
