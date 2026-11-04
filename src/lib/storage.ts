/**
 * Acesso seguro ao localStorage. Dados corrompidos ou armazenamento bloqueado
 * (modo privado, políticas do navegador) não podem derrubar a aplicação.
 */
export const STORAGE_KEYS = {
  cart: 'carrinho',
  orders: 'pedidos',
  deliveryPrefs: 'preferencias_entrega',
  disclaimerAccepted: 'portfolio_disclaimer_accepted',
} as const;

export function readStorage<T>(key: string, fallback: T, isValid: (value: unknown) => boolean): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Sem armazenamento, o estado continua válido durante a sessão atual.
  }
}
