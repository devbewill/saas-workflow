import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/app-shell';
import Dashboard from './components/dashboard/Dashboard';
// import PraticheList from './components/pratiche/PraticheList';
import AtomicPraticaDetail from './components/pratiche/AtomicPraticaDetail';

// Placeholders for now
// const Dashboard = () => <div>Dashboard Content</div>;
import PratichesList from './components/pratiche/PratichesList';
// const Detail = () => <div>Detail Content</div>;

import { WorkflowProvider } from './context/WorkflowContext';

function App() {
  return (
    <WorkflowProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pratiche" element={<PratichesList />} />
          <Route path="/pratiche/:id" element={<AtomicPraticaDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </WorkflowProvider>
  );
}

export default App;
