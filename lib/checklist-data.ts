import { ChecklistCategory, ChecklistItem } from "./db/schema";

export const checklistCategories: Omit<ChecklistCategory, "id" | "createdAt">[] = [
    {
        name: "Preparação Inicial",
        description: "Documentos e preparativos antes de iniciar a busca",
        order: 1,
    },
    {
        name: "Aspectos Legais e Fiscais",
        description: "Questões jurídicas e tributárias para brasileiros",
        order: 2,
    },
    {
        name: "Financiamento e Recursos",
        description: "Organização financeira e opções de crédito",
        order: 3,
    },
    {
        name: "Busca e Avaliação do Imóvel",
        description: "Encontrar e avaliar propriedades adequadas",
        order: 4,
    },
    {
        name: "Due Diligence",
        description: "Verificações técnicas e legais do imóvel",
        order: 5,
    },
    {
        name: "Negociação e Contrato",
        description: "Processo de compra e documentação",
        order: 6,
    },
    {
        name: "Finalização e Registro",
        description: "Conclusão da compra e registros oficiais",
        order: 7,
    },
    {
        name: "Pós-Compra",
        description: "Ações necessárias após a aquisição",
        order: 8,
    },
];

export const checklistItems: Omit<ChecklistItem, "id" | "createdAt" | "categoryId">[] = [
    // Preparação Inicial
    {
        title: "Obter Codice Fiscale",
        description: "Documento obrigatório para qualquer transação imobiliária na Itália. Pode ser obtido no consulado italiano no Brasil ou diretamente na Itália.",
        order: 1,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 7,
        resources: JSON.stringify([
            "https://consbrasilmilano.esteri.it/consolato_milano/pt/i_servizi/per_i_cittadini/codice-fiscale.html",
            "Consulado Italiano mais próximo"
        ]),
    },
    {
        title: "Traduzir e Apostilar Documentos Pessoais",
        description: "CPF, RG, certidão de nascimento/casamento traduzidos por tradutor juramentado e apostilados.",
        order: 2,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 15,
        resources: JSON.stringify([
            "Lista de tradutores juramentados",
            "Cartório para apostilamento"
        ]),
    },
    {
        title: "Abrir Conta Bancária Italiana",
        description: "Necessária para transferências e pagamentos. Alguns bancos permitem abertura à distância para não-residentes.",
        order: 3,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 10,
        resources: JSON.stringify([
            "Intesa Sanpaolo - conta para não-residentes",
            "UniCredit - serviços internacionais"
        ]),
    },
    {
        title: "Definir Orçamento Total",
        description: "Incluir preço do imóvel, impostos (2-9%), custos notariais (1-2%), comissão imobiliária (2-4%), reformas e mobiliar.",
        order: 4,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 3,
        resources: JSON.stringify([
            "Calculadora de custos imobiliários",
            "Tabela de impostos por região"
        ]),
    },

    // Aspectos Legais e Fiscais
    {
        title: "Consultar Advogado Especializado",
        description: "Essencial ter assessoria jurídica especializada em direito imobiliário italiano e questões fiscais para brasileiros.",
        order: 1,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 5,
        resources: JSON.stringify([
            "Ordem dos Advogados da Itália",
            "Advogados brasileiros na Itália"
        ]),
    },
    {
        title: "Entender Regime Tributário",
        description: "Verificar implicações fiscais no Brasil e na Itália, incluindo imposto de renda, ITBI italiano, e possível dupla tributação.",
        order: 2,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 7,
        resources: JSON.stringify([
            "Acordo Brasil-Itália contra dupla tributação",
            "Consultor fiscal especializado"
        ]),
    },
    {
        title: "Verificar Restrições para Estrangeiros",
        description: "Algumas regiões têm restrições específicas para compradores não-residentes ou certas nacionalidades.",
        order: 3,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 3,
        resources: JSON.stringify([
            "Regulamentações regionais",
            "Consulado italiano"
        ]),
    },
    {
        title: "Planejar Estrutura de Propriedade",
        description: "Decidir se comprar como pessoa física ou jurídica, considerando aspectos fiscais e sucessórios.",
        order: 4,
        propertyTypes: JSON.stringify(["commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["long_rental", "short_rental"]),
        isOptional: true,
        estimatedDays: 10,
        resources: JSON.stringify([
            "Consultor fiscal",
            "Advogado especializado em estruturas societárias"
        ]),
    },

    // Financiamento e Recursos
    {
        title: "Avaliar Opções de Financiamento",
        description: "Bancos italianos oferecem hipotecas para não-residentes (geralmente 50-80% do valor). Comparar taxas e condições.",
        order: 1,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: true,
        estimatedDays: 14,
        resources: JSON.stringify([
            "Intesa Sanpaolo - hipotecas",
            "UniCredit - financiamento imobiliário",
            "Corretor de hipotecas"
        ]),
    },
    {
        title: "Organizar Comprovação de Renda",
        description: "Declarações de IR, extratos bancários, comprovantes de renda traduzidos e apostilados para financiamento.",
        order: 2,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: true,
        estimatedDays: 10,
        resources: JSON.stringify([
            "Tradutor juramentado",
            "Contador brasileiro"
        ]),
    },
    {
        title: "Planejar Transferência de Recursos",
        description: "Organizar remessa internacional, considerando IOF, spread cambial e regulamentações do Banco Central.",
        order: 3,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 5,
        resources: JSON.stringify([
            "Banco Central - regulamentações",
            "Casas de câmbio especializadas",
            "Wise, Remitly para transferências"
        ]),
    },

    // Busca e Avaliação do Imóvel
    {
        title: "Definir Critérios de Busca",
        description: "Localização, tipo de imóvel, tamanho, características específicas, proximidade a serviços e transporte.",
        order: 1,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 3,
        resources: JSON.stringify([
            "Idealista.it",
            "Immobiliare.it",
            "Casa.it"
        ]),
    },
    {
        title: "Pesquisar Mercado Imobiliário Local",
        description: "Entender preços por m², tendências do mercado, valorização histórica e perspectivas da região.",
        order: 2,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 7,
        resources: JSON.stringify([
            "OMI - Osservatorio Mercato Immobiliare",
            "Relatórios de mercado Nomisma",
            "Tecnocasa market reports"
        ]),
    },
    {
        title: "Contratar Agente Imobiliário Local",
        description: "Profissional que conhece o mercado local, pode acessar propriedades exclusivas e auxiliar na negociação.",
        order: 3,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: true,
        estimatedDays: 5,
        resources: JSON.stringify([
            "FIMAA - Federação Italiana Mediadores",
            "Remax Itália",
            "Coldwell Banker Itália"
        ]),
    },
    {
        title: "Visitar Propriedades",
        description: "Agendar visitas presenciais ou virtuais, fazer lista de prós e contras, tirar fotos e fazer anotações detalhadas.",
        order: 4,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 14,
        resources: JSON.stringify([
            "Checklist para visitas",
            "Apps de medição (MagicPlan)"
        ]),
    },

    // Due Diligence
    {
        title: "Verificar Documentação do Imóvel",
        description: "Visura catastale, planimetria, certificado energético, conformidade urbanística, ausência de hipotecas.",
        order: 1,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 7,
        resources: JSON.stringify([
            "Agenzia delle Entrate - visure",
            "Notário para verificação"
        ]),
    },
    {
        title: "Inspeção Técnica do Imóvel",
        description: "Contratar engenheiro para avaliar estrutura, instalações, necessidade de reformas e estimativa de custos.",
        order: 2,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 5,
        resources: JSON.stringify([
            "Ordem dos Engenheiros local",
            "Empresas de inspeção predial"
        ]),
    },
    {
        title: "Verificar Situação Condominial",
        description: "Para apartamentos: verificar atas de reuniões, obras previstas, taxa condominial, regulamento interno.",
        order: 3,
        propertyTypes: JSON.stringify(["residential", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: true,
        estimatedDays: 3,
        resources: JSON.stringify([
            "Administrador do condomínio",
            "Últimas 3 atas de reunião"
        ]),
    },
    {
        title: "Avaliar Potencial de Renda",
        description: "Para investimento: pesquisar preços de aluguel na região, taxa de ocupação, custos operacionais.",
        order: 4,
        propertyTypes: JSON.stringify(["investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 5,
        resources: JSON.stringify([
            "Airbnb para short rental",
            "Immobiliare.it para long rental",
            "Calculadora de ROI"
        ]),
    },

    // Negociação e Contrato
    {
        title: "Fazer Oferta de Compra",
        description: "Proposta formal por escrito, incluindo preço, condições, prazo para resposta e eventuais contingências.",
        order: 1,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 2,
        resources: JSON.stringify([
            "Modelo de proposta de compra",
            "Agente imobiliário"
        ]),
    },
    {
        title: "Assinar Compromesso de Compra e Venda",
        description: "Contrato preliminar com sinal (caparra), condições suspensivas, prazo para escritura definitiva.",
        order: 2,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 3,
        resources: JSON.stringify([
            "Advogado para revisão",
            "Notário para orientações"
        ]),
    },
    {
        title: "Organizar Financiamento (se aplicável)",
        description: "Finalizar aprovação do empréstimo, assinar contratos bancários, organizar garantias necessárias.",
        order: 3,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: true,
        estimatedDays: 21,
        resources: JSON.stringify([
            "Banco financiador",
            "Corretor de seguros para apólice"
        ]),
    },
    {
        title: "Contratar Seguro do Imóvel",
        description: "Seguro obrigatório para financiamento, recomendado sempre. Cobertura contra incêndio, danos e responsabilidade civil.",
        order: 4,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 3,
        resources: JSON.stringify([
            "Generali Seguros",
            "Allianz Itália",
            "Corretor de seguros local"
        ]),
    },

    // Finalização e Registro
    {
        title: "Escolher e Reunir com Notário",
        description: "Profissional responsável pela escritura definitiva. Verificar documentos, calcular impostos, agendar ato.",
        order: 1,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 7,
        resources: JSON.stringify([
            "Conselho Nacional do Notariado",
            "Notários especializados em imóveis"
        ]),
    },
    {
        title: "Realizar Escritura Definitiva",
        description: "Assinatura do ato de compra e venda, pagamento do saldo, entrega das chaves, registro da propriedade.",
        order: 2,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 1,
        resources: JSON.stringify([
            "Notário escolhido",
            "Documentos de identidade atualizados"
        ]),
    },
    {
        title: "Pagar Impostos e Taxas",
        description: "Imposto de registro (2-9% dependendo do caso), IVA se aplicável, taxa notarial, taxa de registro.",
        order: 3,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 1,
        resources: JSON.stringify([
            "Agenzia delle Entrate",
            "Tabela de impostos atualizada"
        ]),
    },
    {
        title: "Obter Cópias Autenticadas",
        description: "Guardar cópias autenticadas da escritura, recibos de pagamento, documentos do imóvel para futuras necessidades.",
        order: 4,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 2,
        resources: JSON.stringify([
            "Cartório notarial",
            "Arquivo digital seguro"
        ]),
    },

    // Pós-Compra
    {
        title: "Transferir Utilitários",
        description: "Água, luz, gás, internet, telefone para seu nome. Verificar leituras e débitos pendentes.",
        order: 1,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 5,
        resources: JSON.stringify([
            "Enel (energia)",
            "Eni Gas e Luce",
            "TIM, Vodafone (telecomunicações)"
        ]),
    },
    {
        title: "Registrar no Município",
        description: "Comunicar mudança de propriedade, verificar obrigações municipais, impostos locais (IMU, TARI).",
        order: 2,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 3,
        resources: JSON.stringify([
            "Prefeitura local",
            "Portal online do município"
        ]),
    },
    {
        title: "Organizar Gestão do Imóvel",
        description: "Para investimento: contratar administradora, definir estratégia de locação, preparar documentos para inquilinos.",
        order: 3,
        propertyTypes: JSON.stringify(["investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 10,
        resources: JSON.stringify([
            "Empresas de gestão imobiliária",
            "Plataformas de aluguel por temporada"
        ]),
    },
    {
        title: "Atualizar Declarações Fiscais",
        description: "Informar aquisição na declaração de IR brasileira e italiana (se aplicável), cumprir obrigações fiscais.",
        order: 4,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: false,
        estimatedDays: 7,
        resources: JSON.stringify([
            "Contador brasileiro",
            "Consultor fiscal italiano",
            "Receita Federal - declaração de bens no exterior"
        ]),
    },
    {
        title: "Planejar Manutenção",
        description: "Criar cronograma de manutenção preventiva, identificar fornecedores locais, organizar fundos para reparos.",
        order: 5,
        propertyTypes: JSON.stringify(["residential", "commercial", "investment"]),
        buyerProfiles: JSON.stringify(["resident", "italian_citizen", "foreign_non_resident"]),
        usageTypes: JSON.stringify(["personal_use", "long_rental", "short_rental"]),
        isOptional: true,
        estimatedDays: 5,
        resources: JSON.stringify([
            "Fornecedores locais",
            "Apps de manutenção predial"
        ]),
    },
];