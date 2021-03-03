export const isMobile = () => {
  if (typeof navigator !== 'undefined') {
    return /Mobile/i.test(navigator.userAgent)
  }
  return false
}
