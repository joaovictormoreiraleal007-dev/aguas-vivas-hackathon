"use client";

import type { WaterLocation } from "@/types";

const STATUS_CONFIG = {
  good: {
    label: "Água Própria",
    bg: "bg-green-100",
    text: "text-green-800",
    dot: "bg-green-500",
  },
  warning: {
    label: "Atenção",
    bg: "bg-amber-100",
    text: "text-amber-800",
    dot: "bg-amber-500",
  },
  bad: {
    label: "Imprópria",
    bg: "bg-red-100",
    text: "text-red-800",
    dot: "bg-red-500",
  },
};

const BEACH_LABELS = {
  proper: "Própria para banho",
  improper: "Imprópria para banho",
  not_applicable: "—",
};

interface SidebarProps {
  location: WaterLocation | null;
  onClose: () => void;
}

export default function Sidebar({ location, onClose }: SidebarProps) {
  if (!location) return null;

  const status = STATUS_CONFIG[location.waterStatus];
  const beachLabel = BEACH_LABELS[location.beachStatus];

  return (
    // Overlay em mobile; painel lateral em desktop
    <div className="fixed bottom-0 left-0 right-0 h-[60vh] rounded-t-2xl sm:rounded-none sm:absolute sm:top-0 sm:right-0 sm:bottom-auto sm:left-auto sm:h-full sm:w-96 z-[1000] bg-white shadow-2xl flex flex-col overflow-hidden">
      {/* Cabeçalho */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              {location.name}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {location.city} · {location.region}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Fechar painel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">

        {/* Status badges */}
        <div className="flex flex-wrap gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.text}`}>
            <span className={`w-2 h-2 rounded-full ${status.dot}`} />
            {status.label}
          </span>
          {location.beachStatus !== "not_applicable" && (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${location.beachStatus === "proper" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"}`}>
              🏖 {beachLabel}
            </span>
          )}
        </div>

        {/* Descrição */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Resumo gerado por IA
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {location.description}
          </p>
        </div>

        {/* ONG — renderizado apenas quando existe */}
        {location.ngo && (
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 text-base">(ONG)</span>
              <h3 className="text-sm font-bold text-blue-900">{location.ngo.name}</h3>
            </div>
            <p className="text-sm text-blue-800 leading-relaxed">
              {location.ngo.description}
            </p>
            <div className="text-xs text-blue-700">
              <p className="font-medium">Contato</p>
              <p className="mt-0.5">{location.ngo.contact}</p>
            </div>
            <a
              href={location.ngo.donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
            >
              Apoiar esta causa
            </a>
          </div>
        )}

        {/* Coordenadas — útil para fins de demonstração */}
        <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
          <span className="font-mono">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
}
