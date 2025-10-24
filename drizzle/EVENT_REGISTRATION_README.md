# Event Registration Schema

## Descrição
Tabela extensível para registrar inscrições em eventos diversos (webinars, workshops, lançamentos, etc.).

## Estrutura da Tabela

```sql
CREATE TABLE "event_registration" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text,
  "event_name" text NOT NULL,           -- Nome do evento para identificação
  "event_date" timestamp NOT NULL,      -- Data/hora do evento
  "registered_at" timestamp DEFAULT now() NOT NULL,
  "attended" boolean DEFAULT false,     -- Se o usuário compareceu
  "source" text DEFAULT 'event'         -- Origem da inscrição
);
```

## Campos

### `event_name` (text, obrigatório)
Identificador único do evento. Use um padrão consistente.

**Exemplos:**
- `insider-launch-nov-2025`
- `webinar-compra-imoveis-jan-2026`
- `workshop-cidadania-italiana-mar-2026`

### `event_date` (timestamp, obrigatório)
Data e hora exatas do evento.

**Formato:** ISO 8601 com timezone
**Exemplo:** `2025-11-02T16:00:00-03:00`

### `source` (text, opcional)
Origem da inscrição para rastrear canais de conversão.

**Exemplos:**
- `landing-page-insider`
- `email-campaign-nov`
- `instagram-ad`
- `facebook-organic`

## Uso

### Criar nova inscrição

```typescript
await db.insert(eventRegistration).values({
    id: nanoid(),
    name: "João Silva",
    email: "joao@example.com",
    phone: "+5511999999999",
    eventName: "insider-launch-nov-2025",
    eventDate: "2025-11-02T16:00:00-03:00",
    source: "landing-page-insider",
});
```

### Buscar inscrições por evento

```typescript
const registrations = await db
    .select()
    .from(eventRegistration)
    .where(sql`${eventRegistration.eventName} = 'insider-launch-nov-2025'`);
```

### Buscar inscrições por data

```typescript
const registrations = await db
    .select()
    .from(eventRegistration)
    .where(sql`${eventRegistration.eventDate} >= ${startDate} AND ${eventRegistration.eventDate} <= ${endDate}`);
```

### Marcar presença

```typescript
await db
    .update(eventRegistration)
    .set({ attended: true })
    .where(sql`${eventRegistration.id} = ${registrationId}`);
```

## API Endpoints

### POST `/api/event-registration`
Criar nova inscrição.

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "+5511999999999",
  "eventDate": "2025-11-02T16:00:00-03:00",
  "eventName": "insider-launch-nov-2025"
}
```

### GET `/api/event-registration?eventName=insider-launch-nov-2025`
Buscar inscrições de um evento específico.

### GET `/api/event-registration`
Buscar todas as inscrições.

## Migrations

- **0024**: Criação inicial da tabela
- **0025**: Adição do campo `event_name` e atualização do default de `source`

## Extensibilidade

Esta tabela foi projetada para ser reutilizável em diferentes eventos:

1. ✅ **Eventos únicos**: Webinars, workshops, lançamentos
2. ✅ **Séries de eventos**: Use sufixos como `-jan-2026`, `-fev-2026`
3. ✅ **Rastreamento de origem**: Campo `source` para analytics
4. ✅ **Controle de presença**: Campo `attended` para follow-up

## Exemplo de Uso para Novos Eventos

Para criar uma landing page de um novo webinar:

1. Criar a página em `/app/webinar-xyz/page.tsx`
2. No formulário, passar:
   ```typescript
   eventName: "webinar-xyz-jan-2026"
   eventDate: "2026-01-15T19:00:00-03:00"
   ```
3. A mesma API e schema funcionarão automaticamente!

## Considerações

- **Não confundir com `user` table**: Esta tabela é para eventos temporários
- **GDPR/LGPD**: Considere política de retenção de dados
- **Email/WhatsApp**: TODOs na API para envio automático de confirmações

