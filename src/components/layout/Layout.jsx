import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Breadcrumb } from './Breadcrumb';

export default function Layout() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex">
      <Sidebar />
      <main className="flex-1 ml-64 min-w-0 flex flex-col">
        <Topbar />

        <div className="p-8 max-w-7xl mx-auto w-full flex-1">
          <Breadcrumb />
          <Outlet />
        </div>
      </main>
    </div>
  );
}
