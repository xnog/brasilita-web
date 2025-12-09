import { UserProfile } from "@/lib/db/schema";

/**
 * Verifica se o perfil do usuário está completo com todas as informações necessárias
 * para solicitar assessoria
 */
export function isProfileComplete(profile: UserProfile | null | undefined): boolean {
    if (!profile) return false;

    // Campos obrigatórios para solicitar assessoria
    const requiredFields = [
        profile.propertyType,
        profile.buyerProfile,
        profile.usageType,
        profile.investmentBudget,
        profile.phone,
        profile.investmentGoal,
    ];

    // Verifica se todos os campos obrigatórios estão preenchidos
    return requiredFields.every(field => {
        if (typeof field === 'string') {
            return field.trim().length > 0;
        }
        if (typeof field === 'number') {
            return field > 0;
        }
        return Boolean(field);
    });
}

/**
 * Retorna lista de campos faltantes no perfil
 */
export function getMissingProfileFields(profile: UserProfile | null | undefined): string[] {
    if (!profile) {
        return [
            'Tipo de imóvel',
            'Perfil como comprador',
            'Tipo de uso pretendido',
            'Orçamento de investimento',
            'Telefone',
            'Objetivo do investimento',
        ];
    }

    const missingFields: string[] = [];

    if (!profile.propertyType) missingFields.push('Tipo de imóvel');
    if (!profile.buyerProfile) missingFields.push('Perfil como comprador');
    if (!profile.usageType) missingFields.push('Tipo de uso pretendido');
    if (!profile.investmentBudget || profile.investmentBudget <= 0) missingFields.push('Orçamento de investimento');
    if (!profile.phone || profile.phone.trim().length === 0) missingFields.push('Telefone');
    if (!profile.investmentGoal || profile.investmentGoal.trim().length === 0) missingFields.push('Objetivo do investimento');

    return missingFields;
}
