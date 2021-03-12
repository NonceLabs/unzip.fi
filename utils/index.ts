export const isMobile = () => {
  if (typeof navigator !== 'undefined') {
    return /Mobile/i.test(navigator.userAgent)
  }
  return false
}

export const CURRENCY_SYMBOLS = {
  JPY: '¥',
  CNY: '¥',
  EUR: '€',
  USD: '$',
  KRW: '₩',
}

export const CURRENCIES = ['USD', 'CNY', 'EUR', 'JPY', 'KRW']
