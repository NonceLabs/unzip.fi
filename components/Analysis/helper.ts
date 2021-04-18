import { calcValue } from '@utils/price'
import { formatBalance } from '@utils/format'

export const genAnalysisData = (
  bnbPrice: number,
  tokens: AssetToken[],
  farms: ProjectProps[]
) => {
  let data = []

  let accountValue = 0
  let shares = []
  tokens.map((t) => {
    const v = Number(
      (formatBalance(t.balance, t.contract_decimals) * t.quote_rate).toFixed(0)
    )
    accountValue = accountValue + v
    shares.push({
      label: t.contract_ticker_symbol,
      value: v,
    })
  })
  shares = shares.map((t) => {
    return {
      ...t,
      usage: (t.value * 100) / accountValue,
    }
  })
  data.push({
    label: 'Wallet',
    value: accountValue,
    shares,
  })

  farms.map((f, idx) => {
    let v = 0
    let shares = []
    f.pools.map((p) => {
      const pv = calcValue(p, bnbPrice)
      v += Number(pv)
      shares.push({
        label: p.poolName,
        value: pv,
      })
    })
    shares = shares.map((t) => {
      return {
        ...t,
        usage: (t.value * 100) / v,
      }
    })
    data.push({
      label: f.name,
      value: v,
      shares,
    })
  })

  let total = 0
  data.map((t) => (total += t.value))
  data = data.map((t) => {
    return {
      ...t,
      usage: (t.value * 100) / total,
    }
  })

  return data
}
