import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { WorkflowProvider } from './context/WorkflowContext';

// Test component
function TestDashboard() {
  return (
    <div style={{
      backgroundColor: 'green',
      color: 'white',
      fontSize: '32px',
      padding: '50px',
      minHeight: '100vh'
    }}>
      <h1>TEST DASHBOARD - Layout funziona!</h1>
      <p>Se vedi questo, il Layout è OK</p>
    </div>
  );
}

function AppTest3() {
  return (
    <WorkflowProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TestDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </WorkflowProvider>
  );
}

export default AppTest3;
