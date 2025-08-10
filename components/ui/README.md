# Componentes UI

## Loading

Componente de loading padrão do sistema, baseado no design original do checklist.

### Uso

```tsx
import { Loading } from "@/components/ui/loading";

// Uso básico
<Loading />

// Com mensagem personalizada
<Loading message="Carregando dados..." />

// Com tamanho diferente
<Loading size="sm" message="Processando..." />
<Loading size="lg" message="Carregando aplicação..." />

// Com className personalizada
<Loading className="my-custom-class" />
```

### Props

- `message?: string` - Mensagem exibida abaixo do ícone (padrão: "Carregando...")
- `size?: "sm" | "md" | "lg"` - Tamanho do loading (padrão: "md")
- `className?: string` - Classes CSS adicionais

### Tamanhos

- `sm`: Ícone 5x5, container 200px de altura mínima
- `md`: Ícone 8x8, container 400px de altura mínima (padrão)
- `lg`: Ícone 12x12, container 600px de altura mínima

### Características

- Ícone Building animado (spin)
- Cor primária do sistema
- Container responsivo com padding
- Centralizado vertical e horizontalmente
- Compatível com Tailwind CSS
