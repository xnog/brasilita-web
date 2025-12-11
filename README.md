# Brasilità Web

Aplicação web Next.js para a plataforma Brasilità.

## 🚀 Configuração para Desenvolvimento Local

### Pré-requisitos

- Node.js 20+ instalado
- PostgreSQL instalado e rodando
- npm, yarn, pnpm ou bun

### Passo 1: Instalar Dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### Passo 2: Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

2. Edite o arquivo `.env.local` e configure as seguintes variáveis:

#### **Obrigatórias:**

- **`DATABASE_URL`**: URL de conexão com PostgreSQL
  - Exemplo: `postgresql://usuario:senha@localhost:5432/brasilita`
  - Crie o banco de dados: `createdb brasilita`

- **`NEXTAUTH_URL`**: URL base da aplicação (para local: `http://localhost:3000`)

- **`NEXTAUTH_SECRET`**: Secret para criptografar tokens JWT
  - Gere com: `openssl rand -base64 32`

- **`GOOGLE_CLIENT_ID`** e **`GOOGLE_CLIENT_SECRET`**: Credenciais OAuth do Google
  - Obtenha em: https://console.cloud.google.com/apis/credentials
  - Configure o redirect URI: `http://localhost:3000/api/auth/callback/google`

#### **Opcionais (para funcionalidades completas):**

- **`SMTP_HOST`**, **`SMTP_USER`**, **`SMTP_PASSWORD`**: Para envio de emails
  - Para desenvolvimento, use [Mailtrap](https://mailtrap.io) ou [Ethereal Email](https://ethereal.email)
  - Para produção, use AWS SES ou outro serviço SMTP

- **`EMAIL_API_SECRET_KEY`**: Chave para autenticar webhooks do N8N
  - Gere uma chave aleatória segura

- **`LISTMONK_URL`**, **`LISTMONK_API_USER`**, **`LISTMONK_API_KEY`**, **`LISTMONK_LIST_ID`**: Para integração com Listmonk (email marketing)
  - Pode ser deixado vazio se não for usar

- **`NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN`**: Token do Mixpanel para analytics
  - Nota: Mixpanel é automaticamente desabilitado em localhost

### Passo 3: Configurar o Banco de Dados

1. Certifique-se de que o PostgreSQL está rodando:

```bash
# macOS (com Homebrew)
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Ou inicie manualmente
```

2. Crie o banco de dados (se ainda não existir):

```bash
createdb brasilita
# ou
psql -U postgres -c "CREATE DATABASE brasilita;"
```

3. Execute as migrações do banco de dados:

```bash
npm run db:migrate
# ou
npm run db:push
```

4. (Opcional) Abra o Drizzle Studio para visualizar o banco:

```bash
npm run db:studio
```

### Passo 4: Executar a Aplicação

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run db:generate` - Gera migrações do Drizzle
- `npm run db:migrate` - Executa migrações do banco
- `npm run db:push` - Sincroniza schema com o banco (sem migrações)
- `npm run db:studio` - Abre o Drizzle Studio
- `npm run email:dev` - Inicia servidor de preview de emails (porta 3001)

## 🗄️ Estrutura do Projeto

- `app/` - Rotas e páginas (App Router do Next.js)
- `components/` - Componentes React reutilizáveis
- `lib/` - Utilitários, configurações e lógica de negócio
- `drizzle/` - Migrações do banco de dados
- `emails/` - Templates de email (React Email)

## 🔐 Autenticação

A aplicação usa NextAuth v5 com suporte a:
- Login com Google OAuth
- Login com email/senha (credentials)

## 📧 Sistema de Emails

A aplicação envia emails através de:
- AWS SES (via SMTP) ou outro serviço SMTP
- Templates React Email
- Integração com N8N para automação

Veja mais detalhes em `workflows/README.md`

## 🛠️ Tecnologias Principais

- **Next.js 15** - Framework React
- **NextAuth v5** - Autenticação
- **Drizzle ORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **React Email** - Templates de email
- **Tailwind CSS** - Estilização
- **TypeScript** - Tipagem estática

## 📚 Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth Documentation](https://next-auth.js.org)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
