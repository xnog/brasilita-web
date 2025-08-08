# Configuração de Variáveis de Ambiente

Para que o sistema de autenticação funcione corretamente, você precisa configurar as seguintes variáveis de ambiente no arquivo `.env.local`:

## Banco de Dados
```
DATABASE_URL="postgresql://user:password@localhost:5432/brasilita_db"
```

## NextAuth.js
```
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

Para gerar o `NEXTAUTH_SECRET`, você pode usar:
```bash
openssl rand -base64 32
```

## Google OAuth

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Google+
4. Vá para "Credenciais" > "Criar credenciais" > "ID do cliente OAuth 2.0"
5. Configure as URLs de redirecionamento:
   - http://localhost:3000/api/auth/callback/google (desenvolvimento)
   - https://seudominio.com/api/auth/callback/google (produção)

```
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Email (Opcional)
Para envio de emails de verificação:

```
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_FROM="noreply@brasilita.com"
```

## Configuração do Banco de Dados

1. Instale PostgreSQL
2. Crie um banco de dados chamado `brasilita_db`
3. Execute as migrações:

```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Scripts do package.json

Os seguintes scripts já estão configurados no `package.json`:

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate", 
    "db:studio": "drizzle-kit studio",
    "db:setup": "npm run db:generate && npm run db:migrate"
  }
}
```