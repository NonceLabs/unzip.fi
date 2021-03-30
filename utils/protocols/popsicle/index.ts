import { getContract, getTokenSymbol, getLPTokenSymbols } from '@utils/common'
import { formatBalance } from '@utils/format'
import { getLPTokenPrice, getPrice } from '@utils/price'
const mainStakingABI = require('./popsicleABI.json')

const ICE_TOKEN_ADDRESS = '0xf16e81dce15b08f326220742020379b855b87df9'

const getPool = async (
  contract: any,
  index: number,
  account: string | null | undefined
) => {
  try {
    const poolInfo = await contract.poolInfo(index)

    const userInfo = await contract.userInfo(index, account)

    if (Number(formatBalance(userInfo.amount)) === 0) {
      return null
    }

    let isLPToken = false
    let stakedTokenPrice = 1
    const symbol = await getTokenSymbol(poolInfo.stakingToken)
    let poolName = symbol

    if (symbol === 'Cake-LP') {
      isLPToken = true
      const { token0, token1 } = await getLPTokenSymbols(poolInfo.stakingToken)
      poolName = `${token0}/${token1}`
      stakedTokenPrice = await getLPTokenPrice(poolInfo.stakingToken)
    } else {
      stakedTokenPrice = await getPrice(poolInfo.stakingToken)
    }

    const iceTokenPrice = await getPrice(ICE_TOKEN_ADDRESS)
    const pendingIce = await contract.pendingIce(index, account)

    return {
      isLPToken: true,
      poolName,
      stakedToken: {
        balance: formatBalance(userInfo.amount),
        contract: poolInfo.lpToken,
        symbol: poolName,
        price: stakedTokenPrice,
      },
      pendingToken: {
        balance: formatBalance(pendingIce),
        symbol: 'ICE',
        contract: ICE_TOKEN_ADDRESS,
        price: iceTokenPrice,
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
    mainStakingABI.abi,
    '0x05200cb2cee4b6144b2b2984e246b52bb1afcbd0'
  )

  try {
    const poolLength = await contract.poolLength()
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
