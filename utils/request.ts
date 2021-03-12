import _ from 'lodash'
import { getTokenInfo } from './common'
import { ASSET_TOKENS } from '../components/Assets/config'
import { CURRENCIES } from './index'

const API_KEY = '3B9KB3G5YKFVBU941BQDV15YABZVXZIDMR'
const AssetTokens_Key = 'AssetTokens'

export const addCustomToken = (address: string) => {
  const localTokens = localStorage.getItem(AssetTokens_Key)
  if (localTokens) {
    const oldTokens = localTokens.split(':')
    localStorage.setItem(
      AssetTokens_Key,
      _.uniq([...oldTokens, address]).join(':')
    )
  } else {
    localStorage.setItem(AssetTokens_Key, address)
  }
}

export const fetchCurrencies = (callback: fn) => {
  return fetch(
    `https://api.exchangeratesapi.io/latest?base=USD&symbols=${CURRENCIES.join(
      ','
    )}`
  )
    .then((response) => {
      if (response.status !== 200) {
        return
      }
      response.json().then((data) => {
        callback(data.rates)
      })
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err)
    })
}

export const fetchBNBPrice = (callback: fn) => {
  fetch(
    `https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=${API_KEY}`
  )
    .then((response) => {
      if (response.status !== 200) {
        return
      }
      response.json().then((data) => {
        callback(data.result.ethusd)
      })
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err)
    })
}

const getBatchTokenInfo = async (contracts: string[], account: string) => {
  const requests = contracts.map((t, idx) => getTokenInfo(t, account))
  try {
    const tokens = await Promise.all(requests)
    return tokens
  } catch (error) {
    return []
  }
}

export const fetchAssetTokens = async (account: string) => {
  const localTokens = localStorage.getItem(AssetTokens_Key)
  try {
    let tokenContractAdresses = []
    try {
      const offset = localTokens ? 100 : 300
      const response = await fetch(
        `https://api.bscscan.com/api?module=account&action=tokentx&address=${account}&page=1&offset=${offset}&sort=asc&sort=asc&apikey=${API_KEY}`
      )
      const json = await response.json()
      const transactions = json.result
      const _transactions = _.uniqBy(transactions, 'contractAddress')
      tokenContractAdresses = (_transactions as any).map(
        (t) => t.contractAddress
      )
    } catch (error) {}

    let tokens = []
    if (localTokens) {
      const _localTokens = localTokens.split(':')
      const _allTokens = _.uniq(
        [...tokenContractAdresses, ..._localTokens].concat(
          ASSET_TOKENS.map((t) => t.address)
        )
      )
      tokens = await getBatchTokenInfo(_allTokens, account)
    } else {
      tokens = await getBatchTokenInfo(
        tokenContractAdresses.concat(ASSET_TOKENS.map((t) => t.address)),
        account
      )
    }

    const balancedTokens = tokens.filter((t) => t.balance > 0)
    localStorage.setItem(
      AssetTokens_Key,
      balancedTokens.map((t) => t.contract).join(':')
    )

    return balancedTokens
  } catch (error) {}
}
