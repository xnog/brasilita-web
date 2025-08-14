import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Interface for user profile with regions
interface UserProfileWithRegions {
  userProfileRegions?: Array<{
    region?: {
      name: string;
    };
  }>;
}

// Função para buscar e formatar regiões do perfil
export async function formatUserRegions(userProfileWithRegions: UserProfileWithRegions): Promise<string> {
  try {
    if (!userProfileWithRegions?.userProfileRegions?.length) {
      return "";
    }

    const regionNames = userProfileWithRegions.userProfileRegions
      .map((upr) => upr.region?.name)
      .filter((name): name is string => Boolean(name));

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

    const regions: Array<{ value: string; label: string }> = await response.json();
    const regionNames = regionIds
      .map(id => regions.find((r) => r.value === id)?.label)
      .filter((label): label is string => Boolean(label));

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
