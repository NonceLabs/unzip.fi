import { getContract, getLPTokenSymbols } from '@utils/common'
const factoryABI = require('./factory.json')
const pancakeABI = require('@utils/protocols/pancake/pancake.json')
import { MAIN_TOKEN_ADDRESS, WBNB_TOKEN_ADDRESS } from '@utils/constanst'

const isBNBAddress = (address: string) =>
  [MAIN_TOKEN_ADDRESS, WBNB_TOKEN_ADDRESS].includes(address)

const MAP = {
  '0xd7d069493685a581d27824fc46eda46b7efc0063': WBNB_TOKEN_ADDRESS,
  '0xD19D6253D979cCF663869fee30b8e0Ac86029ebd':
    '0x55d398326f99059ff775485246999027b3197955', // BUSD
  '0x7c9e73d4c71dae564d41f78d56439bb4ba87592f':
    '0x55d398326f99059ff775485246999027b3197955',
}

export const getLPTokenPrice = async (
  tokenAddress: string,
  abi = pancakeABI.abi,
  factoryAbi = factoryABI.abi,
  factoryAddress = '0xBCfCcbde45cE874adCB698cC183deBcF17952812'
): Promise<number> => {
  try {
    const lpContract = getContract(abi, tokenAddress)
    const totalSupply = await lpContract.totalSupply()
    const reserves = await lpContract.getReserves()
    const { token0Address, token1Address } = await getLPTokenSymbols(
      tokenAddress
    )
    let token0Price = 1
    let token1Price = 1
    if (isBNBAddress(token0Address)) {
      token1Price = reserves._reserve0 / reserves._reserve1
    } else if (isBNBAddress(token1Address)) {
      token0Price = reserves._reserve1 / reserves._reserve0
    } else {
      token0Price = await getPrice(token0Address, factoryAbi, factoryAddress)
      token1Price = await getPrice(token1Address, factoryAbi, factoryAddress)
    }
    console.log('###', token0Price, token1Price)
    return (
      (token0Price * reserves._reserve0 + token1Price * reserves._reserve1) /
      totalSupply
    )
  } catch (error) {
    console.log('###', error)
    return 0
  }
}

export const getPrice = async (
  tokenAddress: string,
  abi = factoryABI.abi,
  factoryAddress = '0xBCfCcbde45cE874adCB698cC183deBcF17952812'
): Promise<number> => {
  const parsedAddress = tokenAddress.toLowerCase()
  // @ts-ignore
  const tAddress = MAP[parsedAddress] ? MAP[parsedAddress] : parsedAddress
  if (tAddress === WBNB_TOKEN_ADDRESS) return 1

  try {
    const contract = getContract(abi, factoryAddress)
    const pair = await contract.getPair(tAddress, WBNB_TOKEN_ADDRESS) // token, wbnb

    if (pair === MAIN_TOKEN_ADDRESS) {
      return 0
    }
    const lpContract = getContract(pancakeABI.abi, pair)
    const token0Address = await lpContract.token0()
    const token1Address = await lpContract.token1()
    const reserves = await lpContract.getReserves()
    console.log('###', reserves)
    if (token1Address.toLowerCase() === tokenAddress.toLowerCase()) {
      return reserves._reserve0 / reserves._reserve1
    } else {
      return reserves._reserve1 / reserves._reserve0
    }
  } catch (error) {
    console.log('###', error)
    return 0
  }
}

export const calcValue = (pool: PoolInfo, price: number) => {
  console.log('###', pool)
  let v = 0
  v += Number(pool.stakedToken.balance) * Number(pool.stakedToken.price)
  if (pool.pendingToken) {
    v += Number(pool.pendingToken.balance) * Number(pool.pendingToken.price)
  }
  return (v * price).toFixed(0)
}

export const getAssetValue = () => {}
