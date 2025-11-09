/**
 * Integração com Clint CRM
 */

interface ClintContact {
  name: string;
  email: string;
  ddi?: string;
  phone?: string;
  username?: string;
  fields?: Record<string, unknown>;
}

interface ClintContactUpdate {
  name?: string;
  email?: string;
  ddi?: string;
  phone?: string;
  fields?: Record<string, unknown>;
}

/**
 * Cria um contato no Clint CRM
 */
export async function createClintContact(
  name: string,
  email: string,
  phone?: string,
  customFields?: Record<string, unknown>
): Promise<{ success: boolean; contactId?: string; error?: string }> {
  try {
    const clintApiUrl = process.env.CLINT_API_URL || 'https://api.clint.digital/v1';
    const clintApiKey = process.env.CLINT_API_KEY;

    if (!clintApiKey) {
      console.warn('Clint CRM não configurado. API Key faltando.');
      return { success: false, error: 'Configuração incompleta' };
    }

    // Extrair DDI e telefone se fornecido (ex: +39 123456789 ou +55 11 98765-4321)
    let ddi: string | undefined;
    let cleanPhone: string | undefined;

    if (phone) {
      const phoneMatch = phone.match(/^\+(\d{1,3})\s*(.+)$/);
      if (phoneMatch) {
        ddi = phoneMatch[1];
        cleanPhone = phoneMatch[2].replace(/\D/g, ''); // Remove espaços, hífens, etc
      } else {
        cleanPhone = phone.replace(/\D/g, '');
      }
    }

    const contact: ClintContact = {
      name,
      email,
      ddi,
      phone: cleanPhone,
      fields: customFields || {}
    };

    // Remove campos undefined para enviar apenas o necessário
    const cleanContact = Object.fromEntries(
      Object.entries(contact).filter(([_, v]) => v !== undefined && v !== '')
    );

    const response = await fetch(`${clintApiUrl}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-token': clintApiKey
      },
      body: JSON.stringify(cleanContact)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro ao criar contato no Clint CRM:', errorData);
      return { success: false, error: errorData };
    }

    const result = await response.json();
    console.log(`Contato ${email} criado no Clint CRM com sucesso`);
    return { success: true, contactId: result.id || result.contact_id };
  } catch (error) {
    console.error('Erro ao conectar com Clint CRM:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Atualiza um contato no Clint CRM com dados de preferências
 */
export async function updateClintContactPreferences(
  email: string,
  preferences: {
    propertyType?: string;
    location?: string;
    buyerProfile?: string;
    usageType?: string;
    investmentBudget?: number | string;
    hasFinancing?: boolean;
    phone?: string;
    investmentGoal?: string;
    regions?: string[];
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    const clintApiUrl = process.env.CLINT_API_URL || 'https://api.clint.digital/v1';
    const clintApiKey = process.env.CLINT_API_KEY;

    if (!clintApiKey) {
      console.warn('Clint CRM não configurado. API Key faltando.');
      return { success: false, error: 'Configuração incompleta' };
    }

    // Primeiro, buscar o contato pelo email para obter o ID
    const searchResponse = await fetch(`${clintApiUrl}/contacts?email=${encodeURIComponent(email)}`, {
      headers: {
        'api-token': clintApiKey
      }
    });

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error('Erro ao buscar contato no Clint CRM:', searchResponse.status, errorText);
      return { success: false, error: `Erro ao buscar contato: ${searchResponse.status}` };
    }

    const responseData = await searchResponse.json();
    console.log('Resposta da busca de contato no Clint:', JSON.stringify(responseData, null, 2));

    // A resposta pode ser um array ou um objeto com data
    const contacts = Array.isArray(responseData) ? responseData : (responseData.data || []);

    if (!contacts || contacts.length === 0) {
      console.warn(`Contato ${email} não encontrado no Clint CRM. Resposta:`, responseData);
      return { success: false, error: 'Contato não encontrado' };
    }

    const contactId = contacts[0].id || contacts[0]._id || contacts[0].contact_id;

    if (!contactId) {
      console.error('ID do contato não encontrado. Objeto do contato:', contacts[0]);
      return { success: false, error: 'ID do contato não encontrado' };
    }

    // Extrair DDI e telefone se fornecido
    let ddi: string | undefined;
    let cleanPhone: string | undefined;

    if (preferences.phone) {
      const phoneMatch = preferences.phone.match(/^\+(\d{1,3})\s*(.+)$/);
      if (phoneMatch) {
        ddi = phoneMatch[1];
        cleanPhone = phoneMatch[2].replace(/\D/g, '');
      } else {
        cleanPhone = preferences.phone.replace(/\D/g, '');
      }
    }

    // Converter investmentBudget para número se for string
    const investmentBudgetValue = typeof preferences.investmentBudget === 'string'
      ? parseFloat(preferences.investmentBudget)
      : preferences.investmentBudget;

    // Atualizar o contato com as preferências no objeto fields
    // Remove campos vazios/undefined
    const fields: Record<string, unknown> = {};
    if (preferences.propertyType) fields.property_type = preferences.propertyType;
    if (preferences.location) fields.location = preferences.location;
    if (preferences.buyerProfile) fields.buyer_profile = preferences.buyerProfile;
    if (preferences.usageType) fields.usage_type = preferences.usageType;
    if (investmentBudgetValue) fields.investment_budget = investmentBudgetValue;
    if (preferences.hasFinancing !== undefined) fields.has_financing = preferences.hasFinancing;
    if (preferences.investmentGoal) fields.investment_goal = preferences.investmentGoal;
    if (preferences.regions?.length) fields.regions = preferences.regions.join(', ');

    const updateData: ClintContactUpdate = {
      ddi,
      phone: cleanPhone,
      fields
    };

    const updateResponse = await fetch(`${clintApiUrl}/contacts/${contactId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-token': clintApiKey
      },
      body: JSON.stringify(updateData)
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.text();
      console.error('Erro ao atualizar contato no Clint CRM:', errorData);
      return { success: false, error: errorData };
    }

    console.log(`Preferências do contato ${email} atualizadas no Clint CRM`);
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar contato no Clint CRM:', error);
    return { success: false, error: String(error) };
  }
}
