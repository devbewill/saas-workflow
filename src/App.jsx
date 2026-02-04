import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
// import PraticheList from './components/pratiche/PraticheList';
import PraticaDetail from './components/pratiche/PraticaDetail';

// Placeholders for now
// const Dashboard = () => <div>Dashboard Content</div>;
const Pratiches = () => <div>Pratiche List Content</div>;
// const Detail = () => <div>Detail Content</div>;

import { WorkflowProvider } from './context/WorkflowContext';

function App() {
  return (
    <WorkflowProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pratiche" element={<Pratiches />} />
          <Route path="/pratiche/:id" element={<PraticaDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </WorkflowProvider>
  );
}

export default App;
