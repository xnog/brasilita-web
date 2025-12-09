import { Property } from "@/lib/db/schema";
import { getPropertyCode } from "@/lib/utils";

export const WHATSAPP_PHONE = "393515295913";

export const getFormattedPhoneNumber = () => {
    return `+${WHATSAPP_PHONE.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')}`;
};


export const generatePropertyNegotiationMessage = (
    property: Omit<Property, 'originalUrl'> & { region?: { name: string } | null },
    userEmail?: string,
    userRegions?: string[],
    userBudget?: number
) => {
    const propertyCode = getPropertyCode(property.id);
    const propertyUrl = `${window.location.origin}/properties/${property.id}`;

    const userInfo = userEmail ? `\nEmail: ${userEmail}` : '';
    const regionsInfo = userRegions && userRegions.length > 0 ? `\nRegiões de interesse: ${userRegions.join(", ")}` : '';
    const budgetInfo = userBudget ? `\nOrçamento: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(userBudget)}` : '';

    const message = `Olá! Tenho interesse em saber mais sobre este imóvel e sobre a assessoria da Brasilità.

Código: ${propertyCode}
Link: ${propertyUrl}${userInfo}${regionsInfo}${budgetInfo}

_Mensagem enviada através do site brasilita.com_`;

    return encodeURIComponent(message);
};


export const generateRepresentationServiceMessage = (
    userEmail?: string,
    userRegions?: string[],
    userBudget?: number
) => {
    const userInfo = userEmail ? `\nEmail: ${userEmail}` : '';
    const regionsInfo = userRegions && userRegions.length > 0
        ? `\nRegiões de interesse: ${userRegions.join(", ")}`
        : '\nRegiões de interesse: Todas as regiões';
    const budgetInfo = userBudget
        ? `\nOrçamento: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(userBudget)}`
        : '';

    const message = `Olá! Gostaria de saber mais sobre a assessoria completa de compra de imóveis.${userInfo}${regionsInfo}${budgetInfo}

_Mensagem enviada através do site brasilita.com_`;

    return encodeURIComponent(message);
};

export const generatePropertyAdvisoryMessage = (
    userEmail?: string,
    userRegions?: string[],
    userBudget?: number
) => {
    const userInfo = userEmail ? `\nEmail: ${userEmail}` : '';
    const regionsInfo = userRegions && userRegions.length > 0
        ? `\nRegiões de interesse: ${userRegions.join(", ")}`
        : '\nRegiões de interesse: Todas as regiões';
    const budgetInfo = userBudget
        ? `\nOrçamento: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(userBudget)}`
        : '';

    const message = `Olá! Não encontrei nenhum imóvel que se encaixe no que estou procurando no site.

Gostaria de saber mais sobre a assessoria completa de compra de imóveis.${userInfo}${regionsInfo}${budgetInfo}

_Mensagem enviada através do site brasilita.com_`;

    return encodeURIComponent(message);
};

export const openWhatsApp = (message: string) => {
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;

    // Tentar abrir em nova aba primeiro
    const newWindow = window.open(whatsappUrl, '_blank');

    // Se o popup foi bloqueado, usar redirecionamento direto
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = whatsappUrl;
    }
};
