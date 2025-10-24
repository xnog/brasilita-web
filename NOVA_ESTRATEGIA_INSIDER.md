# 🎯 Nova Estratégia Brasilità Insider - Evento Gratuito

## 📅 Estratégia Atualizada

### **Mudança de Abordagem:**

**Antes:** Fórmula de Lançamento com 3 vídeos + lead magnet  
**Agora:** Evento ao vivo gratuito + página de vendas

---

## 🎬 Estrutura Atual

### **1. `/insider-lead` - Convite para Evento Gratuito**

**Objetivo:** Capturar leads qualificados para evento ao vivo

**Detalhes do Evento:**
- **Data:** 02 de Novembro de 2025 (Sábado)
- **Horário:** 16:00h (Horário de Brasília)
- **Formato:** Aula ao vivo online
- **Título:** "Como Comprar Seu Primeiro Imóvel na Itália em 2025"

**Elementos da Página:**
- ✅ Countdown timer até 02/11 às 16h
- ✅ Formulário de registro (Nome, E-mail, WhatsApp)
- ✅ Benefícios claros do que será ensinado
- ✅ Prova social (200k+ seguidores)
- ✅ Design profissional e responsivo

**Conversão esperada:** 40-60% dos visitantes

---

### **2. `/insider-lead/thank-you` - Página de Confirmação**

**Objetivo:** Confirmar inscrição e manter engajamento

**Elementos:**
- ✅ Confirmação visual da inscrição
- ✅ Detalhes do evento (data, hora)
- ✅ O que acontece a seguir (3 passos)
- ✅ O que será ensinado no evento
- ✅ Lembretes importantes
- ✅ CTAs para redes sociais

---

### **3. `/insider-launch` - Página de Vendas**

**Objetivo:** Converter participantes do evento em membros pagantes

**Quando usar:** A partir de 02/11 (durante e após o evento)

**Elementos:**
- ✅ Countdown timer
- ✅ Oferta completa do Brasilità Insider
- ✅ Preço especial €29 (primeiros 100)
- ✅ Garantia de 7 dias
- ✅ FAQ completo
- ✅ Múltiplos CTAs para Hubla

---

## 🗄️ Banco de Dados

### **Nova Tabela: `event_registration`**

```sql
CREATE TABLE event_registration (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  event_date TIMESTAMP NOT NULL,
  registered_at TIMESTAMP DEFAULT NOW(),
  attended BOOLEAN DEFAULT FALSE,
  source TEXT DEFAULT 'insider-event'
);
```

**Campos:**
- `id` - ID único do registro
- `name` - Nome completo
- `email` - E-mail para envio do link
- `phone` - WhatsApp para lembrete
- `event_date` - Data do evento (02/11/2025 16h)
- `registered_at` - Quando se inscreveu
- `attended` - Se participou (atualizar após evento)
- `source` - Origem do registro

**API Endpoint:** `/api/event-registration`
- `POST` - Criar novo registro
- `GET` - Listar registros (admin)

---

## 📊 Funil Completo

```
TRÁFEGO (Instagram, Stories, Posts)
           ↓
Landing de Evento (/insider-lead)
           ↓
Formulário de Inscrição
           ↓
Thank You Page (/insider-lead/thank-you)
           ↓
E-mail/WhatsApp de Confirmação
           ↓
Lembrete 1 dia antes (01/11)
           ↓
EVENTO AO VIVO (02/11 às 16h)
           ↓
Durante evento: Apresenta Brasilità Insider
           ↓
Landing de Vendas (/insider-launch)
           ↓
Hubla (Pagamento)
           ↓
MEMBRO do Brasilità Insider
```

---

## 🎯 Cronograma de Divulgação

### **Até 01/11 (Sexta):**
**Foco:** Inscrições para o evento

**Ações:**
- Posts diários nos 3 perfis (@duasmalaseumdestino, @nortedaitalia, @brasilita.it)
- Stories múltiplos por dia
- Link na bio: `brasilita.com/insider-lead`
- Mensagens: "Evento gratuito sábado às 16h"
- Reforçar: "Bônus exclusivo para quem participar ao vivo"

**Meta:** 500-1000 inscritos

### **01/11 (Sexta - 1 dia antes):**
**Foco:** Lembrete e envio do link

**Ações:**
- E-mail para todos os inscritos com link do evento
- WhatsApp com link do evento
- Stories: "Amanhã é o dia!"
- Post: "Últimas horas para garantir vaga"

### **02/11 (Sábado - Dia do Evento):**
**Foco:** Evento + Lançamento

**Cronograma do Dia:**
- **14h:** Stories lembrando "Daqui 2 horas!"
- **15h:** Stories "Daqui 1 hora!"
- **15:45:** Enviar link novamente por e-mail/WhatsApp
- **16h:** EVENTO AO VIVO (60-90 min)
- **Durante evento:** Apresentar Brasilità Insider
- **Final do evento:** Revelar oferta especial €29
- **17:30:** Direcionar para `/insider-launch`
- **18h:** E-mail/WhatsApp com link da oferta
- **20h:** Stories reforçando urgência

### **03/11 em diante:**
**Foco:** Conversão dos inscritos

**Ações:**
- Posts sobre o Insider
- Compartilhar primeiras adesões
- Responder dúvidas
- Contar quantas vagas restam dos 100

---

## 📝 Conteúdo do Evento (Sugestão)

### **Estrutura da Aula (60-90 min):**

**1. Abertura (5 min)**
- Boas-vindas
- Quem é o Aloisio/equipe
- O que será ensinado

**2. Conteúdo Educacional (40-50 min)**
- As 5 melhores regiões para investir
- Custos reais e impostos detalhados
- Processo completo de compra
- Erros que custam caro
- Rentabilidade real (cases)
- Como fazer do Brasil

**3. Apresentação do Insider (10-15 min)**
- O que é o Brasilità Insider
- O que está incluído
- Diferença entre fazer sozinho vs com suporte
- Apresentar a comunidade

**4. Oferta Especial (10-15 min)**
- Revelar preço €29 (primeiros 100)
- Bônus exclusivos para quem entrar hoje
- Garantia de 7 dias
- Mostrar a landing page
- CTA: "Link nos comentários/descrição"

**5. Q&A (10-15 min)**
- Responder dúvidas ao vivo
- Reforçar urgência (vagas limitadas)
- CTA final

---

## 💬 Templates de Comunicação

### **E-mail 1: Confirmação (Imediato)**
**Assunto:** ✅ Sua Vaga Está Garantida!

```
Olá [NOME],

Sua inscrição para o evento "Como Comprar Seu Primeiro Imóvel na Itália" está confirmada! 🎉

📅 Data: 02 de Novembro (Sábado)
🕐 Horário: 16:00h (Brasília)
📍 Formato: Online e Gratuito

O que você vai aprender:
✓ As 5 melhores regiões para investir
✓ Custos reais e impostos
✓ Processo completo de compra
✓ Erros que custam caro
✓ BÔNUS EXCLUSIVO (revelado apenas ao vivo)

1 DIA ANTES do evento, enviaremos o link de acesso por e-mail e WhatsApp.

Salve a data no calendário!

Nos vemos lá,
Aloisio - Brasilità
```

### **E-mail 2: Lembrete (01/11 - 1 dia antes)**
**Assunto:** 🔴 AMANHÃ às 16h - Link de Acesso Dentro

```
Olá [NOME],

AMANHÃ é o grande dia! 🚀

📅 02 de Novembro (Sábado)
🕐 16:00h (Horário de Brasília)

🔗 LINK DE ACESSO:
[LINK DO EVENTO]

Clique no link 5 minutos antes para garantir que está tudo funcionando.

O que você vai descobrir:
✓ Regiões mais rentáveis
✓ Custos completos
✓ Passo a passo da compra
✓ BÔNUS EXCLUSIVO 🎁

Importante: O bônus será revelado APENAS para quem participar ao vivo!

Até amanhã,
Aloisio - Brasilità
```

### **WhatsApp: Lembrete (02/11 - 15:45)**
```
🔴 COMEÇA EM 15 MINUTOS!

Link de acesso:
[LINK]

Nos vemos já já! 🇮🇹
```

### **E-mail 3: Pós-Evento (02/11 - 18h)**
**Assunto:** 🎁 Oferta Exclusiva - Apenas para Participantes

```
Olá [NOME],

Obrigado por participar do evento ao vivo!

Como prometido, aqui está a oferta EXCLUSIVA para quem participou:

🎯 BRASILITÀ INSIDER
Apenas €29/trimestre (primeiros 100)

O que está incluído:
✓ Curso completo em módulos
✓ Comunidade exclusiva no WhatsApp
✓ Lives mensais com a equipe
✓ Acesso antecipado a oportunidades
✓ Descontos na assessoria

[BOTÃO: GARANTIR VAGA €29]

⚠️ ATENÇÃO: Apenas 100 vagas com esse preço!
Depois vai para €39/trimestre.

Garantia de 7 dias - Sem risco!

Aloisio - Brasilità
```

---

## 📈 Métricas Para Acompanhar

### **Antes do Evento:**
- Visitas em `/insider-lead`
- Taxa de conversão do formulário
- Total de inscritos
- Origem do tráfego (Instagram, stories, bio)

### **Durante o Evento:**
- Participantes ao vivo
- Tempo médio de permanência
- Engajamento (perguntas, comentários)
- Cliques no link da oferta

### **Após o Evento:**
- Visitas em `/insider-launch`
- Taxa de conversão evento → venda
- Vendas nas primeiras 24h
- Vendas totais até atingir 100

### **Metas Realistas:**
- 500-1000 inscritos no evento
- 30-50% de presença ao vivo (150-500 pessoas)
- 10-20% de conversão (15-100 vendas)
- Receita: €435 - €2.900 (primeiro trimestre)

---

## ✅ Checklist de Implementação

### **Técnico (Concluído):**
- [x] Landing page de evento criada (`/insider-lead`)
- [x] Thank you page criada (`/insider-lead/thank-you`)
- [x] Formulário de registro funcional
- [x] Tabela no banco de dados
- [x] API endpoint criado
- [x] Countdown timer configurado
- [x] Landing de vendas pronta (`/insider-launch`)

### **Conteúdo (A Fazer):**
- [ ] Preparar apresentação do evento (slides/roteiro)
- [ ] Definir plataforma do evento (Zoom, Google Meet, YouTube Live)
- [ ] Criar templates de e-mail no sistema
- [ ] Configurar automação de e-mails
- [ ] Preparar posts de divulgação (feed + stories)

### **Divulgação (A Fazer):**
- [ ] Atualizar link da bio Instagram
- [ ] Criar posts anunciando evento
- [ ] Preparar stories templates
- [ ] Agendar posts para a semana
- [ ] Preparar carrossel com benefícios

---

## 🎨 Assets Necessários

### **Alta Prioridade:**
1. **Posts de Divulgação** (3-5 posts)
   - Anúncio do evento
   - Benefícios do evento
   - Countdown (faltam X dias)
   - Últimas vagas
   - Dia do evento

2. **Stories Templates** (10-15 stories)
   - Anúncio
   - Benefícios
   - Depoimentos (se tiver)
   - Countdown
   - Lembrete

3. **Apresentação do Evento** (Slides)
   - 20-30 slides
   - Visual profissional
   - Dados, gráficos, exemplos
   - Fotos de imóveis
   - Apresentação do Insider

### **Média Prioridade:**
4. **Thumbnail do Evento** (se for YouTube/gravado)
5. **Banner para Bio** do Instagram
6. **Certificado de Participação** (opcional, mas gera valor)

---

## 💡 Dicas Para Maximizar Resultados

### **No Evento:**
- ✅ Comece no horário (16h em ponto)
- ✅ Mostre dados reais (preços, rentabilidade)
- ✅ Conte histórias (cases de brasileiros)
- ✅ Seja específico (não genérico)
- ✅ Interaja com participantes (responda perguntas)
- ✅ Crie urgência real (primeiros 100 vagas)
- ❌ NÃO venda nos primeiros 40 minutos
- ❌ NÃO faça evento muito longo (max 90 min)

### **Na Oferta:**
- Mostre o valor completo (curso + comunidade + lives)
- Compare com o custo de errar (milhares de euros)
- Reforce a garantia de 7 dias
- Mostre que é recorrente (não one-time)
- Crie urgência (100 vagas, preço sobe)

### **Pós-Evento:**
- Envie e-mail IMEDIATAMENTE após
- Responda TODAS as mensagens rapidamente
- Compartilhe primeiras adesões (com permissão)
- Faça stories mostrando quantas vagas restam
- Mantenha energia e urgência

---

## 🚀 Próximos Passos Imediatos

1. **Definir plataforma do evento** (Zoom, Google Meet, YouTube Live)
2. **Preparar roteiro/slides** da apresentação
3. **Criar posts de divulgação** (3-5 posts)
4. **Atualizar link da bio** para `/insider-lead`
5. **Começar divulgação** hoje mesmo!
6. **Configurar e-mails automáticos** (confirmação, lembrete)
7. **Testar formulário** e fluxo completo

---

**Criado em:** 23 de outubro de 2025  
**Evento:** 02 de novembro de 2025 às 16h  
**Status:** ✅ Implementação técnica concluída - Pronto para divulgar!

