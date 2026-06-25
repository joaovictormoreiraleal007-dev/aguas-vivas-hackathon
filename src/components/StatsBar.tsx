"use client";

import type { WaterLocation } from "@/types";

interface StatsBarProps {
  locations: WaterLocation[];
}

export default function StatsBar({ locations }: StatsBarProps) {
  const good    = locations.filter((l) => l.waterStatus === "good").length;
  const warning = locations.filter((l) => l.waterStatus === "warning").length;
  const bad     = locations.filter((l) => l.waterStatus === "bad").length;

  return (
    <div className="flex items-center gap-4 text-xs text-gray-600">
      <span className="font-medium text-gray-400">({locations.length} locais)</span>
      <span className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-green-500" />{good} próprias
      </span>
      <span className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-amber-400" />{warning} atenção
      </span>
      <span className="flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-red-500" />{bad} impróprias
      </span>
    </div>
  );
}
