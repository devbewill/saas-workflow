import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LayoutTest2 from './components/layout/Layout.test2';
import { WorkflowProvider } from './context/WorkflowContext';

// Test component
function TestDashboard() {
  return (
    <div style={{
      backgroundColor: 'orange',
      color: 'white',
      fontSize: '32px',
      padding: '50px',
      minHeight: '100vh'
    }}>
      <h1>TEST con SIDEBAR</h1>
      <p>Se vedi questo, Sidebar funziona!</p>
    </div>
  );
}

function AppTest5() {
  return (
    <WorkflowProvider>
      <Routes>
        <Route element={<LayoutTest2 />}>
          <Route path="/" element={<TestDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </WorkflowProvider>
  );
}

export default AppTest5;
