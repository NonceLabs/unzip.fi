import Contract from 'web3-eth-contract'
import { formatEther } from '@ethersproject/units'
const pancakeABI = require('./protocols/pancake/pancake.json')
const bep20ABI = require('./abis/BEP20.json')

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

export const formatBalance = (value: number | string): string | number => {
  const _v = formatEther(value)
  const _vn = Number(_v)
  if (_vn === 0) {
    return 0
  }
  return _vn.toFixed(4)
}
