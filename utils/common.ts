import Contract from 'web3-eth-contract'
import { formatEther } from '@ethersproject/units'
import { getPrice } from './price'
const pancakeABI = require('./protocols/pancake/pancake.json')
const bep20ABI = require('./abis/BEP20.json')
import { getProvider } from '../components/Web3Provider'

export const getContract = (abi: any, address: string) => {
  //@ts-ignore
  Contract.setProvider(window.web3.currentProvider)
  //@ts-ignore
  const contract = new Contract(abi, address)
  Object.keys(contract.methods).forEach((key) => {
    if (!key.startsWith('0x')) {
      contract[key] = async (...args: any) => {
        return await contract.methods[key](...args).call()
      }
    }
  })
  return contract
}

export const getTokenInfo = async (
  address: string,
  account: string
): Promise<TokenInfo> => {
  if (address === '0x0000000000000000000000000000000000000000') {
    const provider = getProvider()
    if (provider) {
      try {
        const balance = await provider.getBalance(account)
        return {
          balance: formatBalance(balance.toString()),
          price: 1,
          contract: address,
          symbol: 'BNB',
        }
      } catch (error) {}
    }
    return {
      balance: 0,
      price: 1,
      contract: address,
      symbol: 'BNB',
    }
  }
  const bep20Contract = getContract(bep20ABI.abi, address)
  try {
    const balance = await bep20Contract.balanceOf(account)
    const price = await getPrice(address)
    const symbol = await bep20Contract.symbol()
    return {
      balance: formatBalance(balance),
      price,
      symbol,
      contract: address,
    }
  } catch (error) {
    return {
      balance: 0,
      price: 0,
      symbol: '',
      contract: address,
    }
  }
}

export const getTokenSymbol = async (tokenAddress: string) => {
  const contract = getContract(pancakeABI.abi, tokenAddress)
  try {
    const symbol = await contract.symbol()
    return symbol
  } catch (error) {
    return '?'
  }
}

export const getLPTokenSymbols = async (lpTokenAddress: string) => {
  const contract = getContract(pancakeABI.abi, lpTokenAddress)
  try {
    const token0Address = await contract.token0()
    const token1Address = await contract.token1()
    const token0 = await getTokenSymbol(token0Address)
    const token1 = await getTokenSymbol(token1Address)
    return {
      token0,
      token1,
      token0Address,
      token1Address,
    }
  } catch (error) {
    return {
      token0: '',
      token1: '',
      token0Address: '',
      token1Address: '',
    }
  }
}

export const ellipsis = (
  str: string,
  lead: number = 8,
  tail: number = 6
): string => {
  if (str && str.length > lead + tail + 8) {
    return `${str.substring(0, lead)}...${str.substring(
      str.length - tail,
      str.length
    )}`
  }
  return str
}

export const formatBalance = (value: number | string): number => {
  const _v = formatEther(value)
  const _vn = Number(_v)
  if (_vn === 0) {
    return 0
  }
  return Number(_vn.toFixed(4))
}
