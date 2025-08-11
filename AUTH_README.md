# Sistema de Autenticação - Brasilità

## Visão Geral

Sistema de autenticação completo implementado com **NextAuth.js v5** e **Drizzle ORM**, oferecendo:

- ✅ Login via Google OAuth
- ✅ Login via email/senha
- ✅ Registro de usuários
- ✅ Middleware de proteção de rotas
- ✅ Páginas de login/signup responsivas
- ✅ Dashboard protegido
- ✅ Integração com PostgreSQL
- ✅ Tratamento de erros OAuth com mensagens amigáveis
- ✅ Vinculação automática de contas verificadas

## Estrutura do Projeto

```
├── lib/
│   ├── auth.ts                 # Configuração NextAuth.js
│   └── db/
│       ├── index.ts           # Conexão com banco
│       └── schema.ts          # Schema Drizzle
├── app/
│   ├── api/auth/
│   │   ├── [...nextauth]/     # Rotas NextAuth
│   │   └── register/          # API de registro
│   ├── auth/
│   │   ├── signin/            # Página de login
│   │   └── signup/            # Página de registro
│   └── dashboard/             # Dashboard protegido
├── components/
│   ├── auth/                  # Componentes de autenticação
│   └── providers/             # Provider de sessão
├── middleware.ts              # Middleware de rotas
└── drizzle.config.ts         # Configuração Drizzle
```

## Funcionalidades

### 🔐 Autenticação
- **Google OAuth**: Login rápido com conta Google
- **Email/Senha**: Registro e login tradicional com hash bcrypt
- **Sessões JWT**: Gerenciamento eficiente de sessões
- **Logout**: Funcionalidade completa de logout

### 🛡️ Segurança
- Senhas hasheadas com bcrypt (12 rounds)
- Validação de dados no frontend e backend
- Middleware de proteção de rotas
- Variáveis de ambiente para credenciais

### 🎨 Interface
- Design moderno com Tailwind CSS
- Componentes shadcn/ui
- Responsivo para mobile
- Feedback visual para erros/loading

## Como Usar

### 1. Configurar Variáveis de Ambiente

Crie o arquivo `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/brasilita_db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 2. Configurar Banco de Dados

```bash
# Configurar banco automaticamente
npm run db:setup

# Ou manualmente:
npm run db:generate
npm run db:migrate
```

### 3. Configurar Google OAuth

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto
3. Ative a Google+ API
4. Crie credenciais OAuth 2.0
5. Configure URLs de redirecionamento:
   - `http://localhost:3000/api/auth/callback/google`

### 4. Executar o Projeto

```bash
npm run dev
```

## Rotas

### Públicas
- `/` - Página inicial
- `/auth/signin` - Login
- `/auth/signup` - Registro

### Protegidas
- `/dashboard` - Dashboard do usuário
- `/profile` - Perfil (exemplo)
- `/settings` - Configurações (exemplo)

### APIs
- `/api/auth/[...nextauth]` - NextAuth endpoints
- `/api/auth/register` - Registro de usuários

## Middleware

O middleware protege automaticamente rotas baseado em:

- **Rotas públicas**: Acesso livre
- **Rotas protegidas**: Requer autenticação
- **Redirecionamentos**: Login → Dashboard se autenticado

## Componentes

### SignInForm
- Login via Google ou email/senha
- Validação de formulário
- Estados de loading/erro
- Design responsivo

### SignUpForm
- Registro com nome, email e senha
- Validação de senha (mínimo 6 caracteres)
- Confirmação de senha
- Login automático após registro

### Dashboard
- Informações do usuário
- Logout functionality
- Área protegida exemplo

## Banco de Dados

### Schema
- **users**: Dados dos usuários
- **accounts**: Contas OAuth
- **sessions**: Sessões ativas
- **verificationTokens**: Tokens de verificação
- **authenticators**: WebAuthn (futuro)

### Comandos Úteis

```bash
# Visualizar banco
npm run db:studio

# Nova migração
npm run db:generate
```

## Tratamento de Erros

O sistema inclui tratamento abrangente de erros OAuth:

- **OAuthAccountNotLinked**: Mensagem explicativa quando email já está cadastrado
- **Vinculação automática**: Contas Google com emails verificados são vinculadas automaticamente
- **Mensagens amigáveis**: Todos os códigos de erro são traduzidos para mensagens úteis
- **Detecção automática**: Erros na URL são detectados e exibidos automaticamente

Para mais detalhes, consulte o arquivo `OAUTH_ERROR_HANDLING.md`.

# Aplicar migrações
npm run db:migrate
```

## Personalização

### Adicionar Novos Provedores
Edite `lib/auth.ts`:

```typescript
providers: [
  Google({ ... }),
  // Adicione novos provedores aqui
  GitHub({ ... }),
]
```

### Personalizar Páginas
Modifique os componentes em `components/auth/`:
- Cores e estilos
- Campos adicionais
- Validações customizadas

### Adicionar Campos ao Usuário
1. Atualize `lib/db/schema.ts`
2. Gere nova migração: `npm run db:generate`
3. Execute: `npm run db:migrate`

## Troubleshooting

### Erro de Conexão com Banco
- Verifique se PostgreSQL está rodando
- Confirme a `DATABASE_URL`
- Execute `npm run db:setup`

### Erro Google OAuth
- Verifique credenciais no Google Cloud Console
- Confirme URLs de redirecionamento
- Certifique-se que a API está ativa

### Erro de Build
- Execute `npm run lint` para verificar erros
- Confirme todas as variáveis de ambiente
- Verifique se todas as dependências estão instaladas

## Próximos Passos

- [ ] Reset de senha via email
- [ ] Verificação de email
- [ ] Two-factor authentication
- [ ] Social logins adicionais
- [ ] Rate limiting
- [ ] Audit logs

---

**Desenvolvido para Brasilità** 🇮🇹🏠