/**
 * Integração com Listmonk - Sistema de email marketing
 */

interface ListmonkSubscriber {
  email: string;
  name: string;
  status?: 'enabled' | 'disabled' | 'blocklisted';
  lists?: number[];
  attribs?: Record<string, unknown>;
}

/**
 * Adiciona um subscriber à lista "Brasilità" no Listmonk
 */
export async function addSubscriberToListmonk(
  email: string,
  name: string,
  additionalAttributes?: Record<string, unknown>
): Promise<{ success: boolean; error?: string }> {
  try {
    const listmonkUrl = process.env.LISTMONK_URL;
    const listmonkApiUser = process.env.LISTMONK_API_USER;
    const listmonkApiKey = process.env.LISTMONK_API_KEY;
    const listmonkListId = process.env.LISTMONK_LIST_ID; // ID da lista "Brasilità"

    if (!listmonkUrl || !listmonkApiUser || !listmonkApiKey || !listmonkListId) {
      console.warn('Listmonk não configurado. Variáveis de ambiente faltando.');
      return { success: false, error: 'Configuração incompleta' };
    }

    const subscriber: ListmonkSubscriber = {
      email,
      name,
      status: 'enabled',
      lists: [parseInt(listmonkListId)],
      attribs: additionalAttributes || {}
    };

    const response = await fetch(`${listmonkUrl}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `token ${listmonkApiUser}:${listmonkApiKey}`
      },
      body: JSON.stringify(subscriber)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro ao adicionar subscriber ao Listmonk:', errorData);
      return { success: false, error: errorData };
    }

    console.log(`Subscriber ${email} adicionado ao Listmonk com sucesso`);
    return { success: true };
  } catch (error) {
    console.error('Erro ao conectar com Listmonk:', error);
    return { success: false, error: String(error) };
  }
}
