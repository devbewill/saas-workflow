import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from '@/layout/app-shell';

// Lazy load all pages for code-splitting
const DashboardPage = lazy(() => import('@/features/dashboard/dashboard-page'));
const ProjectsListPage = lazy(() => import('@/features/projects/pages/projects-list-page'));
const ProjectDetailPage = lazy(() => import('@/features/projects/pages/project-detail-page'));
const PaymentsPage = lazy(() => import('@/features/payments/pages/payments-page'));
const DesignSystemPage = lazy(() => import('@/features/design-system/design-system-page'));

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppShell />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/projects" element={<ProjectsListPage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/design-system" element={<DesignSystemPage />} />
                {/* Legacy redirects */}
                <Route path="/pratiche" element={<Navigate to="/projects" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}
