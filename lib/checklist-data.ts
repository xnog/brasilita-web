import { ChecklistCategory, ChecklistItem } from "./db/schema";

export const checklistCategories: Omit<ChecklistCategory, "id" | "createdAt">[] = [
    {
        name: "Avaliação e Seleção de Imóveis",
        description: "Processo de busca, avaliação e seleção do imóvel ideal",
        order: 1,
    },
    {
        name: "Formalização da Proposta",
        description: "Documentação pessoal e preparação da proposta de compra",
        order: 2,
    },
    {
        name: "Processo de Compra",
        description: "Procedimentos legais, notariais e finalização da compra",
        order: 3,
    },
    {
        name: "Pós-Compra e Obrigações Fiscais",
        description: "Questões tributárias e declarações após a aquisição",
        order: 4,
    },
];

export const checklistItems: Omit<ChecklistItem, "id" | "createdAt" | "categoryId">[] = [
    // Avaliação e Seleção de Imóveis
    {
        title: "Avaliar Imóveis encontrados",
        description: "Análise detalhada dos imóveis encontrados, comparando preços, localização, estado de conservação e potencial de valorização.",
        order: 1,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: false,
        estimatedDays: 5,
        resources: JSON.stringify([
            "OMI - Osservatorio Mercato Immobiliare",
            "Idealista.it",
            "Immobiliare.it"
        ]),
    },
    {
        title: "Visita/Vistoria dos Imóveis Escolhidos",
        description: "Realizar visitas presenciais ou virtuais detalhadas dos imóveis selecionados, verificando estado de conservação, documentação e aspectos técnicos.",
        order: 2,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: false,
        estimatedDays: 7,
        resources: JSON.stringify([
            "Checklist para visitas",
            "Apps de medição (MagicPlan)",
            "Agente imobiliário local"
        ]),
    },
    {
        title: "Definir valor da Proposta",
        description: "Estabelecer o valor da oferta baseado na avaliação de mercado, estado do imóvel e estratégia de negociação.",
        order: 3,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: false,
        estimatedDays: 2,
        resources: JSON.stringify([
            "OMI - Osservatorio Mercato Immobiliare",
            "Avaliador imobiliário",
            "Relatórios de mercado"
        ]),
    },
    {
        title: "Verificar documentação do imóvel",
        description: "Análise completa da documentação: visura catastale, planimetria, certificado energético, conformidade urbanística, ausência de hipotecas e ônus.",
        order: 4,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: false,
        estimatedDays: 5,
        resources: JSON.stringify([
            "Agenzia delle Entrate - visuras",
            "Notário para verificação",
            "Advogado especializado"
        ]),
    },

    // Formalização da Proposta
    {
        title: "Formalizar proposta",
        description: "Elaborar e apresentar proposta formal de compra por escrito, incluindo preço, condições, prazo para resposta e eventuais contingências.",
        order: 1,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: false,
        estimatedDays: 2,
        resources: JSON.stringify([
            "Modelo de proposta de compra",
            "Agente imobiliário",
            "Advogado para revisão"
        ]),
    },
    {
        title: "Codice Fiscale",
        description: "Obter o Codice Fiscale, documento obrigatório para qualquer transação imobiliária na Itália. Pode ser obtido no consulado italiano no Brasil ou diretamente na Itália.",
        order: 2,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: false,
        estimatedDays: 5,
        resources: JSON.stringify([
            "https://consbrasilmilano.esteri.it/consolato_milano/pt/i_servicos/per_i_cittadini/codice-fiscale.html",
            "Consulado Italiano mais próximo",
            "Agenzia delle Entrate"
        ]),
    },
    {
        title: "Planejar transferência de recursos",
        description: "Organizar remessa internacional dos recursos necessários, considerando IOF, spread cambial, regulamentações do Banco Central e documentação comprobatória.",
        order: 3,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: false,
        estimatedDays: 7,
        resources: JSON.stringify([
            "Banco Central - regulamentações",
            "Casas de câmbio especializadas",
            "Wise, Remitly para transferências",
            "Conta bancária italiana"
        ]),
    },

    // Processo de Compra
    {
        title: "Procuração ou Passagens Aérea",
        description: "Decidir se fará a compra pessoalmente (organizar viagem) ou através de procuração (preparar documentação para representante legal).",
        order: 1,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: false,
        estimatedDays: 10,
        resources: JSON.stringify([
            "Consulado Italiano para procuração",
            "Advogado para representação",
            "Companhias aéreas",
            "Tradutor juramentado"
        ]),
    },
    {
        title: "Agendar Notaio",
        description: "Escolher e agendar reunião com o notário responsável pela escritura definitiva. Verificar documentos necessários e calcular custos.",
        order: 2,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: false,
        estimatedDays: 5,
        resources: JSON.stringify([
            "Conselho Nacional do Notariado",
            "Notários especializados em imóveis",
            "Lista de documentos necessários"
        ]),
    },
    {
        title: "Atto",
        description: "Realizar a escritura definitiva (atto di compravendita) - assinatura do ato de compra e venda, pagamento do saldo e registro da propriedade.",
        order: 3,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: false,
        estimatedDays: 1,
        resources: JSON.stringify([
            "Notário escolhido",
            "Documentos de identidade atualizados",
            "Comprovante de transferência dos recursos"
        ]),
    },
    {
        title: "Transferência de titularidade do contrato de aluguel (se alugado)",
        description: "Se o imóvel possui inquilinos, organizar a transferência da titularidade do contrato de locação e verificar direitos e obrigações.",
        order: 4,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: true,
        estimatedDays: 3,
        resources: JSON.stringify([
            "Advogado especializado em locações",
            "Contrato de locação vigente",
            "Comunicação aos inquilinos"
        ]),
    },
    {
        title: "Cópia da escritura/rogito",
        description: "Obter e guardar cópias autenticadas da escritura (rogito), recibos de pagamento e todos os documentos do imóvel para futuras necessidades.",
        order: 5,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: false,
        estimatedDays: 2,
        resources: JSON.stringify([
            "Cartório notarial",
            "Arquivo digital seguro",
            "Cópias físicas autenticadas"
        ]),
    },

    // Pós-Compra e Obrigações Fiscais
    {
        title: "Orientar/planejar pagamento de IMU, Cedolare Secca",
        description: "Compreender e organizar o pagamento dos impostos municipais (IMU) e opção pela cedolare secca para rendimentos de aluguel, se aplicável.",
        order: 1,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: false,
        estimatedDays: 5,
        resources: JSON.stringify([
            "Prefeitura local - IMU",
            "Agenzia delle Entrate",
            "Consultor fiscal especializado",
            "Calculadora de impostos municipais"
        ]),
    },
    {
        title: "Declaração de IR",
        description: "Cumprir obrigações fiscais tanto no Brasil quanto na Itália: informar aquisição na declaração de IR brasileira e italiana (se aplicável), considerando acordo contra dupla tributação.",
        order: 2,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]),
        isOptional: false,
        estimatedDays: 7,
        resources: JSON.stringify([
            "Contador brasileiro",
            "Consultor fiscal italiano",
            "Receita Federal - declaração de bens no exterior",
            "Acordo Brasil-Itália contra dupla tributação"
        ]),
    },

    // Itens específicos para Aluguel por Temporada (Airbnb)
    {
        title: "Licenças para Aluguel por Temporada",
        description: "Obter autorizações municipais necessárias para operar como aluguel por temporada (CIN, SCIA, etc.) e registrar-se nas plataformas digitais.",
        order: 3,
        propertyTypes: JSON.stringify(["residential", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["short_rental", "mixed_use"]),
        isOptional: false,
        estimatedDays: 15,
        resources: JSON.stringify([
            "Prefeitura local - licenças turísticas",
            "Airbnb, Booking.com - cadastro",
            "Consultor especializado em turismo",
            "SCIA - Segnalazione Certificata di Inizio Attività"
        ]),
    },
    {
        title: "Mobiliário e Equipamentos para Turismo",
        description: "Planejar e adquirir mobiliário, eletrodomésticos e equipamentos adequados para receber hóspedes, considerando segurança e conforto.",
        order: 4,
        propertyTypes: JSON.stringify(["residential", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["short_rental", "mixed_use"]),
        isOptional: true,
        estimatedDays: 20,
        resources: JSON.stringify([
            "IKEA, Maisons du Monde - mobiliário",
            "Empresas de design de interiores",
            "Fornecedores de equipamentos hoteleiros",
            "Seguros para propriedades turísticas"
        ]),
    },

    // Itens específicos para Mudança Definitiva
    {
        title: "Visto de Residência / Permesso di Soggiorno",
        description: "Solicitar visto apropriado ou permesso di soggiorno para residir legalmente na Itália, considerando seu status de cidadania.",
        order: 3,
        propertyTypes: JSON.stringify(["residential"]),
        buyerProfiles: JSON.stringify(["foreign_non_resident"]),
        usageTypes: JSON.stringify(["relocation"]),
        isOptional: false,
        estimatedDays: 30,
        resources: JSON.stringify([
            "Consulado Italiano no Brasil",
            "Questura italiana - permesso di soggiorno",
            "Advogado de imigração",
            "Documentação de renda/aposentadoria"
        ]),
    },
    {
        title: "Transferência de Serviços e Contas",
        description: "Organizar transferência de contas bancárias, seguros, serviços médicos e outros serviços essenciais para a Itália.",
        order: 4,
        propertyTypes: JSON.stringify(["residential"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["relocation"]),
        isOptional: true,
        estimatedDays: 15,
        resources: JSON.stringify([
            "Bancos italianos para abertura de conta",
            "Sistema de saúde italiano (SSN)",
            "Seguros residenciais e de saúde",
            "Empresas de mudança internacional"
        ]),
    },

    // Itens específicos para Patrimônio Familiar
    {
        title: "Planejamento Sucessório Internacional",
        description: "Estruturar documentação legal para sucessão considerando leis brasileiras e italianas, incluindo testamento internacional.",
        order: 3,
        propertyTypes: JSON.stringify(["residential", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["family_legacy"]),
        isOptional: true,
        estimatedDays: 20,
        resources: JSON.stringify([
            "Advogado especializado em sucessões internacionais",
            "Notário para testamento internacional",
            "Consultor fiscal especializado",
            "Acordo Brasil-Itália sobre sucessões"
        ]),
    },
    {
        title: "Documentação para Cidadania Italiana (descendentes)",
        description: "Organizar documentação necessária para que descendentes possam solicitar cidadania italiana no futuro.",
        order: 4,
        propertyTypes: JSON.stringify(["residential", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["family_legacy"]),
        isOptional: true,
        estimatedDays: 10,
        resources: JSON.stringify([
            "Consulado Italiano - documentação",
            "Cartórios para certidões",
            "Tradutores juramentados",
            "Advogados especializados em cidadania"
        ]),
    },
];