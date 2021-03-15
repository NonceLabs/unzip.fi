import { getContract, getTokenSymbol, getLPTokenSymbols } from '@utils/common'
import { formatBalance } from '@utils/format'
import icons from '@utils/icons'
import { getPrice, getLPTokenPrice } from '@utils/price'
const alpacaStakeABI = require('./alpacaStake.json')
const alpacaTokenABI = require('./alapcaToken.json')

const ALPACA_TOKEN_ADDRESS = '0x8f0528ce5ef7b51152a59745befdd91d97091d2f'
const ALPACA_STAKE_ADDRESS = '0xa625ab01b08ce023b2a342dbb12a16f2c8489a8f'

const getPool = async (
  contract: any,
  index: number,
  account: string | null | undefined
): Promise<PoolInfo | null> => {
  try {
    const userInfo = await contract.userInfo(index, account)

    if (Number(formatBalance(userInfo.amount)) === 0) {
      return null
    }

    const pendingAlpaca = await contract.pendingAlpaca(index, account)

    const poolInfo = await contract.poolInfo(index)

    let isLPToken = false
    let stakedTokenPrice = 1
    const symbol = await getTokenSymbol(poolInfo.stakeToken)
    let poolName = symbol

    const alpacaPrice = await getPrice(ALPACA_TOKEN_ADDRESS)

    if (symbol === 'Cake-LP') {
      isLPToken = true
      const { token0, token1 } = await getLPTokenSymbols(poolInfo.stakeToken)
      poolName = `${token0}/${token1}`
      stakedTokenPrice = await getLPTokenPrice(poolInfo.stakeToken)
    } else {
      stakedTokenPrice = await getPrice(poolInfo.stakeToken)
    }
    return {
      isLPToken,
      poolName,
      stakedToken: {
        balance: formatBalance(userInfo.amount),
        symbol: poolName,
        contract: poolInfo.stakeToken,
        price: stakedTokenPrice,
      },
      pendingToken: {
        balance: formatBalance(pendingAlpaca),
        symbol: 'ALPACA',
        price: alpacaPrice,
        contract: ALPACA_TOKEN_ADDRESS,
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

  const contract = getContract(alpacaStakeABI.abi, ALPACA_STAKE_ADDRESS)

  const bep20Contract = getContract(alpacaTokenABI.abi, ALPACA_TOKEN_ADDRESS)
  const lockOf = await bep20Contract.lockOf(account)
  const price = await getPrice(ALPACA_TOKEN_ADDRESS)
  try {
    const poolLength = Number(await contract.poolLength())
    const poolPromises = []
    for (let index = 0; index < poolLength; index++) {
      poolPromises.push(getPool(contract, index, account))
    }
    const result = await Promise.all(poolPromises)

    const balanceOfLocked = formatBalance(lockOf)
    if (balanceOfLocked > 0) {
      result.push({
        isLPToken: false,
        poolName: 'Locked',
        stakedToken: {
          symbol: 'ALPACA',
          contract: ALPACA_TOKEN_ADDRESS,
          balance: balanceOfLocked,
          price,
          label: 'locked',
        },
      })
    }
    return result.filter((t) => t !== null) as PoolInfo[]
  } catch (error) {
    return []
  }
}
