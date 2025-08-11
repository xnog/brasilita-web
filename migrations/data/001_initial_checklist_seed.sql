-- Migration 001: Initial Checklist Seed Data
-- This represents the current state of the checklist data in production

-- Insert Categories (using existing IDs)
INSERT INTO checklist_category (id, name, description, "order", "createdAt") VALUES
('882e1b00-4cb9-4f7f-91e3-84d5a8e5b9f7', 'Avaliação e Seleção de Imóveis', 'Processo de busca, avaliação e seleção do imóvel ideal', 1, NOW()),
('0ed20fbc-212a-42fd-ba94-3278bd105bad', 'Formalização da Proposta', 'Documentação pessoal e preparação da proposta de compra', 2, NOW()),
('d858f60c-30bd-4070-8666-fe05396525ed', 'Processo de Compra', 'Procedimentos legais, notariais e finalização da compra', 3, NOW()),
('81513d98-e334-4a92-969f-c1914d69a1cd', 'Pós-Compra e Obrigações Fiscais', 'Questões tributárias e declarações após a aquisição', 4, NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Items (using existing IDs and current data structure)
INSERT INTO checklist_item (id, "categoryId", title, description, "order", "propertyTypes", "buyerProfiles", "usageTypes", "isOptional", "estimatedDays", resources, "createdAt") VALUES

-- Avaliação e Seleção de Imóveis
('495120e3-2c0d-46da-ab66-f16d91b29512', '882e1b00-4cb9-4f7f-91e3-84d5a8e5b9f7', 'Avaliar Imóveis encontrados', 'Análise detalhada dos imóveis encontrados, comparando preços, localização, estado de conservação e potencial de valorização.', 1, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', false, 5, '["OMI - Osservatorio Mercato Immobiliare", "Idealista.it", "Immobiliare.it"]', NOW()),

('4abac957-19d1-4b31-b5b1-19bf298aa442', '882e1b00-4cb9-4f7f-91e3-84d5a8e5b9f7', 'Visita/Vistoria dos Imóveis Escolhidos', 'Realizar visitas presenciais ou virtuais detalhadas dos imóveis selecionados, verificando estado de conservação, documentação e aspectos técnicos.', 2, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', false, 7, '["Checklist para visitas", "Apps de medição (MagicPlan)", "Agente imobiliário local"]', NOW()),

('1348d843-1e9b-4c73-9529-5424d1f4d6c7', '882e1b00-4cb9-4f7f-91e3-84d5a8e5b9f7', 'Definir valor da Proposta', 'Estabelecer o valor da oferta baseado na avaliação de mercado, estado do imóvel e estratégia de negociação.', 3, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', false, 2, '["OMI - Osservatorio Mercato Immobiliare", "Avaliador imobiliário", "Relatórios de mercado"]', NOW()),

('71813360-f32e-425e-8ec3-d9f5c6628d4c', '882e1b00-4cb9-4f7f-91e3-84d5a8e5b9f7', 'Verificar documentação do imóvel', 'Análise completa da documentação: visura catastale, planimetria, certificado energético, conformidade urbanística, ausência de hipotecas e ônus.', 4, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', false, 5, '["Agenzia delle Entrate - visuras", "Notário para verificação", "Advogado especializado"]', NOW()),

-- Formalização da Proposta
('a4be46bc-cc6e-4403-9974-ecdf961f7e64', '0ed20fbc-212a-42fd-ba94-3278bd105bad', 'Formalizar proposta', 'Elaborar e apresentar proposta formal de compra por escrito, incluindo preço, condições, prazo para resposta e eventuais contingências.', 1, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', false, 2, '["Modelo de proposta de compra", "Agente imobiliário", "Advogado para revisão"]', NOW()),

('09b52d83-c25c-4c08-a724-d5b3e7e30d33', '0ed20fbc-212a-42fd-ba94-3278bd105bad', 'Codice Fiscale', 'Obter o Codice Fiscale, documento obrigatório para qualquer transação imobiliária na Itália. Pode ser obtido no consulado italiano no Brasil ou diretamente na Itália.', 2, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', false, 5, '["https://consbrasilmilano.esteri.it/consolato_milano/pt/i_servicos/per_i_cittadini/codice-fiscale.html", "Consulado Italiano mais próximo", "Agenzia delle Entrate"]', NOW()),

('508f1f96-f711-479c-8970-7f040cb1784f', '0ed20fbc-212a-42fd-ba94-3278bd105bad', 'Planejar transferência de recursos', 'Organizar remessa internacional dos recursos necessários, considerando IOF, spread cambial, regulamentações do Banco Central e documentação comprobatória.', 3, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', false, 7, '["Banco Central - regulamentações", "Casas de câmbio especializadas", "Wise, Remitly para transferências", "Conta bancária italiana"]', NOW()),

-- Processo de Compra
('6962d718-ef68-4628-9213-5fe0fb5ff5e8', 'd858f60c-30bd-4070-8666-fe05396525ed', 'Procuração ou Passagens Aérea', 'Decidir se fará a compra pessoalmente (organizar viagem) ou através de procuração (preparar documentação para representante legal).', 1, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', false, 10, '["Consulado Italiano para procuração", "Advogado para representação", "Companhias aéreas", "Tradutor juramentado"]', NOW()),

('0eef0c2c-be08-4d0d-bcf5-c28a88c211c6', 'd858f60c-30bd-4070-8666-fe05396525ed', 'Agendar Notaio', 'Escolher e agendar reunião com o notário responsável pela escritura definitiva. Verificar documentos necessários e calcular custos.', 2, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', false, 5, '["Conselho Nacional do Notariado", "Notários especializados em imóveis", "Lista de documentos necessários"]', NOW()),

('d90ba4c3-137a-4726-88fd-c1d7c3f010a2', 'd858f60c-30bd-4070-8666-fe05396525ed', 'Atto', 'Realizar a escritura definitiva (atto di compravendita) - assinatura do ato de compra e venda, pagamento do saldo e registro da propriedade.', 3, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', false, 1, '["Notário escolhido", "Documentos de identidade atualizados", "Comprovante de transferência dos recursos"]', NOW()),

('8c2324bf-d087-4a3f-ad43-e09399f971ff', 'd858f60c-30bd-4070-8666-fe05396525ed', 'Transferência de titularidade do contrato de aluguel (se alugado)', 'Se o imóvel possui inquilinos, organizar a transferência da titularidade do contrato de locação e verificar direitos e obrigações.', 4, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', true, 3, '["Advogado especializado em locações", "Contrato de locação vigente", "Comunicação aos inquilinos"]', NOW()),

('854d5c00-1792-4382-bc3c-e335af717531', 'd858f60c-30bd-4070-8666-fe05396525ed', 'Cópia da escritura/rogito', 'Obter e guardar cópias autenticadas da escritura (rogito), recibos de pagamento e todos os documentos do imóvel para futuras necessidades.', 5, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', false, 2, '["Cartório notarial", "Arquivo digital seguro", "Cópias físicas autenticadas"]', NOW()),

-- Pós-Compra e Obrigações Fiscais
('3daae0a1-b0cf-442c-a445-0f6494980c40', '81513d98-e334-4a92-969f-c1914d69a1cd', 'Orientar/planejar pagamento de IMU, Cedolare Secca', 'Compreender e organizar o pagamento dos impostos municipais (IMU) e opção pela cedolare secca para rendimentos de aluguel, se aplicável.', 1, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', false, 5, '["Prefeitura local - IMU", "Agenzia delle Entrate", "Consultor fiscal especializado", "Calculadora de impostos municipais"]', NOW()),

('217eb03b-065b-4441-adc0-5493aebd8584', '81513d98-e334-4a92-969f-c1914d69a1cd', 'Declaração de IR', 'Cumprir obrigações fiscais tanto no Brasil quanto na Itália: informar aquisição na declaração de IR brasileira e italiana (se aplicável), considerando acordo contra dupla tributação.', 2, '["residential", "commercial", "investment"]', '["resident", "italian_citizen", "foreign_non_resident"]', '["personal_use", "long_rental", "short_rental"]', false, 7, '["Contador brasileiro", "Consultor fiscal italiano", "Receita Federal - declaração de bens no exterior", "Acordo Brasil-Itália contra dupla tributação"]', NOW())

ON CONFLICT (id) DO NOTHING; 