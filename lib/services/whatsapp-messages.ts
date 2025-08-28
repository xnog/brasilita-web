import { Property } from "@/lib/db/schema";
import { getPropertyCode } from "@/lib/utils";

export const WHATSAPP_PHONE = "393515295913";

export const getFormattedPhoneNumber = () => {
    return `+${WHATSAPP_PHONE.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')}`;
};

export const generatePropertyVisitMessage = (property: Property & { region?: { name: string } | null }) => {
    const propertyCode = getPropertyCode(property.id);
    const propertyUrl = `${window.location.origin}/properties/${property.id}`;
    const locationText = property.location + (property.region?.name ? `, ${property.region.name}` : '');

    const message = `*Olá! Gostaria de solicitar uma visita com fotos e vídeos para este imóvel.*

*Propriedade de interesse:*
Código: ${propertyCode}
Título: ${property.title}
Localização: ${locationText}
Link: ${propertyUrl}

*Serviço solicitado:*
Visita presencial com envio de fotos detalhadas e vídeos do imóvel.

Aguardo informações sobre disponibilidade e valores deste serviço.

Obrigado!

_Mensagem enviada através do site brasilita.com_`;

    return encodeURIComponent(message);
};

export const generatePropertyNegotiationMessage = (property: Property & { region?: { name: string } | null }) => {
    const propertyCode = getPropertyCode(property.id);
    const propertyUrl = `${window.location.origin}/properties/${property.id}`;
    const locationText = property.location + (property.region?.name ? `, ${property.region.name}` : '');

    const message = `*Olá! Tenho interesse em obter mais informações sobre este imóvel.*

*Propriedade de interesse:*
Código: ${propertyCode}
Título: ${property.title}
Localização: ${locationText}
Link: ${propertyUrl}

Aguardo retorno para darmos continuidade.

_Mensagem enviada através do site brasilita.com_`;

    return encodeURIComponent(message);
};

export const generateCustomSearchFormMessage = (specificRequirements: string) => {
    const message = `*Olá! Gostaria de solicitar uma busca dedicada de imóveis.*

*Requisitos específicos:*
${specificRequirements}

*Próximos passos:*
Aguardo o contato da equipe para discutir as opções disponíveis e dar continuidade à busca.

Obrigado pela atenção!

_Mensagem enviada através do site brasilita.com_`;

    return encodeURIComponent(message);
};

export const generateCustomSearchServiceMessage = () => {
    const message = `*Olá! Gostaria de solicitar o serviço de Busca Dedicada.*

*Serviço de interesse:*
Busca Dedicada de Imóveis

*O que preciso:*
• Busca personalizada baseada no meu perfil
• Notificações automáticas de novas oportunidades
• Análise profissional do mercado italiano
• Suporte especializado durante todo o processo

Aguardo contato da equipe para discutir meus critérios específicos e dar início à busca.

Obrigado!

_Mensagem enviada através do site brasilita.com_`;

    return encodeURIComponent(message);
};

export const generatePropertyVisitServiceMessage = () => {
    const message = `*Olá! Gostaria de solicitar o serviço de Visita de Imóveis.*

*Serviço de interesse:*
Visita Profissional de Imóveis

*O que preciso:*
• Visita presencial com documentação completa
• Fotos profissionais em alta resolução
• Vídeo tour detalhado da propriedade
• Relatório técnico sobre o estado do imóvel

Aguardo contato da equipe para agendar a visita e receber informações sobre valores.

Obrigado!

_Mensagem enviada através do site brasilita.com_`;

    return encodeURIComponent(message);
};

export const generateRepresentationServiceMessage = () => {
    const message = `*Olá! Gostaria de solicitar o serviço de Representação na Compra.*

*Serviço de interesse:*
Representação Legal na Compra de Imóvel

*O que preciso:*
• Análise completa da documentação
• Acompanhamento legal durante todo o processo
• Representação no cartório notarial
• Suporte especializado em português

Aguardo contato da equipe para discutir meu caso específico e receber um orçamento personalizado.

Obrigado!

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
