import numeral from 'numeral'
import { formatEther } from '@ethersproject/units'
import BN from 'bn.js'

export const thousandCommas = (num: string | number, place: number = 4) => {
  const decimals = '0'.repeat(place)
  return numeral(num).format(`0,0.[${decimals}]`)
}

export const formatBalance = (value: number | string): number => {
  if (!value) {
    return 0
  }
  const _v = formatEther(value)
  const _vn = Number(_v)
  if (_vn === 0) {
    return 0
  }
  return Number(_vn.toFixed(4))
}

// export function fromDecimalToUnit(
//   balance: string | number,
//   decimal: number
// ) {
//    return new ethers.BigNumber(balance).div(Math.pow(10, decimal))
// }

// export function fromUnitToDecimal(
//   balance: string | number = 0,
//   decimal: number
// ): BN {
//   return math.toBN(balance).times(Math.pow(10, decimal))
// }
