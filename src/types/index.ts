/**
 * Status da qualidade da água no local.
 * - "good"    → Verde  → Água própria para uso/banho
 * - "warning" → Amarelo → Atenção, monitoramento recomendado
 * - "bad"     → Vermelho → Imprópria para banho ou consumo
 */
export type WaterStatus = "good" | "warning" | "bad";

/**
 * Situação específica para praias (própria/imprópria para banho).
 * Para lagoas e rios que não são praias, usar "not_applicable".
 */
export type BeachStatus = "proper" | "improper" | "not_applicable";

export interface NGO {
  name: string;
  description: string;
  contact: string;
  donationUrl: string;
}

export interface WaterLocation {
  id: number;
  name: string;
  city: string;
  region: string; // Ex: "Grande Florianópolis", "Litoral Norte", "Sul Catarinense"
  lat: number;
  lng: number;
  waterStatus: WaterStatus;
  beachStatus: BeachStatus;
  description: string;
  ngo: NGO | null; // null quando não há ONG vinculada
}

/** Opções para o filtro de status da água na UI */
export type FilterOption = "all" | WaterStatus;
