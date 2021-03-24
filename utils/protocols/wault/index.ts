import { getContract, getTokenSymbol, getLPTokenSymbols } from '@utils/common'
import { formatBalance } from '@utils/format'
import { getLPTokenPrice, getPrice } from '@utils/price'
const waultLiquilityABI = require('./waultLiquilityABI.json')
const waultStakingABI = require('./waultStakingABI.json')

const WAULT_TOKEN_ADDRESS = '0xA7f552078dcC247C2684336020c03648500C6d9F'

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

    let poolName = `${poolInfo.lockupDuration / (24 * 60 * 60)} DAYS LOCKUP`

    const pendingRewards = await contract.pendingRewards(index, account)

    const waultTokenPrice = await getPrice(WAULT_TOKEN_ADDRESS)

    return {
      isLPToken: false,
      poolName,
      stakedToken: {
        balance: formatBalance(userInfo.amount),
        contract: WAULT_TOKEN_ADDRESS,
        symbol: poolName,
        price: waultTokenPrice,
      },
      pendingToken: {
        balance: formatBalance(pendingRewards),
        symbol: 'WAULT',
        contract: WAULT_TOKEN_ADDRESS,
        price: waultTokenPrice,
      },
    }
  } catch (error) {
    return null
  }
}

const getLiquilityPool = async (contract: any, account: string) => {
  try {
    const userInfo = await contract.userInfo(account)
    if (Number(formatBalance(userInfo.amount)) === 0) {
      return null
    }
    const pendingRewards = await contract.pendingRewards(account)
    const LP_CONTRACT = '0x1f280a4fa78f5805bac193dddafeb77b16da4614'
    const lpTokenPrice = await getLPTokenPrice(LP_CONTRACT)
    const waultTokenPrice = await getPrice(WAULT_TOKEN_ADDRESS)
    const poolName = 'WAULT/BNB'

    return {
      isLPToken: false,
      poolName,
      stakedToken: {
        balance: formatBalance(userInfo.amount),
        contract: LP_CONTRACT,
        symbol: poolName,
        price: lpTokenPrice,
      },
      pendingToken: {
        balance: formatBalance(pendingRewards),
        symbol: 'WAULT',
        contract: WAULT_TOKEN_ADDRESS,
        price: waultTokenPrice,
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

  const liquilityContract = getContract(
    waultLiquilityABI.abi,
    '0x6f7a2b868a3babd26415fd4e8e2fee2630c9a74d'
  )

  const liquilityPool = await getLiquilityPool(liquilityContract, account)

  const stakingContract = getContract(
    waultStakingABI.abi,
    '0x52a2b3beafa46ba51a4792793a7447396d09423f'
  )

  try {
    const poolPromises = []
    for (let index = 0; index < 3; index++) {
      poolPromises.push(getPool(stakingContract, index, account))
    }
    const result = await Promise.all(poolPromises)
    return [...result, liquilityPool].filter((t) => t !== null) as PoolInfo[]
  } catch (error) {
    return []
  }
}
