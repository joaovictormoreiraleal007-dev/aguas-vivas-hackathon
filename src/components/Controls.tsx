"use client";

import type { FilterOption } from "@/types";

// ─── SearchBar ───────────────────────────────────────────────────────────────

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Buscar praia, lagoa ou cidade..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
      {/* Botão de limpar — aparece apenas quando há texto */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Limpar busca"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── FilterBar ───────────────────────────────────────────────────────────────

const FILTERS: { value: FilterOption; label: string; activeClass: string }[] = [
  { value: "all",     label: "Todos",     activeClass: "bg-gray-300" },
  { value: "good",    label: "🟢 Própria",  activeClass: "bg-green-200 text-green-900" },
  { value: "warning", label: "🟡 Atenção",  activeClass: "bg-amber-200 text-amber-900" },
  { value: "bad",     label: "🔴 Imprópria",activeClass: "bg-red-200 text-red-900" },
];

interface FilterBarProps {
  active: FilterOption;
  onChange: (filter: FilterOption) => void;
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border
            ${active === f.value
              ? `${f.activeClass} border-transparent shadow`
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
