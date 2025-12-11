/**
 * Definições das 24 etapas padronizadas do processo de compra
 */
export const PURCHASE_JOURNEY_STEPS = [
    {
        stepNumber: 1,
        title: "Reunião Online e Definição de Critérios",
        description: "Alinhamento inicial para entender o perfil do cliente e as necessidades do imóvel.",
        uploadRequired: false,
    },
    {
        stepNumber: 2,
        title: "Preenchimento do Formulário",
        description: "Coleta de dados detalhados para formalizar o perfil e os requisitos de busca.",
        uploadRequired: false,
    },
    {
        stepNumber: 3,
        title: "Envio de Documentos Iniciais",
        description: "Upload de documentos de identificação essenciais (CPF, Passaporte, Codice Fiscale).",
        uploadRequired: true,
    },
    {
        stepNumber: 4,
        title: "Assinatura do Contrato de Assessoria",
        description: "Formalização do acordo de serviços de assessoria imobiliária.",
        uploadRequired: true,
    },
    {
        stepNumber: 5,
        title: "Pagamento da 1ª Parcela da Assessoria",
        description: "Comprovante de pagamento da taxa inicial dos serviços de assessoria.",
        uploadRequired: true,
    },
    {
        stepNumber: 6,
        title: "Criação do Grupo de Comunicação",
        description: "Estabelecimento de um canal de comunicação direto (ex: WhatsApp) para acompanhamento ágil.",
        uploadRequired: false,
    },
    {
        stepNumber: 7,
        title: "Início das Buscas",
        description: "A equipe de assessoria inicia a prospecção de imóveis conforme os critérios definidos.",
        uploadRequired: false,
    },
    {
        stepNumber: 8,
        title: "Apresentação de Imóveis Disponíveis",
        description: "Envio da lista e detalhes dos imóveis pré-selecionados ao cliente.",
        uploadRequired: false,
    },
    {
        stepNumber: 9,
        title: "Agendamento de Visitas",
        description: "Marcação das datas e horários para inspeção dos imóveis selecionados.",
        uploadRequired: false,
    },
    {
        stepNumber: 10,
        title: "Visita Presencial",
        description: "Realização da visita física aos imóveis (pelo cliente ou procurador).",
        uploadRequired: false,
    },
    {
        stepNumber: 11,
        title: "Apresentação de Relatório Técnico",
        description: "Entrega de análise detalhada e parecer sobre os imóveis visitados.",
        uploadRequired: true,
    },
    {
        stepNumber: 12,
        title: "Decisão de Proposta",
        description: "Confirmação do cliente sobre qual imóvel ele deseja seguir com uma proposta formal.",
        uploadRequired: false,
    },
    {
        stepNumber: 13,
        title: "Solicitação de Documentos para Proposta",
        description: "Preparação da documentação e formulários necessários junto à imobiliária.",
        uploadRequired: true,
    },
    {
        stepNumber: 14,
        title: "Assinatura da Proposta",
        description: "Assinatura eletrônica ou física da Proposta de Compra formal.",
        uploadRequired: true,
    },
    {
        stepNumber: 15,
        title: "Pagamento do Saldo da Assessoria",
        description: "Comprovante de pagamento da parcela final (50% + 1,5%) dos serviços de assessoria.",
        uploadRequired: true,
    },
    {
        stepNumber: 16,
        title: "Envio da Proposta à Imobiliária",
        description: "Submissão da proposta formalmente assinada ao agente imobiliário.",
        uploadRequired: true,
    },
    {
        stepNumber: 17,
        title: "Aceitação ou Não do Proprietário",
        description: "Acompanhamento e comunicação da resposta do proprietário do imóvel.",
        uploadRequired: false,
    },
    {
        stepNumber: 18,
        title: "Pagamento da Caparra (Sinal)",
        description: "Comprovação da transferência do valor do sinal ao proprietário.",
        uploadRequired: true,
    },
    {
        stepNumber: 19,
        title: "Pagamento da Comissão da Imobiliária",
        description: "Comprovante de pagamento da taxa de intermediação devida à imobiliária.",
        uploadRequired: true,
    },
    {
        stepNumber: 20,
        title: "Orçamento e Agendamento no Notaio",
        description: "Definição e marcação da data para a assinatura da Escritura Pública (Atto).",
        uploadRequired: false,
    },
    {
        stepNumber: 21,
        title: "Lavrar Procuração (se necessário)",
        description: "Preparação, tradução juramentada e envio da procuração para a Itália.",
        uploadRequired: true,
    },
    {
        stepNumber: 22,
        title: "Comparecimento ao Atto",
        description: "Participação na cerimônia de assinatura da Escritura perante o Notário.",
        uploadRequired: false,
    },
    {
        stepNumber: 23,
        title: "Recebimento do Rogito",
        description: "Obtenção da cópia original da Escritura Pública (Rogito).",
        uploadRequired: true,
    },
    {
        stepNumber: 24,
        title: "Transferência de Propriedade (Visura)",
        description: "Confirmação final do registro da mudança de propriedade no Catastro.",
        uploadRequired: true,
    },
] as const;

