import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PROJECTS } from '@/data/mockData';

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const resolveName = (segment, index, arr) => {
    // Check if it's a project ID
    if (arr[index - 1] === 'projects') {
      const project = PROJECTS.find(p => p.id === segment);
      return project ? `Progetto ${project.displayId}` : segment;
    }

    // Static mapping
    const map = {
      'projects': 'Gestione Progetti',
      'trattative': 'Trattative',
      'documenti': 'Documenti',
      'dashboard': 'Dashboard'
    };

    return map[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <nav className="flex items-center text-sm text-slate-500 mb-4 animate-in fade-in duration-300">
      <Link to="/" className="hover:text-violet-600 transition-colors flex items-center gap-2">
        <Home size={14} />
        <span className="font-medium">Dashboard</span>
      </Link>
      {pathnames.length > 0 && <ChevronRight size={14} className="mx-2 text-slate-300" />}

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const name = resolveName(value, index, pathnames);

        return (
          <React.Fragment key={to}>
            {isLast ? (
              <span className="font-medium text-slate-900">{name}</span>
            ) : (
              <Link to={to} className="hover:text-violet-600 transition-colors">
                {name}
              </Link>
            )}
            {!isLast && <ChevronRight size={14} className="mx-2 text-slate-300" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
