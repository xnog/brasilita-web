# Workflows N8N - Sistema de Emails Brasilità

Este diretório contém os workflows N8N para automação de emails da plataforma Brasilità.

## 📧 Workflows Disponíveis

### 1. Email Semanal de Sugestões (`n8n-weekly-suggestions.json`)
**Frequência:** Toda segunda-feira às 9h
**Descrição:** Envia até 3 sugestões de imóveis para cada usuário baseado em suas preferências.

**Como funciona:**
1. Busca todos os usuários com perfis configurados
2. Para cada usuário:
   - Renderiza email com até 3 imóveis dos últimos 7 dias
   - Só envia se houver propriedades novas
3. Processa em lotes de 50 usuários
4. Aguarda 100ms entre cada envio (rate limiting)

### 2. Email Diário de Alertas (`n8n-daily-alerts.json`)
**Frequência:** Diariamente às 10h
**Descrição:** Envia notificações de novos imóveis que atendem aos alertas configurados pelos usuários.

**Como funciona:**
1. Busca todos os alertas ativos
2. Para cada alerta:
   - Busca imóveis das últimas 24h que atendem aos filtros
   - Renderiza email com até 10 propriedades
   - Só envia se houver propriedades novas
   - Atualiza `lastProcessedAt` do alerta
3. Processa em lotes de 50 alertas
4. Aguarda 100ms entre cada envio (rate limiting)

## 🔧 Configuração no N8N

### 1. Variáveis de Ambiente
Configure no N8N as seguintes variáveis:

```
BRASILITA_EMAIL_API_KEY=your-secret-key-here
```

### 2. Credenciais SMTP
Configure uma credencial SMTP no N8N com:
- Host do servidor SMTP
- Porta (geralmente 587 ou 465)
- Usuário
- Senha
- TLS/SSL ativado

### 3. Importar Workflows

1. Acesse N8N
2. Clique em "Add Workflow"
3. Clique em "Import from File"
4. Selecione o arquivo JSON correspondente
5. Configure a credencial SMTP nos nodes "Enviar Email"
6. Ative o workflow

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

**Renderizar email:**
```bash
GET /api/emails/weekly-suggestions/render?userId=xxx
Headers: x-api-key: your-secret-key
```

### Email de Alertas

**Listar alertas ativos:**
```bash
GET /api/emails/daily-alerts/alerts
Headers: x-api-key: your-secret-key
```

**Renderizar email:**
```bash
GET /api/emails/daily-alerts/render?alertId=xxx
Headers: x-api-key: your-secret-key
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

### Performance
- Workflows processam em lotes de 50 para evitar sobrecarga
- Rate limiting de 100ms entre envios
- Emails só são enviados se houver conteúdo relevante

### Segurança
- API Key obrigatória em todos os endpoints
- Middleware valida autenticação antes de processar
- Não expõe dados sensíveis dos usuários

### Monitoramento
- N8N registra todas as execuções
- Verifique logs em caso de erros
- Email semanal: espere ~1-2min por lote de 50 usuários
- Email diário: espere ~1-2min por lote de 50 alertas

### Manutenção
- Revisar logs semanalmente
- Verificar taxa de bounce/rejeição
- Ajustar horários se necessário
- Monitorar performance dos endpoints

## 🐛 Troubleshooting

**Emails não estão sendo enviados:**
1. Verifique se o workflow está ativo
2. Confirme credenciais SMTP
3. Verifique API key
4. Revise logs de execução do N8N

**Endpoint retorna 401:**
- Verifique se a API key está correta
- Confirme que a variável de ambiente está configurada no servidor

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
