/**
 * formatters.js
 * Utility functions for formatting values consistently across the app.
 */

/**
 * Format a number as Euro currency.
 * @param {number} value
 * @returns {string} e.g. "€ 14.250,00"
 */
export function formatCurrency(value) {
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
    }).format(value);
}

/**
 * Format a date string to Italian locale.
 * @param {string|Date} date
 * @returns {string} e.g. "12 Gen 2026"
 */
export function formatDate(date) {
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('it-IT', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(d);
}

/**
 * Get initials from a full name string.
 * @param {string} name
 * @returns {string} e.g. "SP" from "Stefano Perelli"
 */
export function getInitials(name) {
    if (!name) return '??';
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
}

/**
 * Format a number with thousands separator (Italian).
 * @param {number} value
 * @returns {string} e.g. "1.240"
 */
export function formatNumber(value) {
    return new Intl.NumberFormat('it-IT').format(value);
}
