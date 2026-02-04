import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LayoutTest from './components/layout/Layout.test';
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
      <h1>TEST DASHBOARD - LayoutTest funziona!</h1>
      <p>Se vedi questo, il problema è in Sidebar/Topbar/Breadcrumb</p>
    </div>
  );
}

function AppTest4() {
  return (
    <WorkflowProvider>
      <Routes>
        <Route element={<LayoutTest />}>
          <Route path="/" element={<TestDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </WorkflowProvider>
  );
}

export default AppTest4;
