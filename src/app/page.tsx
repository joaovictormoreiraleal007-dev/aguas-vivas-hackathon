"use client";

import { useState } from "react";
import Header from "@/components/Header";
import MapWrapper from "@/components/MapWrapper";
import Sidebar from "@/components/Sidebar";
import StatsBar from "@/components/StatsBar";
import { SearchBar, FilterBar } from "@/components/Controls";
import { useFilteredLocations, useSelectedLocation } from "@/hooks/useFilteredLocations";
import locationsData from "@/data/locations.json";
import type { WaterLocation } from "@/types";

const ALL_LOCATIONS = locationsData as WaterLocation[];

export default function HomePage() {
  const { filtered, searchQuery, setSearchQuery, activeFilter, setActiveFilter } =
    useFilteredLocations(ALL_LOCATIONS);

  const { selected, select, clear } = useSelectedLocation();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />

      {/* Barra de controles: busca + filtros + estatísticas */}
      <div className="px-4 py-3 bg-gray-100 border-b border-gray-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="sm:w-72">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <FilterBar active={activeFilter} onChange={setActiveFilter} />
        <div className="sm:ml-auto hidden sm:block">
          <StatsBar locations={filtered} />
        </div>
      </div>

      {/* Área do mapa — posicionamento relativo para o painel lateral sobrepor */}
      <div className="flex-1 relative overflow-hidden">
        <MapWrapper
          locations={filtered}
          selectedLocation={selected}
          onSelect={select}
        />

        {/* O Sidebar flutua sobre o mapa */}
        <Sidebar location={selected} onClose={clear} />
      </div>
    </div>
  );
}
