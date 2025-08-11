# Tratamento de Erros OAuth - Brasilità

## Problema Resolvido

O sistema agora trata adequadamente o erro "OAuthAccountNotLinked" que ocorria quando:

1. Um usuário se cadastrava com email/senha
2. Depois tentava fazer login com Google usando o mesmo email
3. O sistema retornava erro sem mostrar mensagem explicativa ao usuário

## Solução Implementada

### 1. Mensagens de Erro Amigáveis

Adicionadas mensagens explicativas para todos os códigos de erro do NextAuth:

- **OAuthAccountNotLinked**: "Este email já possui uma conta cadastrada com senha. Para usar o login com Google, primeiro entre com sua senha e vincule a conta Google nas configurações, ou continue usando email/senha."
- **OAuthCallback**: "Erro na autenticação com Google. Tente novamente."
- **OAuthCreateAccount**: "Não foi possível criar a conta com Google. Tente novamente."
- E outros...

### 2. Configuração de Account Linking

Adicionada a configuração `allowDangerousEmailAccountLinking: true` no Google Provider para permitir vinculação automática de contas com emails verificados.

### 3. Detecção Automática de Erros

Implementado `useEffect` nos formulários de login e cadastro para detectar automaticamente códigos de erro na URL e exibir mensagens apropriadas.

## Como Testar

### Cenário 1: Reproduzir o Problema Original
1. Cadastre um usuário com email/senha através de `/auth/signup`
2. Faça logout
3. Tente fazer login com Google usando o mesmo email
4. **Antes**: Erro sem mensagem explicativa
5. **Agora**: Mensagem clara explicando o problema e como resolver

### Cenário 2: Testar Account Linking
1. Cadastre um usuário com email/senha
2. Faça login com as credenciais
3. Nas configurações da conta, vincule o Google
4. Faça logout e teste login com Google - deve funcionar

### Cenário 3: Novo Usuário com Google
1. Use um email que nunca foi cadastrado
2. Faça login com Google
3. Deve criar conta automaticamente e fazer login

## Arquivos Modificados

1. **`/lib/auth.ts`**:
   - Adicionado `allowDangerousEmailAccountLinking: true` ao Google Provider
   - Implementado callback `signIn` para controle adicional

2. **`/lib/hooks/useAuthError.ts`** *(NOVO)*:
   - Hook customizado para centralizar tratamento de erros OAuth
   - Função `getErrorMessage()` para mapear códigos de erro
   - Detecção automática de erros na URL via `useSearchParams`
   - Interface limpa com `error`, `setError`, `clearError` e `hasError`

3. **`/components/auth/signin-form.tsx`**:
   - Refatorado para usar o hook `useAuthError`
   - Removida lógica duplicada de tratamento de erros
   - Código mais limpo e reutilizável

4. **`/components/auth/signup-form.tsx`**:
   - Refatorado para usar o hook `useAuthError`
   - Removida lógica duplicada de tratamento de erros
   - Consistência com signin-form

## Códigos de Erro Tratados

| Código | Descrição | Mensagem ao Usuário |
|--------|-----------|---------------------|
| `OAuthAccountNotLinked` | Email já cadastrado com senha | Explicação sobre vinculação de contas |
| `OAuthCallback` | Erro na autenticação OAuth | Instruções para tentar novamente |
| `OAuthCreateAccount` | Erro ao criar conta OAuth | Mensagem de erro simples |
| `EmailCreateAccount` | Erro ao criar conta por email | Mensagem de erro simples |
| `Callback` | Erro geral no callback | Instruções para tentar novamente |
| `CredentialsSignin` | Email/senha inválidos | Mensagem clara sobre credenciais |
| `SessionRequired` | Sessão necessária | Instrução para fazer login |

## Segurança

O `allowDangerousEmailAccountLinking` é seguro neste contexto porque:

1. Google verifica emails automaticamente
2. Usamos apenas provedores confiáveis
3. A vinculação só acontece com emails verificados
4. Temos controle adicional via callback `signIn`

## Monitoramento

Para monitorar erros em produção:

1. Verifique logs do NextAuth no servidor
2. Monitore métricas de erro nos formulários
3. Acompanhe feedback do usuário sobre problemas de login

## Estrutura da Solução

### Hook Centralizado (`useAuthError`)

```typescript
export function useAuthError() {
    return {
        error,           // string: mensagem de erro atual
        setError,        // function: define erro manualmente
        clearError,      // function: limpa o erro
        hasError,        // boolean: indica se há erro
    };
}
```

### Vantagens da Centralização

- **DRY (Don't Repeat Yourself)**: Elimina duplicação de código
- **Consistência**: Todas as páginas usam as mesmas mensagens
- **Manutenibilidade**: Mudanças em um local se aplicam a todo o sistema
- **Testabilidade**: Lógica pode ser testada independentemente
- **Extensibilidade**: Fácil adicionar novos códigos de erro

## Próximos Passos

1. **Funcionalidade de Vinculação Manual**: Permitir que usuários vinculem/desvinculem contas nas configurações
2. **Recuperação de Conta**: Sistema para recuperar acesso quando há conflitos
3. **Notificações**: Alertar usuários sobre vinculações de conta por email
4. **Testes**: Criar testes unitários para o hook `useAuthError`