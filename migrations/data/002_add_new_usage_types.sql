-- Migration 002: Add New Usage Types
-- This migration adds the new usage types (relocation, mixed_use, family_legacy) 

-- Step 1: Update existing items to include new usage types
UPDATE checklist_item 
SET "usageTypes" = '["personal_use", "long_rental", "short_rental", "relocation", "mixed_use", "family_legacy"]'
WHERE id IN (
    '495120e3-2c0d-46da-ab66-f16d91b29512', -- Avaliar Imóveis encontrados
    '4abac957-19d1-4b31-b5b1-19bf298aa442', -- Visita/Vistoria dos Imóveis Escolhidos
    '1348d843-1e9b-4c73-9529-5424d1f4d6c7', -- Definir valor da Proposta
    '71813360-f32e-425e-8ec3-d9f5c6628d4c', -- Verificar documentação do imóvel
    'a4be46bc-cc6e-4403-9974-ecdf961f7e64', -- Formalizar proposta
    '09b52d83-c25c-4c08-a724-d5b3e7e30d33', -- Codice Fiscale
    '508f1f96-f711-479c-8970-7f040cb1784f', -- Planejar transferência de recursos
    '6962d718-ef68-4628-9213-5fe0fb5ff5e8', -- Procuração ou Passagens Aérea
    '0eef0c2c-be08-4d0d-bcf5-c28a88c211c6', -- Agendar Notaio
    'd90ba4c3-137a-4726-88fd-c1d7c3f010a2', -- Atto
    '8c2324bf-d087-4a3f-ad43-e09399f971ff', -- Transferência de titularidade do contrato de aluguel
    '854d5c00-1792-4382-bc3c-e335af717531', -- Cópia da escritura/rogito
    '3daae0a1-b0cf-442c-a445-0f6494980c40', -- Orientar/planejar pagamento de IMU, Cedolare Secca
    '217eb03b-065b-4441-adc0-5493aebd8584'  -- Declaração de IR
);
