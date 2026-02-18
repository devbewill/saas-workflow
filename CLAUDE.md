# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **multi-product SaaS dashboard** for managing financial products (construction financing, renovations, broker services). Built with React 19, Vite, React Router, and Tailwind CSS.

Key characteristics:
- **Multi-tenant architecture**: Users switch between apps (HD_CEF, HD_RISTR, HD_BRK) via app switcher
- **Role-based access control (RBAC)**: Different views/features per role (gestore, amministratore, impresa, professionista, condomino, tech)
- **Workflow-driven projects**: Each project follows a state machine defined in JSON workflows
- **Feature-driven structure**: Code organized by features (projects, payments, ai-assistant), not by technical layers

## Development Commands

```bash
# Development server (runs on http://localhost:5173)
npm run dev

# Production build
npm run build

# Build preview
npm run preview

# Linting
npm run lint
```

## Architecture & Key Concepts

### 1. Multi-App System

The application supports multiple product lines, each with different features:

- **Apps defined in**: `src/config/apps.js`
- **Current app stored in**: `AppContext` (persisted to localStorage)
- **App switching**: Via `app-switcher.jsx` component in the header
- Each app has:
  - `features.tabs`: Which tabs are available in project detail view
  - `features.aml`: Whether AML checks are enabled
  - `features.banche_dati`: Whether credit database checks are enabled

Example: HD_CEF has AML features, HD_RISTR focuses on construction/payments, HD_BRK is for external brokers.

### 2. Role-Based Access Control (RBAC)

- **Roles defined in**: `src/config/roles.js`
- **Current user stored in**: `AppContext` (persisted to localStorage)
- **Role switching**: Via user menu in app-header.jsx
- Each role has different `payments.view` and `features` arrays
- Roles: `gestore` (backoffice), `amministratore` (condo admin), `impresa` (contractor), `professionista` (technical director), `condomino` (condo owner), `tech` (developer)

**Important for payments feature**: The payment view is determined by user role (see `src/features/payments/pages/payments-page.jsx`)

### 3. Workflow System (State Machine)

Projects follow a workflow state machine:

- **Workflow JSON files**: `src/data/workflows/hd-{app}.json` (one per app)
- **Workflow hook**: `src/hooks/use-workflow.js` - loads the correct workflow based on active app
- **Workflow structure**: Each step has:
  - `fullName`: Full state name (e.g., "Aperta – Verifica preliminare")
  - `state`: Primary state (e.g., "Aperta")
  - `subState`: Secondary state (e.g., "Verifica preliminare")
  - `owner`: Role responsible for this step
  - `nextPossible`: Array of possible next states
- **View configuration**: `src/config/workflow-views.js` - maps each workflow state to:
  - Available tabs for that state
  - Default tab to show
  - Whether to show AI assistant
  - Assistant configuration key
  - Primary action button text

**When modifying workflows**: Update all three files (workflow JSON, workflow-views.js, and assistant-steps.js if using assistant)

### 4. Project Detail Page Architecture

`src/features/projects/pages/project-detail-page.jsx` is the core of the app:

- Uses `useWorkflow()` hook to get current workflow state
- Dynamically loads tab views based on `workflow-views.js` configuration
- Shows timeline (all workflow steps with status indicators)
- Shows AI assistant panel if `viewConfig.showAssistant` is true
- Available tabs filter based on both:
  1. Active app's `features.tabs` array
  2. Current workflow state's `availableTabs` array

### 5. Feature Structure

Features are self-contained modules in `src/features/`:

```
features/
  ├── projects/
  │   ├── pages/           # Routable pages
  │   ├── views/           # Tab views (lazy-loaded)
  │   └── components/      # Feature-specific components
  ├── payments/
  │   ├── pages/
  │   ├── views/           # Different views per role
  │   └── components/
  └── ai-assistant/
      └── components/
```

**Views vs Pages**:
- **Pages**: Routable components (imported in `src/app/routes.jsx`)
- **Views**: Tab content components (lazy-loaded in detail pages)

### 6. Component Organization

```
components/
  ├── ui/               # Base shadcn/ui components (Button, Card, Input, etc.)
  └── composed/         # Business-specific composed components
```

**Composed components** combine multiple UI primitives with business logic (e.g., `page-header`, `status-badge`, `data-table`).

### 7. Data Layer

Mock data stored in `src/data/`:
- `projects.js` - Project listings
- `documents.js` - Document data
- `payments.js` - Payment transactions
- `condominium.js` - Condominium details
- `workflows/*.json` - Workflow state machines

**Note**: This is currently mock data. When implementing real backend, keep the same data structure.

### 8. Routing

- **Router**: React Router v7
- **Routes defined in**: `src/app/routes.jsx`
- **Layout**: All routes wrapped in `<AppShell>` which provides sidebar + header
- **Path alias**: `@/` maps to `src/` (configured in vite.config.js)

Main routes:
- `/` - Dashboard
- `/projects` - Projects list
- `/projects/:id` - Project detail
- `/payments` - Payments (view determined by user role)
- `/design-system` - Component showcase

### 9. Styling System

- **Framework**: Tailwind CSS with custom design tokens
- **Config**: `tailwind.config.js`
- **CSS Variables**: Defined in `src/index.css` (HSL color system)
- **Custom utility**: `cn()` in `src/lib/utils.js` - combines clsx + tailwind-merge for conditional classes
- **Custom colors**:
  - `brand.*` - Custom violet brand palette (50-900)
  - `sidebar.*` - Sidebar-specific colors
  - `projectStatus.*` - Status badge colors

**Tailwind pattern**: Use semantic color names (e.g., `bg-primary`, `text-muted-foreground`) instead of raw colors.

### 10. Context & State Management

- **Global state**: React Context via `src/context/app-context.jsx`
- **Provides**:
  - `activeApp` - Current product line
  - `setActiveApp()` - Switch apps
  - `user` - Current user with role
  - `setUserRole()` - Switch roles (for demo purposes)
- State persisted to localStorage

**No external state library** (Redux, Zustand, etc.) - React Context is sufficient for this app's needs.

## Code Patterns & Conventions

### Import Alias
Always use `@/` alias for imports:
```jsx
import { Button } from '@/components/ui/button';
import { useWorkflow } from '@/hooks/use-workflow';
```

### Component File Naming
- UI components: kebab-case (e.g., `button.jsx`, `card.jsx`)
- Page components: kebab-case with suffix (e.g., `project-detail-page.jsx`)
- Composed components: kebab-case (e.g., `page-header.jsx`)

### Lazy Loading
Tab views in detail pages are lazy-loaded:
```jsx
const InfoView = lazy(() => import('../views/info-view'));
```

### CSS Class Utility
Use the `cn()` utility for conditional classes:
```jsx
className={cn("base-class", condition && "conditional-class", className)}
```

### Workflow State Handling
To get current workflow state and transitions:
```jsx
const { currentStatusName, currentStep, transitionTo, getAvailableActions } = useWorkflow();
```

### View Configuration
To get view config for current workflow state:
```jsx
const viewConfig = getViewConfig(currentStatusName);
// viewConfig.availableTabs, viewConfig.defaultTab, etc.
```

## Adding New Features

### Adding a New Tab View

1. Create view component in `src/features/projects/views/your-view.jsx`
2. Add to `VIEW_COMPONENTS` in `project-detail-page.jsx`
3. Add to `TAB_LABELS` in `src/config/workflow-views.js`
4. Configure in `WORKFLOW_VIEW_CONFIG` for relevant workflow states
5. Add to app's `features.tabs` array in `src/config/apps.js` if app-specific

### Adding a New Workflow State

1. Add step to workflow JSON in `src/data/workflows/hd-{app}.json`
2. Add view configuration in `src/config/workflow-views.js`
3. If using assistant, add to `src/config/assistant-steps.js`
4. Update transitions (`nextPossible`) in adjacent workflow steps

### Adding a New App

1. Add app definition to `src/config/apps.js`
2. Create workflow JSON in `src/data/workflows/hd-{app-id}.json`
3. Update `useWorkflow` hook to load the new workflow
4. Configure navigation in `src/config/navigation.js` if needed
5. Add app-specific views/features as needed

### Adding a New Role

1. Add role constant to `ROLES` in `src/config/roles.js`
2. Add role policy to `ROLE_POLICIES` with permissions
3. Update payment views in `src/features/payments/pages/payments-page.jsx`
4. Add role-specific UI in components that check user role

## Important Files Reference

**Configuration**:
- `src/config/apps.js` - App definitions (products)
- `src/config/roles.js` - RBAC roles & permissions
- `src/config/workflow-views.js` - Workflow state → view mapping
- `src/config/assistant-steps.js` - AI assistant configuration
- `src/config/navigation.js` - Sidebar navigation

**Core Architecture**:
- `src/app/routes.jsx` - Route definitions
- `src/context/app-context.jsx` - Global state (app + user)
- `src/hooks/use-workflow.js` - Workflow state machine logic
- `src/layout/app-shell.jsx` - Main layout wrapper

**Key Pages**:
- `src/features/projects/pages/project-detail-page.jsx` - Main project detail view
- `src/features/payments/pages/payments-page.jsx` - Role-based payment views

## Environment & Configuration

- **No .env file required** for development (all mock data)
- **Vite config**: `vite.config.js`
- **Tailwind config**: `tailwind.config.js`
- **ESLint config**: `eslint.config.js` (flat config format)
- **Path alias**: `@` → `./src` configured in Vite

## UI Component Library

Based on **shadcn/ui** (Radix UI primitives + Tailwind):
- Components in `src/components/ui/`
- Do not modify UI component structure, only extend as composed components
- For new UI needs, check shadcn/ui documentation for additional components to add
