/**
 * apps.js
 * Application definitions for the multi-product SaaS.
 * Each app represents a distinct financial product line.
 */
import {
  ShieldCheck,
  Home,
  Briefcase,
  Factory,
  FileSearch,
  UserPlus,
  Trophy,
  LayoutDashboard,
  FileText,
} from "lucide-react";

export const APPS = {
  HD_CEF: {
    id: "HD_CEF",
    name: "HD CEF",
    label: "Credito finanziamenti",
    icon: ShieldCheck,
    version: "v0.1",
    features: {
      aml: true,
      banche_dati: true,
      tabs: [
        "info",
        "documenti",
        "fascicoli",
        "aml",
        "crediti",
        "delibera",
        "contratto",
        "team",
      ],
    },
  },
  HD_RISTR: {
    id: "HD_RISTR",
    name: "HD RISTR",
    label: "Ristrutturazioni",
    icon: Home,
    version: "v0.1",
    features: {
      aml: false,
      banche_dati: false,
      tabs: [
        "info",
        "documenti",
        "pagamenti",
        "fascicoli",
        "delibera",
        "contratto",
        "team",
      ],
    },
  },
  HD_BRK: {
    id: "HD_BRK",
    name: "HD BRK",
    label: "Broker Esterni",
    icon: Briefcase,
    version: "v0.1",
    features: {
      aml: false,
      banche_dati: false,
      tabs: ["info", "documenti", "aml", "fascicoli", "team"],
    },
  },
  HD_IMPRESE: {
    id: "HD_IMPRESE",
    name: "HD IMPRESE",
    label: "Imprese",
    icon: Factory,
    version: "v0.1",
    features: {
      aml: false,
      banche_dati: false,
      tabs: ["dashboard", "servizi-hd", "progetti", "invita", "gare"],
    },
  },
};

export const DEFAULT_APP = APPS.HD_CEF;
