import { useState, useMemo } from "react";
import type { WaterLocation, FilterOption } from "@/types";

/**
 * Hook que combina busca por texto e filtro por status da água.
 *
 * A busca é feita sobre name e city (case-insensitive).
 * O filtro é aplicado sobre waterStatus.
 *
 * Os dois filtros são compostos: um local precisa satisfazer ambos
 * para aparecer na lista.
 */
export function useFilteredLocations(locations: WaterLocation[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  const filtered = useMemo(() => {
    return locations.filter((loc) => {
      const matchesSearch =
        searchQuery === "" ||
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === "all" || loc.waterStatus === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [locations, searchQuery, activeFilter]);

  return {
    filtered,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
  };
}

/**
 * Hook simples para controlar qual localidade está selecionada
 * (usada para abrir o painel lateral e centralizar o mapa).
 */
export function useSelectedLocation() {
  const [selected, setSelected] = useState<WaterLocation | null>(null);

  const select = (location: WaterLocation) => setSelected(location);
  const clear = () => setSelected(null);

  return { selected, select, clear };
}
