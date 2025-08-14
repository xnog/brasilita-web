import { db } from "@/lib/db";
import { properties, propertyMatches, userProfiles } from "@/lib/db/schema";
import { eq, and, inArray, isNull, or } from "drizzle-orm";

export interface MatchingCriteria {
    userProfileId: string;
    userId: string;
    propertyType: string;
    investmentBudget: number;
    userRegionIds: string[];
    usageType?: string;
    buyerProfile?: string;
}

export async function generatePropertyMatches(criteria: MatchingCriteria) {
    try {
        // Buscar propriedades que atendem aos critérios básicos
        let whereCondition = and(
            eq(properties.propertyType, criteria.propertyType),
            // Propriedades dentro do orçamento (considerando uma margem de 20%)
            properties.price ?
                and(
                    properties.price <= criteria.investmentBudget * 1.2,
                    properties.price >= criteria.investmentBudget * 0.5
                ) : undefined,
            eq(properties.isAvailable, true)
        );

        // Se o usuário tem regiões selecionadas, filtrar por elas
        // Senão, buscar todas (para compatibilidade com dados antigos)
        if (criteria.userRegionIds.length > 0) {
            whereCondition = and(
                whereCondition,
                inArray(properties.regionId, criteria.userRegionIds)
            );
        }

        const matchingProperties = await db.query.properties.findMany({
            where: whereCondition,
            with: {
                region: true
            }
        });

        // Remover matches existentes para este usuário
        await db.delete(propertyMatches)
            .where(eq(propertyMatches.userId, criteria.userId));

        // Criar novos matches com score baseado nos critérios
        const newMatches = matchingProperties.map(property => {
            let matchScore = 50; // Score base

            // Boost por região (se a propriedade tem região e está nas preferências do usuário)
            if (property.regionId && criteria.userRegionIds.includes(property.regionId)) {
                matchScore += 30;
            }

            // Boost por tipo de propriedade exato
            if (property.propertyType === criteria.propertyType) {
                matchScore += 20;
            }

            // Boost por preço dentro do orçamento ideal (80% do budget)
            if (property.price && property.price <= criteria.investmentBudget * 0.8) {
                matchScore += 15;
            }

            // Penalty por preço acima do orçamento preferido
            if (property.price && property.price > criteria.investmentBudget) {
                matchScore -= 10;
            }

            // Cap do score em 100
            matchScore = Math.min(100, Math.max(0, matchScore));

            return {
                userId: criteria.userId,
                propertyId: property.id,
                matchScore,
                matchReason: JSON.stringify({
                    regionMatch: property.regionId && criteria.userRegionIds.includes(property.regionId),
                    propertyTypeMatch: property.propertyType === criteria.propertyType,
                    priceWithinBudget: property.price ? property.price <= criteria.investmentBudget : null,
                    regionName: property.region?.name || 'Região não especificada'
                }),
                isActive: true,
                isInterested: false
            };
        });

        // Inserir novos matches se houver propriedades
        if (newMatches.length > 0) {
            await db.insert(propertyMatches).values(newMatches);
        }

        return {
            matchCount: newMatches.length,
            averageScore: newMatches.length > 0 ?
                newMatches.reduce((sum, match) => sum + match.matchScore, 0) / newMatches.length : 0
        };

    } catch (error) {
        console.error("Error generating property matches:", error);
        throw error;
    }
}

export async function updateUserMatches(userId: string) {
    try {
        // Buscar perfil do usuário com regiões
        const userProfile = await db.query.userProfiles.findFirst({
            where: eq(userProfiles.userId, userId),
            with: {
                userProfileRegions: {
                    with: {
                        region: true
                    }
                }
            }
        });

        if (!userProfile || !userProfile.propertyType || !userProfile.investmentBudget) {
            return { error: "Perfil incompleto" };
        }

        const criteria: MatchingCriteria = {
            userProfileId: userProfile.id,
            userId: userId,
            propertyType: userProfile.propertyType,
            investmentBudget: userProfile.investmentBudget,
            userRegionIds: userProfile.userProfileRegions.map(upr => upr.regionId),
            usageType: userProfile.usageType || undefined,
            buyerProfile: userProfile.buyerProfile || undefined
        };

        return await generatePropertyMatches(criteria);

    } catch (error) {
        console.error("Error updating user matches:", error);
        throw error;
    }
}