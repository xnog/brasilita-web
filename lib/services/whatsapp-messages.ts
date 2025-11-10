import { Property } from "@/lib/db/schema";
import { getPropertyCode } from "@/lib/utils";

export const WHATSAPP_PHONE = "393514295913";

export const getFormattedPhoneNumber = () => {
    return `+${WHATSAPP_PHONE.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')}`;
};


export const generatePropertyNegotiationMessage = (property: Omit<Property, 'originalUrl'> & { region?: { name: string } | null }) => {
    const propertyCode = getPropertyCode(property.id);
    const propertyUrl = `${window.location.origin}/properties/${property.id}`;

    const message = `Olá! Tenho interesse em saber mais sobre este imóvel e sobre a assessoria da Brasilità.

Código: ${propertyCode}
Link: ${propertyUrl}

_Mensagem enviada através do site brasilita.com_`;

    return encodeURIComponent(message);
};


export const generateRepresentationServiceMessage = () => {
    const message = `Olá! Gostaria de saber mais sobre a assessoria completa de compra de imóveis.

_Mensagem enviada através do site brasilita.com_`;

    return encodeURIComponent(message);
};

export const generatePropertyAdvisoryMessage = () => {
    const message = `Olá! Não encontrei nenhum imóvel que se encaixe no que estou procurando no site.

Gostaria de saber mais sobre a assessoria completa de compra de imóveis.

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
