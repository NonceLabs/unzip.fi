import _ from 'lodash'
import { getTokenInfo } from './common'
import { ASSET_TOKENS } from '@components/Assets/config'
import { CURRENCIES } from './constanst'

const API_KEY = '3B9KB3G5YKFVBU941BQDV15YABZVXZIDMR'
const AssetTokens_Key = 'AssetTokens'
const COVALENT_API_KEY = 'ckey_21ee3c85bb0241a5a96ae3cc13b'

export const fetchTransactionsByContract = async (
  account: string,
  contract: string
) => {
  return fetch(
    `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${contract}&address=${account}&page=1&offset=100&sort=desc&apikey=${API_KEY}`
  )
    .then((response) => {
      if (response.status !== 200) {
        return []
      }
      return response.json().then((data) => {
        return data.result
      })
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err)
    })
}

export const fetchTransactions = async (
  address: string,
  callback: fn,
  page = 1
) => {
  return fetch(
    `https://api.bscscan.com/api?module=account&action=tokentx&address=${address}&page=${page}&offset=30&sort=desc&apikey=${API_KEY}`
  )
    .then((response) => {
      if (response.status !== 200) {
        return
      }
      response.json().then((data) => {
        callback(data.result)
      })
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err)
    })
}

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
    `https://api.exchangeratesapi.io/latest?base=USD&access_key=575fb02be721c022cd311da9dc32d0ce&symbols=${CURRENCIES.join(
      ','
    )}`
  )
    .then((response) => {
      if (response.status !== 200) {
        return callback([])
      }
      response.json().then((data) => {
        callback(data.rates || [])
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
  try {
    const responseBSC = await fetch(
      `https://api.covalenthq.com/v1/56/address/0x726Ca0CA1b4f59e3De69a8d69D97262a10aF525A/balances_v2/?key=${COVALENT_API_KEY}`
    )
    const jsonBSC = await responseBSC.json()
    const resultBSC = jsonBSC.data.items
      .map((t) => {
        if (
          t.contract_address === '0xe9e7cea3dedca5984780bafc599bd69add087d56'
        ) {
          return { ...t, quote_rate: 1, chain_id: jsonBSC.data.chain_id }
        }
        return { ...t, chain_id: jsonBSC.data.chain_id }
      })
      .filter((t) => !(t.balance === '0' || !t.quote_rate))

    const responseETH = await fetch(
      `https://api.covalenthq.com/v1/1/address/0x726Ca0CA1b4f59e3De69a8d69D97262a10aF525A/balances_v2/?key=${COVALENT_API_KEY}`
    )
    const jsonETH = await responseETH.json()
    const resultETH = jsonETH.data.items
      .map((t) => {
        return { ...t, chain_id: jsonETH.data.chain_id }
      })
      .filter((t) => !(t.balance === '0' || !t.quote_rate))
    return [...resultETH, ...resultBSC]
  } catch (error) {
    return []
  }
}
