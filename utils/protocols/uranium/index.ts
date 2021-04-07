import { getContract, getTokenSymbol, getLPTokenSymbols } from '@utils/common'
import { formatBalance } from '@utils/format'
import { getLPTokenPrice, getPrice } from '@utils/price'
const mainStakingABI = require('./uraniumABI.json')
const factoryABI = require('./factory.json')
const lpTokenABI = require('./lpToken.json')

const RADS_TOKEN_ADDRESS = '0x7ca1eBC56496E3D78E56D71A127ea9d1717c4bE0'

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
    if (poolName === 'RADS-LP') {
      stakedTokenPrice = await getLPTokenPrice(
        poolInfo.lpToken,
        lpTokenABI.abi,
        factoryABI.abi,
        '0x2C39801cc496E01B163CD3314295C30A98A26ef3'
      )
      const { token0, token1 } = await getLPTokenSymbols(poolInfo.lpToken)
      poolName = `${token0}/${token1}`
    } else {
      stakedTokenPrice = await getPrice(
        poolInfo.lpToken,
        factoryABI.abi,
        '0x2C39801cc496E01B163CD3314295C30A98A26ef3'
      )
    }

    const pendingRads = await contract.pendingRads(index, account)

    const radsTokenPrice = await getPrice(
      RADS_TOKEN_ADDRESS,
      factoryABI.abi,
      '0x2C39801cc496E01B163CD3314295C30A98A26ef3'
    )

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
        balance: formatBalance(pendingRads),
        symbol: 'RADS',
        contract: RADS_TOKEN_ADDRESS,
        price: radsTokenPrice,
      },
    }
  } catch (error) {
    console.log('###', error)
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
    '0xD5aAc41D315c1d382DcF1C39D4ed9B37C224edf2'
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
