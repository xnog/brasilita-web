# Changelog - 02 de Dezembro de 2024

## 📋 Resumo das Alterações

Este documento descreve todas as alterações implementadas no dia 02/12/2024, incluindo:
- Área de Imóveis Favoritados
- Processo de Compra do Imóvel (24 etapas)
- **Ajuste de UI do Processo de Compra** (apenas etapa atual expandida)

---

## 🎯 Funcionalidades Implementadas

### 1. Área de Imóveis Favoritados
Sistema completo para visualização e gerenciamento de imóveis favoritados pelo usuário.

### 2. Processo de Compra do Imóvel
Sistema completo de jornada de compra com 24 etapas padronizadas, upload de arquivos e timeline visual.

---

## 📁 Arquivos Criados

### Configuração e Dados
- `lib/data/purchase-journey-steps.ts` - Definições das 24 etapas padronizadas

### APIs - Favoritos
- `app/api/favorites/route.ts` - GET e DELETE para favoritos

### APIs - Processo de Compra
- `app/api/purchase-journey/route.ts` - POST e GET para criar/obter jornadas
- `app/api/purchase-journey/[id]/route.ts` - GET detalhes da jornada
- `app/api/purchase-journey/[id]/steps/[stepNumber]/route.ts` - PATCH para atualizar etapas
- `app/api/purchase-journey/[id]/uploads/route.ts` - POST para upload de arquivos
- `app/api/purchase-journey/[id]/uploads/[uploadId]/route.ts` - DELETE para remover arquivos

### Páginas
- `app/(authenticated)/favorites/page.tsx` - Página de favoritos
- `app/(authenticated)/favorites/favorites-client.tsx` - Componente client dos favoritos
- `app/(authenticated)/purchase-journey/[id]/page.tsx` - Página da jornada de compra
- `app/(authenticated)/purchase-journey/[id]/purchase-journey-client.tsx` - Componente client da jornada

### Componentes
- `components/purchase-journey/purchase-journey-timeline.tsx` - Timeline visual das etapas
- `components/purchase-journey/purchase-journey-step-card.tsx` - Card de cada etapa
- `components/purchase-journey/purchase-journey-upload.tsx` - Componente de upload de arquivos

### Documentação
- `.env.example` - Template de variáveis de ambiente
- `README.md` - Atualizado com instruções de configuração

---

## ✏️ Arquivos Modificados

### Schema do Banco de Dados
- `lib/db/schema.ts`
  - Adicionadas tabelas: `purchaseJourneys`, `purchaseJourneySteps`, `purchaseJourneyUploads`
  - Adicionadas relações entre as tabelas
  - Adicionados tipos TypeScript

### APIs
- `app/api/preferences/route.ts`
  - Adicionada validação de existência do usuário antes de criar perfil
  - Adicionada verificação de perfil duplicado

### Componentes
- `components/properties/property-detail-content.tsx`
  - Adicionado botão "Seguir com o Processo de Compra"
  - Adicionada função `handleStartPurchaseJourney`

- `components/layout/authenticated-header.tsx`
  - Adicionado link "Imóveis Favoritos" no menu de navegação

### Configuração
- `package.json`
  - Adicionado `dotenv-cli` como devDependency
  - Atualizados scripts `db:*` para usar dotenv-cli

### Migrações do Banco
- `drizzle/0012_reflective_bullseye.sql` - Corrigido para usar `USING` na conversão de tipos
- `drizzle/0018_gorgeous_sentinel.sql` - Corrigido para usar `USING` na conversão de tipos
- `drizzle/meta/_journal.json` - Corrigido nome da migração 0024
- `drizzle/0026_complex_hammerhead.sql` - Nova migração para tabelas de processo de compra

### Autenticação
- `lib/auth.ts`
  - Adicionado `secret` explícito
  - Adicionado modo `debug` para desenvolvimento
  - Adicionado `checks` explícito para Google OAuth

---

## 🗄️ Schema do Banco de Dados

### Novas Tabelas

#### `purchase_journey`
```sql
- id (text, PK)
- userId (text, FK -> user.id)
- propertyId (text, FK -> property.id)
- status (text, default: 'in_progress')
- createdAt (timestamp)
- updatedAt (timestamp)
- UNIQUE(userId, propertyId)
```

#### `purchase_journey_step`
```sql
- id (text, PK)
- journeyId (text, FK -> purchase_journey.id)
- stepNumber (integer, 1-24)
- title (text)
- description (text)
- uploadRequired (boolean)
- status (text, default: 'pending')
- completedAt (timestamp)
- notes (text)
- createdAt (timestamp)
- updatedAt (timestamp)
- UNIQUE(journeyId, stepNumber)
```

#### `purchase_journey_upload`
```sql
- id (text, PK)
- journeyId (text, FK -> purchase_journey.id)
- stepId (text, FK -> purchase_journey_step.id)
- fileName (text)
- fileUrl (text)
- fileSize (integer)
- mimeType (text)
- uploadedBy (text, FK -> user.id)
- createdAt (timestamp)
```

---

## 🔌 APIs Criadas

### Favoritos

#### `GET /api/favorites`
- **Descrição**: Lista imóveis favoritados do usuário
- **Query Params**: `page`, `limit`
- **Response**: `{ favorites: [], pagination: {} }`

#### `DELETE /api/favorites`
- **Descrição**: Remove um imóvel dos favoritos
- **Body**: `{ propertyId: string }`
- **Response**: `{ success: true }`

### Processo de Compra

#### `POST /api/purchase-journey`
- **Descrição**: Cria ou retorna jornada existente
- **Body**: `{ propertyId: string }`
- **Response**: `{ journey: {}, created: boolean }`

#### `GET /api/purchase-journey?propertyId=xxx`
- **Descrição**: Busca jornada por imóvel
- **Query Params**: `propertyId`
- **Response**: `{ journey: {} }`

#### `GET /api/purchase-journey/[id]`
- **Descrição**: Detalhes completos da jornada
- **Response**: `{ journey: {} }`
- **Validação**: Apenas o dono pode acessar

#### `PATCH /api/purchase-journey/[id]/steps/[stepNumber]`
- **Descrição**: Atualiza status de uma etapa
- **Body**: `{ status: string, notes?: string }`
- **Validações**:
  - Não permite concluir sem concluir etapas anteriores
  - Não permite concluir sem upload se `uploadRequired = true`
- **Response**: `{ step: {} }`

#### `POST /api/purchase-journey/[id]/uploads`
- **Descrição**: Upload de arquivo para uma etapa
- **FormData**: `file`, `stepNumber`
- **Validações**:
  - Tamanho máximo: 10MB
  - Tipos permitidos: PDF, JPG, PNG, DOC, DOCX
- **Response**: `{ upload: {} }`

#### `DELETE /api/purchase-journey/[id]/uploads/[uploadId]`
- **Descrição**: Remove um arquivo enviado
- **Validação**: Reabre etapa se era obrigatória e não há mais uploads
- **Response**: `{ success: true }`

---

## 🎨 Componentes Criados

### Favoritos
- `FavoritesClient` - Gerencia lista de favoritos com paginação
- Integração com `PropertyCard` existente

### Processo de Compra
- `PurchaseJourneyClient` - Container principal da jornada
- `PurchaseJourneyTimeline` - Timeline visual com linhas conectadas
- `PurchaseJourneyStepCard` - Card individual de cada etapa
- `PurchaseJourneyUploadComponent` - Upload e gerenciamento de arquivos

---

## 🔄 Migrações do Banco de Dados

### Migrações Corrigidas
1. **0012_reflective_bullseye.sql**
   - Adicionado `USING features::jsonb` e `USING images::jsonb`

2. **0018_gorgeous_sentinel.sql**
   - Adicionado `USING latitude::numeric(9,6)` e `USING longitude::numeric(9,6)`

3. **drizzle/meta/_journal.json**
   - Corrigido nome da migração 0024: `0024_deep_doctor_doom` → `0024_add_event_registrations`

### Nova Migração
4. **0026_complex_hammerhead.sql**
   - Criação das 3 novas tabelas do processo de compra
   - Foreign keys e constraints

---

## ⚙️ Configurações e Dependências

### Novas Dependências
- `dotenv-cli@^11.0.0` (devDependency) - Para carregar variáveis de ambiente nos scripts

### Scripts Atualizados
```json
{
  "db:generate": "dotenv -e .env.local -- drizzle-kit generate",
  "db:migrate": "dotenv -e .env.local -- drizzle-kit migrate",
  "db:push": "dotenv -e .env.local -- drizzle-kit push",
  "db:studio": "dotenv -e .env.local -- drizzle-kit studio"
}
```

### Variáveis de Ambiente
Criado `.env.example` com todas as variáveis necessárias:
- `DATABASE_URL`
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD`
- `EMAIL_API_SECRET_KEY`
- `LISTMONK_*` (opcional)
- `NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN` (opcional)

---

## 🛡️ Validações de Negócio Implementadas

### Processo de Compra

1. **Sequência de Etapas**
   - Não permite concluir etapa sem concluir as anteriores
   - Etapas futuras ficam bloqueadas até desbloqueio

2. **Uploads Obrigatórios**
   - Valida presença de upload antes de concluir etapa
   - Reabre etapa automaticamente se upload obrigatório for deletado

3. **Autorização**
   - Apenas o dono da jornada pode acessar/modificar
   - Validação em todas as APIs

4. **Duplicação**
   - Apenas uma jornada ativa por `userId + propertyId`
   - Retorna jornada existente se já criada

5. **Validação de Arquivos**
   - Tamanho máximo: 10MB
   - Tipos permitidos: PDF, JPG, PNG, DOC, DOCX
   - Validação no frontend e backend

---

## 📝 Instruções para Merge

### 1. Pré-requisitos
```bash
# Instalar nova dependência
npm install

# Verificar se .env.local está configurado
cp .env.example .env.local
# Editar .env.local com valores reais
```

### 2. Aplicar Migrações
```bash
# As migrações já foram aplicadas, mas para garantir:
npm run db:migrate
```

### 3. Verificar Arquivos
- ✅ Todas as migrações estão no diretório `drizzle/`
- ✅ Schema atualizado em `lib/db/schema.ts`
- ✅ APIs criadas em `app/api/`
- ✅ Componentes criados em `components/`
- ✅ Páginas criadas em `app/(authenticated)/`

### 4. Testes Recomendados

#### Favoritos
1. Favoritar um imóvel
2. Acessar `/favorites`
3. Verificar listagem
4. Remover favorito
5. Verificar estado vazio

#### Processo de Compra
1. Acessar um imóvel
2. Clicar em "Seguir com o Processo de Compra"
3. Verificar criação da jornada com 24 etapas
4. Testar conclusão de etapas em sequência
5. Testar upload de arquivo em etapa que requer
6. Testar bloqueio de etapas futuras
7. Verificar validação de upload obrigatório

### 5. Possíveis Conflitos

#### Arquivos que podem ter conflitos:
- `lib/db/schema.ts` - Adicionadas novas tabelas e relações
- `package.json` - Adicionada dependência e scripts atualizados
- `components/layout/authenticated-header.tsx` - Adicionado item no menu
- `components/properties/property-detail-content.tsx` - Adicionado botão

#### Resolução:
- Manter todas as alterações de hoje
- Verificar se há outras alterações recentes nos mesmos arquivos
- Testar integração após merge

---

## 🐛 Correções Aplicadas

### Migrações
- Corrigidas conversões de tipo sem `USING` (causavam erros no PostgreSQL)
- Corrigido nome inconsistente na migração 0024

### Autenticação
- Adicionado `NEXTAUTH_SECRET` explícito
- Adicionado modo debug
- Corrigido problema de PKCE com cookies

### APIs
- Adicionada validação de existência do usuário em `/api/preferences`
- Adicionada verificação de perfil duplicado

---

## 📊 Estatísticas

- **Arquivos Criados**: 15
- **Arquivos Modificados**: 8
- **Novas Tabelas**: 3
- **Novas APIs**: 7
- **Novos Componentes**: 4
- **Migrações**: 1 nova + 3 corrigidas

---

## 🔗 Rotas Criadas

### Públicas
Nenhuma

### Autenticadas
- `/favorites` - Área de favoritos
- `/purchase-journey/[id]` - Jornada de compra

---

## 📚 Documentação Adicional

### README.md
Atualizado com:
- Instruções completas de configuração local
- Lista de variáveis de ambiente
- Scripts disponíveis
- Estrutura do projeto

### .env.example
Template completo com todas as variáveis necessárias e descrições

---

## ⚠️ Observações Importantes

1. **Uploads de Arquivos**
   - Atualmente usando armazenamento local (`public/uploads/`)
   - Para produção, considerar migrar para S3 ou serviço similar
   - Criar diretório `public/uploads/purchase-journeys/` se necessário

2. **Validações**
   - Todas as validações de negócio estão no backend
   - Frontend tem validações básicas para UX
   - Backend é a fonte da verdade

3. **Performance**
   - Timeline carrega todas as 24 etapas de uma vez
   - Considerar paginação se houver muitos usuários simultâneos

4. **Segurança**
   - Uploads validados por tipo e tamanho
   - Autorização verificada em todas as APIs
   - Arquivos salvos com nomes únicos

---

## 🎨 Ajustes de UI - Processo de Compra (Última Atualização)

### Modificações nos Componentes Existentes

#### `components/purchase-journey/purchase-journey-timeline.tsx`
- **Adicionado**: Prop `currentStepNumber` para identificar etapa atual
- **Adicionado**: Prop `onStepCompleted` para callback de conclusão
- **Modificado**: Lógica de renderização para passar `isExpanded` para cada card

#### `components/purchase-journey/purchase-journey-step-card.tsx`
- **Adicionado**: Prop `isExpanded` para controlar expansão
- **Adicionado**: Prop `onStepCompleted` para notificar conclusão
- **Adicionado**: Versão colapsada do card (para etapas não expandidas)
- **Adicionado**: Scroll automático quando etapa expande
- **Adicionado**: Prevenção de cliques duplos (`isProcessing`)
- **Adicionado**: Validação de clique em etapas bloqueadas/concluídas
- **Modificado**: Substituído `alert()` por `toast` (sonner)
- **Modificado**: Card expandido tem borda azul destacada

#### `app/(authenticated)/purchase-journey/[id]/purchase-journey-client.tsx`
- **Adicionado**: Lógica para identificar etapa atual (`currentStepNumber`)
  - Prioriza etapa com status "in_progress"
  - Se não houver, busca primeira "pending" não bloqueada
- **Adicionado**: Função `handleStepCompleted` para avanço automático
- **Adicionado**: Revalidação ao voltar foco da aba (event listener)
- **Adicionado**: Prevenção de cliques duplos (`isProcessingRef`)
- **Modificado**: Substituído `alert()` por `toast` (sonner)

### Comportamentos Implementados

1. **Expansão Única**
   - Apenas a etapa atual (in_progress ou primeira pending) aparece expandida
   - Todas as outras aparecem colapsadas

2. **Bloqueio de Etapas Futuras**
   - Clique em etapa bloqueada mostra toast: "Conclua a etapa atual para avançar."
   - Clique em etapa concluída mostra toast: "Esta etapa já foi concluída."

3. **Avanço Automático**
   - Ao concluir etapa, automaticamente:
     - Fecha a etapa concluída
     - Abre a próxima etapa
     - Faz scroll suave para nova etapa
     - Mostra toast de sucesso

4. **Persistência**
   - Ao recarregar página, detecta etapa atual pelo backend
   - Abre automaticamente a etapa correta

5. **Revalidação**
   - Ao voltar foco da aba, revalida estado via API
   - Ajusta UI automaticamente se houve mudanças

### Arquivos Modificados (UI)

- `components/purchase-journey/purchase-journey-timeline.tsx`
- `components/purchase-journey/purchase-journey-step-card.tsx`
- `app/(authenticated)/purchase-journey/[id]/purchase-journey-client.tsx`

### Dependências Adicionais

Nenhuma nova dependência. Usa `sonner` que já estava no projeto.

---

## ✅ Checklist de Merge

- [ ] Revisar todas as alterações
- [ ] Verificar conflitos com branch principal
- [ ] Testar criação de jornada de compra
- [ ] Testar favoritos
- [ ] Verificar migrações aplicadas
- [ ] Testar upload de arquivos
- [ ] Verificar validações de negócio
- [ ] **Testar UI de expansão única de etapas**
- [ ] **Testar avanço automático após conclusão**
- [ ] **Testar bloqueio de etapas futuras**
- [ ] **Testar revalidação ao voltar foco da aba**
- [ ] Testar em ambiente de desenvolvimento
- [ ] Atualizar documentação se necessário

---

**Data**: 02 de Dezembro de 2024  
**Desenvolvedor**: Cursor AI Assistant  
**Branch**: `favoritos` (assumindo)

