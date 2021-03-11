import { getContract, formatBalance, getLPTokenSymbols } from '../../common'
import { getLPTokenPrice, getPrice } from '../../price'
const autofarmABI = require('./autofarm.json')
const pancakeABI = require('../pancake/pancake.json')

const AUTO_TOKEN_ADDRESS = '0xa184088a740c695e156f91f5cc086a06bb78b827'

const getPool = async (
  contract: any,
  index: number,
  account: string | null | undefined
): Promise<PoolInfo | null> => {
  try {
    const stakedBalance = await contract.stakedWantTokens(index, account)

    if (Number(formatBalance(stakedBalance)) === 0) {
      return null
    }
    const pendingAUTO = await contract.pendingAUTO(index, account)

    const poolInfo = await contract.poolInfo(index)
    const lpContract = getContract(pancakeABI.abi, poolInfo.want)
    const symbol = await lpContract.symbol()
    let poolName = symbol
    let isLPToken = false
    let stakedTokenPrice = await getLPTokenPrice(poolInfo.want)
    if (symbol === 'Cake-LP') {
      isLPToken = true
      const { token0, token1 } = await getLPTokenSymbols(poolInfo.want)
      poolName = `${token0}/${token1}`
    } else {
      stakedTokenPrice = await getPrice(poolInfo.want)
    }
    const autoPrice = await getPrice(AUTO_TOKEN_ADDRESS)
    return {
      isLPToken,
      poolName,
      stakedToken: {
        balance: formatBalance(stakedBalance),
        contract: poolInfo.want,
        symbol: poolName,
        price: stakedTokenPrice,
      },
      pendingToken: {
        balance: formatBalance(pendingAUTO),
        symbol: 'AUTO',
        contract: AUTO_TOKEN_ADDRESS,
        price: autoPrice,
      },
    }
  } catch (error) {
    return null
  }
}

export const getPoolsStat = async (
  account: string | null | undefined
): Promise<PoolInfo[]> => {
  if (!account) {
    return []
  }

  const contract = getContract(
    autofarmABI.abi,
    '0x0895196562c7868c5be92459fae7f877ed450452'
  )

  try {
    const poolLength = Number(await contract.poolLength())
    const poolPromises = []
    for (let index = 0; index < poolLength; index++) {
      poolPromises.push(getPool(contract, index, account))
    }
    const result = await Promise.all(poolPromises)
    return result.filter((t) => t !== null) as PoolInfo[]
  } catch (error) {
    return []
  }
}
