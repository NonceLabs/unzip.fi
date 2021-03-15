import { getContract, getLPTokenSymbols } from '@utils/common'
import { formatBalance } from '@utils/format'
import { getLPTokenPrice, getPrice } from '@utils/price'
const mainStakingABI = require('./mainstaking.json')

const CAKE_TOKEN_ADDRESS = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'

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

    const pendingCake = await contract.pendingCake(index, account)

    const { token0, token1 } = await getLPTokenSymbols(poolInfo.lpToken)
    const poolName = `${token1}/${token0}`

    const stakedTokenPrice = await getLPTokenPrice(poolInfo.lpToken)
    const cakePrice = await getPrice(CAKE_TOKEN_ADDRESS)
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
        balance: formatBalance(pendingCake),
        symbol: 'Cake',
        contract: CAKE_TOKEN_ADDRESS,
        price: cakePrice,
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
    '0x73feaa1ee314f8c655e354234017be2193c9e24e'
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
