import numeral from 'numeral'

export const thousandCommas = (num: string | number, place: number = 4) => {
  const decimals = '0'.repeat(place)
  return numeral(num).format(`0,0.[${decimals}]`)
}
