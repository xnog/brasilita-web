# Sistema de Matching de Imóveis com IA

## Visão Geral

Sistema completamente reformulado para trabalhar com **IA externa** que faz o matching de imóveis. A arquitetura foi simplificada para receber e gerenciar vínculos de propriedades selecionados pela IA, proporcionando uma experiência mais inteligente e personalizada.

## 🧠 **Nova Arquitetura com IA**

### **Fluxo Principal:**
1. **Usuário** completa perfil com texto livre (localização, orçamento, preferências)
2. **IA Externa** analisa o perfil e seleciona imóveis compatíveis
3. **Sistema** recebe os matches via API e armazena os vínculos
4. **Usuário** vê apenas os imóveis selecionados pela IA
5. **Filtros** refinam dentro do conjunto já curado

### **Benefícios:**
- ✅ **Flexibilidade total**: Usuário pode escrever "Roma ou Florença, próximo ao centro histórico"
- ✅ **IA inteligente**: Parsing de localização com padrões complexos
- ✅ **Experiência curada**: Usuário vê apenas imóveis relevantes
- ✅ **Escalabilidade**: IA externa pode processar milhares de imóveis
- ✅ **Personalização**: Matching baseado em preferências reais, não filtros rígidos

## 📊 **Estrutura de Dados**

### **Nova Tabela: `property_matches`**
```sql
CREATE TABLE "property_match" (
    "id" text PRIMARY KEY NOT NULL,
    "userId" text NOT NULL REFERENCES "user"("id") ON DELETE cascade,
    "propertyId" text NOT NULL REFERENCES "property"("id") ON DELETE cascade,
    "matchScore" integer DEFAULT 0,
    "matchReason" text, -- JSON explicando o match
    "isActive" boolean DEFAULT true,
    "createdAt" timestamp DEFAULT now(),
    "updatedAt" timestamp DEFAULT now()
);
```

### **Parser de Localização Inteligente**
```javascript
// Exemplos de parsing:
"Roma ou Florença, próximo ao centro histórico"
→ cities: ["Roma", "Florença"], keywords: ["centro", "próximo"]

"Norte da Toscana, perto do mar"
→ regions: ["Toscana"], keywords: ["norte", "perto"], context: ["mar"]

"Milão, máximo 30 minutos do centro"
→ cities: ["Milão"], keywords: ["centro"], context: ["30 minutos"]
```

## 🔌 **APIs Implementadas**

### **1. POST `/api/properties/matches`** - Receber Matches da IA
```json
// Request da IA Externa
{
  "propertyIds": ["1", "4", "7"],
  "source": "AI_v2.0"
}

// Response
{
  "message": "3 propriedades vinculadas com sucesso",
  "matchedCount": 3,
  "source": "AI_v2.0"
}
```

### **2. GET `/api/properties/matches`** - Listar Matches do Usuário
```json
// Response
{
  "properties": [...], // Apenas imóveis matchados
  "total": 3,
  "matchedIds": ["1", "4", "7"]
}
```

### **3. GET `/api/properties`** - Lista Principal (Reformulada)
```json
// Response
{
  "properties": [...], // Imóveis filtrados dentro dos matches
  "total": 2,
  "totalMatched": 3,
  "isMatched": true,
  "message": "Mostrando 2 de 3 imóveis selecionados para você"
}
```

### **4. POST `/api/properties/demo-matches`** - Demo/Teste
```json
// Simula IA criando matches para demonstração
{
  "message": "Matches de demonstração criados com sucesso!",
  "demoMatches": ["1", "4", "7"]
}
```

## 🎨 **Interface do Usuário**

### **Estados da Interface:**

1. **Sem Matches (Estado Inicial)**
   ```
   🤖 Nossa IA está trabalhando para você
   Complete seu perfil no checklist para que nossa IA possa 
   analisar suas preferências e selecionar os imóveis ideais.
   ```

2. **Com Matches (Estado Ativo)**
   ```
   🤖 Seleção da IA
   Nossa IA selecionou 3 imóveis especialmente para você
   [Lista de imóveis curados]
   ```

3. **Filtros Refinados**
   ```
   Mostrando 2 de 3 imóveis selecionados para você
   [Filtros aplicados sobre os matches]
   ```

## 🔄 **Fluxo de Integração com IA Externa**

### **1. Setup Inicial**
```bash
# Gerar migration
npm run db:generate
npm run db:migrate

# Aplicação pronta para receber matches
```

### **2. Integração da IA**
```javascript
// IA Externa chama nossa API
const response = await fetch('/api/properties/matches', {
  method: 'POST',
  headers: { 
    'Authorization': 'Bearer user-token',
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify({
    propertyIds: matchedPropertyIds,
    source: 'AI_Engine_v2'
  })
});
```

### **3. Usuário Ve Resultado**
- Interface atualiza automaticamente
- Mostra apenas imóveis selecionados
- Permite refinamento com filtros

## 🧪 **Como Testar**

### **1. Criar Matches de Demo**
```bash
# Via API (usuário logado)
curl -X POST http://localhost:3000/api/properties/demo-matches \
  -H "Cookie: your-session-cookie"
```

### **2. Ver Resultado**
- Acesse `/properties`
- Verá 3 imóveis selecionados pela "IA Demo"
- Pode aplicar filtros para refinar

### **3. Simular IA Real**
```javascript
// Exemplo de como IA externa integraria
const userProfile = {
  location: "Roma ou Florença, centro histórico",
  budget: 500000,
  propertyType: "residential"
};

const matches = await aiEngine.findMatches(userProfile);
// matches = ["1", "4", "7"]

await fetch('/api/properties/matches', {
  method: 'POST',
  body: JSON.stringify({ propertyIds: matches })
});
```

## 📈 **Próximos Passos**

### **Para Integração Completa:**
1. **Conectar IA Real**: Substituir mock matches por IA externa
2. **Webhook/Polling**: Sistema para receber updates automáticos
3. **Analytics**: Tracking de performance dos matches
4. **Feedback Loop**: Usuário pode avaliar matches para melhorar IA

### **Melhorias Futuras:**
- **Real-time Updates**: WebSocket para matches em tempo real
- **Match Explanations**: IA explica por que selecionou cada imóvel
- **Learning System**: IA aprende com interações do usuário
- **Batch Processing**: IA processa múltiplos usuários simultaneamente

## 💡 **Vantagens da Nova Arquitetura**

### **Para o Usuário:**
- ✅ Experiência mais inteligente e personalizada
- ✅ Menos ruído, mais relevância
- ✅ Interface limpa focada no que importa
- ✅ Flexibilidade total na descrição de preferências

### **Para o Sistema:**
- ✅ Arquitetura desacoplada e escalável
- ✅ IA pode evoluir independentemente
- ✅ Fácil integração com diferentes engines de IA
- ✅ Performance otimizada (menos dados processados no frontend)

### **Para o Negócio:**
- ✅ Diferenciação competitiva com IA
- ✅ Maior conversão (usuários veem apenas imóveis relevantes)
- ✅ Dados ricos para análise e melhoria contínua
- ✅ Escalabilidade para milhares de usuários e imóveis

## ✅ **Status: Pronto para Integração com IA**

O sistema está completamente implementado e pronto para receber matches de qualquer engine de IA externa. A interface funciona perfeitamente e a arquitetura é robusta e escalável.

**Teste agora**: Use a API `/api/properties/demo-matches` para ver o sistema funcionando!
