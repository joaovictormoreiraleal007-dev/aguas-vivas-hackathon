"use client";

/**
 * React Leaflet usa `window` internamente, o que quebra o SSR do Next.js.
 * A solução padrão é importar o componente de mapa dinamicamente com ssr: false.
 * Este arquivo é o ponto de importação dinâmica — mantenha-o separado do Map.tsx.
 */
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <span className="text-4xl animate-bounce">🪼</span>
        <p className="text-sm">Carregando mapa...</p>
      </div>
    </div>
  ),
});

export default Map;
