import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/shared/app-shell';
import Dashboard from './components/dashboard/Dashboard';

// Feature-based imports
import ProjectsList from './features/projects/pages/ProjectsList';
import ProjectDetailPage from './features/projects/pages/ProjectDetailPage';

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        {/* Legacy routes redirect */}
        <Route path="/pratiche" element={<Navigate to="/projects" replace />} />
        <Route path="/pratiche/:id" element={<Navigate to="/projects/:id" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
