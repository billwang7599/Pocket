/**
 * Standard currency constants used throughout the application
 */
export const CURRENCIES = [
  { id: 1, code: "USD", name: "USD", symbol: "$" },
  { id: 2, code: "EUR", name: "EUR", symbol: "€" },
  { id: 3, code: "GBP", name: "GBP", symbol: "£" },
  { id: 4, code: "JPY", name: "JPY", symbol: "¥" },
  { id: 5, code: "CAD", name: "CAD", symbol: "C$" },
  { id: 6, code: "AUD", name: "AUD", symbol: "A$" },
  { id: 7, code: "CHF", name: "CHF", symbol: "Fr" },
  { id: 8, code: "CNY", name: "CNY", symbol: "¥" },
  { id: 9, code: "INR", name: "INR", symbol: "₹" },
  { id: 10, code: "BRL", name: "BRL", symbol: "R$" },
];

/**
 * Get a currency by its ID
 */
export function getCurrencyById(id: number) {
  return CURRENCIES.find(currency => currency.id === id) || CURRENCIES[0];
}

/**
 * Get a currency by its code
 */
export function getCurrencyByCode(code: string) {
  return CURRENCIES.find(currency => currency.code === code) || CURRENCIES[0];
}

/**
 * Format a number as currency
 */
export function formatCurrency(amount: number, currencyId: number) {
  const currency = getCurrencyById(currencyId);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.code,
  }).format(amount);
}
