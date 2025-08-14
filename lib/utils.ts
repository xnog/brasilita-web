import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para buscar e formatar regiões do perfil
export async function formatUserRegions(userProfileWithRegions: any): Promise<string> {
  try {
    if (!userProfileWithRegions?.userProfileRegions?.length) {
      return "";
    }

    const regionNames = userProfileWithRegions.userProfileRegions
      .map((upr: any) => upr.region?.name)
      .filter(Boolean);

    if (regionNames.length === 0) return "";
    if (regionNames.length === 1) return regionNames[0];
    if (regionNames.length === 2) return `${regionNames[0]} e ${regionNames[1]}`;

    const lastRegion = regionNames.pop();
    return `${regionNames.join(", ")} e ${lastRegion}`;
  } catch (error) {
    console.error("Erro ao formatar regiões:", error);
    return "";
  }
}

// Função para formatar regiões quando temos apenas os IDs
export async function formatRegionsByIds(regionIds: string[]): Promise<string> {
  try {
    if (!regionIds?.length) return "";

    const response = await fetch("/api/regions");
    if (!response.ok) return "";

    const regions = await response.json();
    const regionNames = regionIds
      .map(id => regions.find((r: any) => r.value === id)?.label)
      .filter(Boolean);

    if (regionNames.length === 0) return "";
    if (regionNames.length === 1) return regionNames[0];
    if (regionNames.length === 2) return `${regionNames[0]} e ${regionNames[1]}`;

    const lastRegion = regionNames.pop();
    return `${regionNames.join(", ")} e ${lastRegion}`;
  } catch (error) {
    console.error("Erro ao formatar regiões:", error);
    return "";
  }
}
