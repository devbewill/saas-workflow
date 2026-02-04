import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { WorkflowProvider } from './context/WorkflowContext';

// Test component
function TestDashboard() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: 'blue',
      color: 'white',
      fontSize: '32px',
      padding: '50px'
    }}>
      <h1>TEST DASHBOARD - WorkflowProvider funziona!</h1>
    </div>
  );
}

function AppTest2() {
  return (
    <WorkflowProvider>
      <Routes>
        <Route path="/" element={<TestDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </WorkflowProvider>
  );
}

export default AppTest2;
