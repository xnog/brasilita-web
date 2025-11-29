# Workflows N8N - Sistema de Emails Brasilità

Este diretório contém os workflows N8N para automação de emails da plataforma Brasilità.

## 📧 Workflows Disponíveis

### 1. Email Semanal de Sugestões (`n8n-weekly-suggestions.json`)
**Frequência:** Toda segunda-feira às 9h
**Descrição:** Envia até 3 sugestões de imóveis para cada usuário baseado em suas preferências.

**Como funciona:**
1. Busca todos os usuários com perfis configurados (paginado, 50 por página)
2. Para cada usuário:
   - Chama POST `/api/emails/weekly-suggestions/send` com `{ userId }`
   - A API busca até 3 imóveis dos últimos 7 dias
   - Se houver imóveis, renderiza e envia via AWS SES (nodemailer)
   - Se não houver, retorna `sent: false` sem enviar
3. Aguarda 1 segundo entre cada envio (rate limiting)
4. Processa todas as páginas até não haver mais usuários

### 2. Email Diário de Alertas (`n8n-daily-alerts.json`)
**Frequência:** Diariamente às 10h
**Descrição:** Envia notificações de novos imóveis que atendem aos alertas configurados pelos usuários.

**Como funciona:**
1. Busca todos os alertas ativos (paginado, 50 por página)
2. Para cada alerta:
   - Chama POST `/api/emails/daily-alerts/send` com `{ alertId }`
   - A API busca imóveis das últimas 24h que atendem aos filtros
   - Se houver imóveis, renderiza email com até 10 propriedades e envia via AWS SES
   - Se não houver, retorna `sent: false` sem enviar
   - Atualiza `lastProcessedAt` do alerta
3. Aguarda 1 segundo entre cada envio (rate limiting)
4. Processa todas as páginas até não haver mais alertas

## 🔧 Configuração no N8N

### 1. Variáveis de Ambiente na Aplicação
Configure no `.env` da aplicação Next.js:

```bash
# Email API Secret (para autenticação do n8n)
EMAIL_API_SECRET_KEY="your-secret-key"

# AWS SES SMTP (para envio de emails via nodemailer)
SMTP_HOST="email-smtp.us-east-1.amazonaws.com"
SMTP_USER="seu-smtp-username"
SMTP_PASSWORD="sua-smtp-password"
```

**Como obter credenciais AWS SES SMTP:**
1. Acesse o console AWS SES
2. Vá em "SMTP Settings"
3. Clique em "Create SMTP Credentials"
4. Copie o SMTP Username e Password
5. Use essas credenciais nas variáveis de ambiente

### 2. Credenciais no N8N
Configure uma credencial do tipo "Header Auth" no N8N:
- **Name:** `Brasilita API`
- **Header Name:** `x-api-key`
- **Header Value:** Mesmo valor de `EMAIL_API_SECRET_KEY` do .env

### 3. Importar Workflows

1. Acesse N8N
2. Clique em "Add Workflow"
3. Clique em "Import from File"
4. Selecione o arquivo JSON correspondente
5. Configure a credencial "Brasilita API" nos nodes HTTP Request
6. Ative o workflow

**Nota:** Agora não é mais necessário configurar credenciais AWS no n8n! O envio de email é feito pela API Next.js usando nodemailer.

### 4. Ajustar URLs

Nos workflows, procure por `https://brasilita.com` e substitua pela URL correta da sua aplicação:
- Produção: `https://brasilita.com`
- Staging: `https://staging.brasilita.com`
- Dev: `http://localhost:3000`

## 📊 Endpoints da API

### Email Semanal

**Listar usuários:**
```bash
GET /api/emails/weekly-suggestions/users
Headers: x-api-key: your-secret-key
```

**Renderizar email (apenas visualizar):**
```bash
GET /api/emails/weekly-suggestions/render?userId=xxx
Headers: x-api-key: your-secret-key
```

**Renderizar E enviar email (usado pelo n8n):**
```bash
POST /api/emails/weekly-suggestions/send
Headers: x-api-key: your-secret-key
Content-Type: application/json

{
  "userId": "uuid-do-usuario"
}

# Response (com imóveis):
{
  "success": true,
  "sent": true,
  "userId": "uuid",
  "userEmail": "user@example.com",
  "propertiesCount": 3,
  "messageId": "<ses-message-id>"
}

# Response (sem imóveis - não envia):
{
  "success": true,
  "sent": false,
  "userId": "uuid",
  "propertiesCount": 0,
  "message": "No properties found for this user - email not sent"
}
```

### Email de Alertas

**Listar alertas ativos:**
```bash
GET /api/emails/daily-alerts/alerts
Headers: x-api-key: your-secret-key
```

**Renderizar email (apenas visualizar):**
```bash
GET /api/emails/daily-alerts/render?alertId=xxx
Headers: x-api-key: your-secret-key
```

**Renderizar E enviar email (usado pelo n8n):**
```bash
POST /api/emails/daily-alerts/send
Headers: x-api-key: your-secret-key
Content-Type: application/json

{
  "alertId": "uuid-do-alerta"
}

# Response (com imóveis):
{
  "success": true,
  "sent": true,
  "alertId": "uuid",
  "alertName": "Nome do Alerta",
  "userId": "uuid",
  "userEmail": "user@example.com",
  "propertiesCount": 5,
  "messageId": "<ses-message-id>"
}

# Response (sem imóveis - não envia):
{
  "success": true,
  "sent": false,
  "alertId": "uuid",
  "propertiesCount": 0,
  "message": "No new properties found for this alert - email not sent"
}
```

## 🧪 Testando Localmente

### 1. Preview dos Templates de Email

```bash
npm run email:dev
```

Acesse http://localhost:3001 para visualizar os templates no preview server do react-email.

### 2. Testar Endpoints

```bash
# Adicione a API key no .env.local
EMAIL_API_SECRET_KEY=your-test-key

# Teste listar usuários
curl -H "x-api-key: your-test-key" \
  http://localhost:3000/api/emails/weekly-suggestions/users

# Teste renderizar email
curl -H "x-api-key: your-test-key" \
  "http://localhost:3000/api/emails/weekly-suggestions/render?userId=xxx"
```

## 📝 Notas Importantes

### Arquitetura Simplificada
- ✅ **n8n:** Apenas orquestra chamadas HTTP POST para a API
- ✅ **API Next.js:** Faz render + envio via nodemailer (SMTP)
- ✅ **AWS SES SMTP:** Envia emails sem limite de tamanho de body
- ❌ **Erro 414 resolvido:** Não usa mais GET com query strings gigantes

### Performance
- Workflows processam em lotes de 50 para evitar sobrecarga
- Rate limiting de 1 segundo entre envios
- Emails só são enviados se houver conteúdo relevante
- API retorna `sent: false` quando não há imóveis (economiza recursos)

### Segurança
- API Key obrigatória em todos os endpoints
- Middleware valida autenticação antes de processar
- Não expõe dados sensíveis dos usuários
- Credenciais AWS SES ficam apenas no servidor Next.js

### Monitoramento
- N8N registra todas as execuções
- API loga cada email enviado com `messageId`
- Verifique logs em caso de erros
- Email semanal: espere ~1min por lote de 50 usuários
- Email diário: espere ~1min por lote de 50 alertas

### Manutenção
- Revisar logs semanalmente
- Verificar taxa de bounce/rejeição
- Ajustar horários se necessário
- Monitorar performance dos endpoints

## 🐛 Troubleshooting

**Emails não estão sendo enviados:**
1. Verifique se o workflow está ativo no n8n
2. Confirme credenciais AWS SES SMTP no `.env` da aplicação
3. Verifique se o email remetente está verificado no AWS SES
4. Verifique API key no n8n
5. Revise logs de execução do N8N
6. Verifique logs da API Next.js (`console.log` em `/api/emails/*/send`)

**Endpoint retorna 401:**
- Verifique se a API key está correta no n8n
- Confirme que `EMAIL_API_SECRET_KEY` está configurada no servidor

**Erro "Failed to send email":**
- Verifique credenciais AWS SES SMTP
- Confirme que não está em sandbox mode (AWS SES precisa estar em produção)
- Verifique se o domínio do remetente está verificado no SES

**Email vazio/sem propriedades:**
- Normal se não houver imóveis novos no período
- Verifique se há propriedades cadastradas no banco
- Confirme que os filtros do usuário/alerta estão corretos

**Performance lenta:**
- Reduza tamanho dos lotes (de 50 para 25)
- Aumente o tempo de wait entre envios
- Verifique performance do banco de dados

## 📧 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.
