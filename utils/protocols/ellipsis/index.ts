import { getContract, getTokenSymbol, getLPTokenSymbols } from '@utils/common'
import { formatBalance } from '@utils/format'
import { getLPTokenPrice, getPrice } from '@utils/price'
const mainStakingABI = require('./ellipsisABI.json')

const EPS_TOKEN_ADDRESS = '0xA7f552078dcC247C2684336020c03648500C6d9F'

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
    const symbol = await getTokenSymbol(poolInfo.lpToken)
    let poolName = symbol

    if (symbol === 'Cake-LP') {
      isLPToken = true
      const { token0, token1 } = await getLPTokenSymbols(poolInfo.lpToken)
      poolName = `${token0}/${token1}`
      stakedTokenPrice = await getLPTokenPrice(poolInfo.lpToken)
    } else if (symbol === '3EPS') {
      stakedTokenPrice = await getPrice(
        '0xe9e7cea3dedca5984780bafc599bd69add087d56'
      )
    } else {
      stakedTokenPrice = await getPrice(poolInfo.lpToken)
    }

    const epsTokenPrice = await getPrice(EPS_TOKEN_ADDRESS)

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
        balance: formatBalance(userInfo.rewardDebt),
        symbol: 'EPS',
        contract: EPS_TOKEN_ADDRESS,
        price: epsTokenPrice,
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
    '0xcce949De564fE60e7f96C85e55177F8B9E4CF61b'
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
