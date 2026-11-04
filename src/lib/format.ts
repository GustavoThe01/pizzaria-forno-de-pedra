const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export const formatCurrency = (value: number): string => currencyFormatter.format(value);

export const onlyDigits = (value: string): string => value.replace(/\D/g, '');

/** Formata um telefone nacional enquanto é digitado: (85) 99999-9999. */
export const formatPhone = (value: string): string => {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  const prefixLength = digits.length === 11 ? 7 : 6;
  const prefix = digits.slice(2, prefixLength);
  const suffix = digits.slice(prefixLength);
  return `(${digits.slice(0, 2)}) ${prefix}${suffix ? `-${suffix}` : ''}`;
};

/** Converte o número internacional do WhatsApp (55...) para exibição nacional. */
export const formatWhatsappNumber = (international: string): string =>
  formatPhone(international.replace(/^55/, ''));

/** Remove acentos e caixa para que "camarao" encontre "Camarão". */
export const normalizeText = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
