# Idealista Property Data Extractor

Script para extrair dados de propriedades do idealista.it no browser e gerar JSON no formato especificado.

## 📁 Arquivos

- `extract-property-browser.js` - Script principal para browser
- `package.json` - Configuração do projeto  
- `README.md` - Esta documentação

## 🌐 Como Usar (Browser)

1. **Navegue** até uma página de propriedade no idealista.it
2. **Abra o console** do navegador (F12)
3. **Copie e cole** todo o conteúdo do arquivo `extract-property-browser.js`
4. **Pressione Enter**
5. O console será limpo e mostrará **apenas o JSON limpo**

### 🖱️ Como copiar o JSON:

- **Método 1**: Clique com botão direito no JSON → "Copy object"
- **Método 2**: Digite `copy(window.extractedProperty)` no console
- **Método 3**: Selecione o JSON e Ctrl+C (método tradicional)

## 📊 Formato do JSON Gerado

```json
{
    "title": "Apartamento 2 divisões à venda em Via IV Novembre",
    "description": "OPORTUNIDADE Ótimo Investimento - Apartamento Confortável no Município de Sant'Omobono Terme...",
    "price": 26000,
    "location": "Sant'Omobono Terme",
    "bedrooms": 2,
    "bathrooms": 1,
    "area": 40,
    "features": ["lugar de estacionamento descoberto", "segunda mão/bom estado", "orientação este, oeste"],
    "images": [
        "https://img4.idealista.it/blur/WEB_DETAIL_TOP-L-L/0/id.pro.it.image.master/b6/68/e3/668856752.jpg"
    ],
    "isRented": true,
    "isAvailable": true,
    "createdAt": "2025-08-13",
    "updatedAt": "2025-08-13"
}
```

## 📋 Dados Extraídos

- **title**: Título da propriedade extraído do elemento `.sticky-bar-detail-heading span`
- **description**: Descrição completa que começa com "OPORTUNIDADE" 
- **price**: Preço em euros extraído das variáveis JavaScript `window.adMultimediasInfo.price`
- **location**: Localização extraída do elemento `.main-info__title-minor`
- **bedrooms**: Número de quartos extraído das features JavaScript ou fallback para texto "X quartos"
- **bathrooms**: Número de casas de banho extraído do texto "X casa de banho"
- **area**: Área em metros quadrados extraída das features JavaScript ou fallback para "X m² área bruta"
- **features**: Array com características das seções "Características específicas" E "Prédio" + tipos de cômodos
- **images**: URLs de todas as imagens com qualidade alta (`WEB_DETAIL_TOP-L-L`)
- **isRented**: Detecta automaticamente se está arrendada (busca por "Arrendada" ou "inquilinos")
- **isAvailable**: Sempre true
- **createdAt/updatedAt**: Data atual no formato YYYY-MM-DD

## 🔍 Lógica de Extração

### Prioridades de Extração (Revisada e Otimizada):

1. **🥇 JavaScript Variables** (fonte principal)
   - `window.adMultimediasInfo.title` para título
   - `window.adMultimediasInfo.price` para preço
   - `window.adMultimediasInfo.features` para área, quartos, andar
   - `window.adMultimediasInfo.fullScreenGalleryPics` para imagens e tipos de cômodos

2. **🥈 Elementos DOM específicos** (complementar)
   - `.details-property_features li` para características específicas
   - Busca por texto "OPORTUNIDADE" para descrição
   - `.main-info__title-minor` para localização

3. **🥉 Análise de texto da página** (fallback)
   - Seção "Características específicas" para banheiros e features extras
   - Busca por padrões como "X casa de banho", "X quartos"
   - Detecção de status "Arrendada" ou "inquilinos"

4. **🏁 Fallbacks finais**
   - Meta tags quando elementos específicos não existem
   - Title tag para título
   - Elementos img quando JavaScript não está disponível

## ⚡ Exemplos de Uso

### Extrair e acessar dados específicos:
```javascript
// Após colar o script:
console.log('Preço:', window.extractedProperty.price);
console.log('Quartos:', window.extractedProperty.bedrooms);
console.log('Banheiros:', window.extractedProperty.bathrooms);
console.log('Alugada:', window.extractedProperty.isRented);
```

### Copiar dados facilmente:
```javascript
// Copiar objeto completo
copy(window.extractedProperty)

// Copiar apenas campos específicos
copy({
    title: window.extractedProperty.title,
    price: window.extractedProperty.price,
    location: window.extractedProperty.location
})
```

## 🔧 Requisitos

- **Navegador moderno** com suporte a ES6+
- **Console do navegador** habilitado
- Página carregada completamente no **idealista.it**

## 💡 Dicas

- ✅ O script prioriza **conteúdo do documento** ao invés de meta tags
- ✅ Imagens são extraídas em **alta qualidade** (`WEB_DETAIL_TOP-L-L`)
- ✅ Status de **aluguel detectado automaticamente**
- ✅ **Console limpo** - mostra apenas o JSON
- ✅ Funciona com páginas em **português** do idealista.it
- ⚠️ Aguarde a página carregar completamente antes de usar

## 🚨 Notas Importantes

- Este script é específico para **browser** apenas
- Funciona apenas em páginas do **idealista.it**
- Extrai dados da página **atualmente carregada**
- Para múltiplas propriedades, execute em cada página individualmente

## 🔧 Script Simplificado e Modular

### ✅ **Estrutura do Código:**

**Cada atributo do JSON tem sua própria função:**

- `extractTitle()` - Título da propriedade
- `extractDescription()` - Descrição completa (busca estrutural precisa + converte `<br>` em espaços)
- `extractLocation()` - Localização
- `extractPrice()` - Preço em euros
- `extractArea()` - Área em m²
- `extractBedrooms()` - Número de quartos
- `extractBathrooms()` - Número de banheiros
- `extractFeatures()` - Array de características
- `extractIsRented()` - Status de aluguel
- `extractImages()` - URLs das imagens

### 🎯 **Features Extraídas (Apenas do Anúncio):**

✅ **Extrai SOMENTE o que está escrito no anúncio**
✅ **NÃO inventa** informações como "tem vista", "tem banheiro"
✅ **Cada `<li>` = 1 feature** (simples e direto)
✅ **Remove duplicatas** e informações já capturadas em outros campos

```json
{
  "features": [
    "arrendada, com inquilinos",
    "lugar de estacionamento descoberto", 
    "segunda mão/bom estado",
    "orientação este, oeste",
    "construído em 1971",
    "certificação energética (lei n.º 90/2013, legislação atual): (desempenho energético não facilitado)",
    "acesso e imóvel adaptados a pessoas com mobilidade reduzida",
    "rés do chão",
    "sem elevador"
  ],
  "bathrooms": 1,
  "bedrooms": 2,
  "area": 40
}
```