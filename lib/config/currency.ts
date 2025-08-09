// Configuração de cotação EUR/BRL
// Este valor pode ser alterado facilmente conforme necessário
export const CURRENCY_CONFIG = {
  EUR_TO_BRL_RATE: 6.40, // 1 EUR = 6.40 BRL (valor aproximado)
  LAST_UPDATED: "2024-01-15", // Data da última atualização (opcional)
} as const;

// Função utilitária para converter EUR para BRL
export function convertEurToBrl(eurAmount: number): number {
  return eurAmount * CURRENCY_CONFIG.EUR_TO_BRL_RATE;
}

// Função utilitária para formatar valores em BRL
export function formatBrlCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Função utilitária para formatar valores em EUR
export function formatEurCurrency(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
} 