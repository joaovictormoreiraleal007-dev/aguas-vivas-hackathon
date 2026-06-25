"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { WaterLocation } from "@/types";

// --- Configuração de marcadores coloridos ---
// Leaflet por padrão não inclui ícones quando bundlado com webpack/Next.js.
// Criamos ícones SVG inline para cada status, evitando dependência de imagens externas.

const MARKER_COLORS: Record<string, string> = {
  good: "#22c55e",      // verde
  warning: "#f59e0b",   // amarelo
  bad: "#ef4444",       // vermelho
};

function createColorMarker(status: string): L.DivIcon {
  const color = MARKER_COLORS[status] ?? "#6b7280";
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 20px; height: 20px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -12],
  });
}

// --- Subcomponente: voa para o local selecionado ---
// Colocado dentro do MapContainer para ter acesso ao hook useMap().
function FlyToSelected({ location }: { location: WaterLocation | null }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 13, { duration: 1.2 });
    }
  }, [location, map]);
  return null;
}

// --- Labels legíveis ---
const STATUS_LABELS: Record<string, string> = {
  good: "Própria",
  warning: "Atenção",
  bad: "Imprópria",
};

interface MapProps {
  locations: WaterLocation[];
  selectedLocation: WaterLocation | null;
  onSelect: (location: WaterLocation) => void;
}

export default function Map({ locations, selectedLocation, onSelect }: MapProps) {
  return (
    <MapContainer
      center={[-27.5, -48.8]}  // centro aproximado de SC
      zoom={8}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
    >
      {/* Tiles do OpenStreetMap — gratuito e sem necessidade de API key */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Voa para o marcador quando um local é selecionado pela busca */}
      <FlyToSelected location={selectedLocation} />

      {/* Renderiza um marcador por local */}
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={createColorMarker(loc.waterStatus)}
          eventHandlers={{
            // Ao clicar: abre o popup E abre o painel lateral
            click: () => onSelect(loc),
          }}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-semibold">{loc.name}</p>
              <p className="text-gray-600">{loc.city}</p>
              <p
                style={{ color: MARKER_COLORS[loc.waterStatus] }}
                className="font-medium mt-1"
              >
                {STATUS_LABELS[loc.waterStatus]}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
