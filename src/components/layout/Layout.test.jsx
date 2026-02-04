import React from 'react';
import { Outlet } from 'react-router-dom';
import { useWorkflow } from '@/context/WorkflowContext';
import { cn } from '@/lib/utils';

export default function LayoutTest() {
  const { theme } = useWorkflow();

  return (
    <div className={cn("min-h-screen flex transition-colors duration-500", theme.bg, theme.font)}>
      {/* Sidebar placeholder */}
      <div style={{ width: '256px', backgroundColor: '#f0f0f0', padding: '20px' }}>
        <h2>SIDEBAR TEST</h2>
      </div>

      <main className="flex-1 ml-64 min-w-0 flex flex-col">
        {/* Topbar placeholder */}
        <div style={{ height: '64px', backgroundColor: '#e0e0e0', padding: '20px' }}>
          <h2>TOPBAR TEST</h2>
        </div>

        <div className="p-8 w-full flex-1">
          {/* Breadcrumb placeholder */}
          <div style={{ marginBottom: '16px', padding: '10px', backgroundColor: '#d0d0d0' }}>
            BREADCRUMB TEST
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
