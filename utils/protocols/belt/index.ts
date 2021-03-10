import {
  getContract,
  formatBalance,
  getTokenSymbol,
  getLPTokenSymbols,
} from '../../common'
import { getLPTokenPrice, getPrice } from '../../price'
const mainStakingABI = require('./beltABI.json')

const BELT_TOKEN_ADDRESS = '0xE0e514c71282b6f4e823703a39374Cf58dc3eA4f'

const getPool = async (
  contract: any,
  index: number,
  account: string | null | undefined
) => {
  try {
    const poolInfo = await contract.poolInfo(index)

    const userInfo = await contract.userInfo(index, account)

    if (Number(formatBalance(userInfo.shares)) === 0) {
      return null
    }

    let isLPToken = false
    let stakedTokenPrice = 1
    const symbol = await getTokenSymbol(poolInfo.want)
    let poolName = symbol

    if (symbol === 'Cake-LP') {
      isLPToken = true
      const { token0, token1 } = await getLPTokenSymbols(poolInfo.want)
      poolName = `${token0}/${token1}`
      stakedTokenPrice = await getLPTokenPrice(poolInfo.want)
    } else {
      // TODO: get price
      if (poolInfo.want === '0x86aFa7ff694Ab8C985b79733745662760e454169') {
        stakedTokenPrice = await getPrice(
          '0xe9e7cea3dedca5984780bafc599bd69add087d56'
        )
        stakedTokenPrice *= 1.02
      } else {
        stakedTokenPrice = await getPrice(poolInfo.want)
      }
    }

    const beltTokenPrice = await getPrice(BELT_TOKEN_ADDRESS)
    const pendingBelt = await contract.pendingBELT(index, account)

    return {
      isLPToken: true,
      poolName,
      stakedToken: {
        balance: formatBalance(userInfo.shares),
        contract: poolInfo.lpToken,
        symbol: poolName,
        price: stakedTokenPrice,
      },
      pendingToken: {
        balance: formatBalance(pendingBelt),
        symbol: 'BELT',
        contract: BELT_TOKEN_ADDRESS,
        price: beltTokenPrice,
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
    '0xd4bbc80b9b102b77b21a06cb77e954049605e6c1'
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
    console.log('###', error)
    return []
  }
}
