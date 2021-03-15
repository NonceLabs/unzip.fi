const boardroomABI = require('./boardroom.json')
const sharerewardpoolABI = require('./sharerewardpool.json')
import { getContract, getLPTokenSymbols } from '@utils/common'
import { formatBalance } from '@utils/format'
import icons from '@utils/icons'
import { getPrice, getLPTokenPrice } from '@utils/price'

const getShareTokenAddress = (isMidas: boolean) => {
  return isMidas
    ? '0x242e46490397acca94ed930f2c4edf16250237fa'
    : '0x0d9319565be7f53cefe84ad201be3f40feae2740'
}

export const getPoolsStat = async (
  account: string | null | undefined
): Promise<PoolInfo[]> => {
  try {
    const boardroomPool = await getBoardroomPoolInfo(
      account,
      '0x9D39cd20901c88030032073Fb014AaF79D84d2C5'
    )
    const sharePools = await getShareRewardPool(
      account,
      '0x948dB1713D4392EC04C86189070557C5A8566766'
    )
    return [boardroomPool, ...sharePools].filter((t) => !!t) as PoolInfo[]
  } catch (error) {
    return []
  }
}

export const getMidasPoolsStat = async (
  account: string | null | undefined
): Promise<PoolInfo[]> => {
  try {
    const boardroomPool = await getBoardroomPoolInfo(
      account,
      '0xFF0b41ad7a85430FEbBC5220fd4c7a68013F2C0d',
      true
    )
    const sharePools = await getShareRewardPool(
      account,
      '0xecC17b190581C60811862E5dF8c9183dA98BD08a',
      true
    )
    return [boardroomPool, ...sharePools].filter((t) => !!t) as PoolInfo[]
  } catch (error) {
    return []
  }
}

export const getBoardroomPoolInfo = async (
  account: string | null | undefined,
  contractAddress: string,
  isMidas = false
): Promise<PoolInfo | null> => {
  if (!account) {
    return null
  }
  const contract = getContract(boardroomABI.abi, contractAddress)
  try {
    const cToken = isMidas ? 'MDO' : 'BDO'
    const sToken = isMidas ? 'MDS' : 'sBDO'
    const cTokenAddress = isMidas
      ? '0x35e869b7456462b81cdb5e6e42434bd27f3f788c'
      : '0x190b589cf9fb8ddeabbfeae36a813ffb2a702454'
    const sTokenAddress = getShareTokenAddress(isMidas)

    const stakedValue = await contract.balanceOf(account)
    const earnedValue = await getBoardroomEarned(account, contractAddress)
    if (formatBalance(stakedValue) === 0 && formatBalance(earnedValue) === 0) {
      return null
    }

    const cTokenPrice = await getPrice(cTokenAddress)
    const sTokenPrice = await getPrice(sTokenAddress)

    return {
      isLPToken: false,
      poolName: 'Boardroom',
      stakedToken: {
        symbol: sToken,
        balance: formatBalance(stakedValue),
        contract: sTokenAddress,
        price: sTokenPrice,
      },
      pendingToken: {
        symbol: cToken,
        balance: earnedValue,
        contract: cTokenAddress,
        price: cTokenPrice,
      },
    }
  } catch (error) {
    return null
  }
}

export const getBoardroomEarned = async (
  account: string | null | undefined,
  contractAddress: string
) => {
  if (!account) {
    return 0
  }
  const contract = getContract(boardroomABI.abi, contractAddress)
  try {
    const balance = await contract.earned(account)
    return formatBalance(balance)
  } catch (error) {
    return 0
  }
}

const getSharePool = async (
  contract: any,
  index: number,
  account: string | null | undefined,
  isMidas: boolean
): Promise<PoolInfo | null> => {
  try {
    const pendingShare = await contract.pendingShare(index, account)
    const userInfo = await contract.userInfo(index, account)
    const poolInfo = await contract.poolInfo(index)

    if (Number(userInfo.amount) === 0) {
      return null
    }
    const sToken = isMidas ? 'MDS' : 'sBDO'

    const { token0, token1 } = await getLPTokenSymbols(poolInfo.lpToken)
    const stakedTokenPrice = await getLPTokenPrice(poolInfo.lpToken)
    const sTokenPrice = await getPrice(getShareTokenAddress(isMidas))

    return {
      isLPToken: true,
      poolName: `${token0}/${token1}`,
      stakedToken: {
        balance: formatBalance(userInfo.amount),
        symbol: `${token0}/${token1}`,
        contract: poolInfo.lpToken,
        price: stakedTokenPrice,
      },
      pendingToken: {
        balance: formatBalance(pendingShare),
        symbol: sToken,
        contract: getShareTokenAddress(isMidas),
        price: sTokenPrice,
      },
    }
  } catch (error) {
    return null
  }
}

export const getShareRewardPool = async (
  account: string | null | undefined,
  contractAddress: string,
  isMidas = false
): Promise<PoolInfo[]> => {
  const contract = getContract(sharerewardpoolABI.abi, contractAddress)
  try {
    const pools = []
    for (let index = 0; index < 3; index++) {
      pools.push(getSharePool(contract, index, account, isMidas))
    }
    const result = await Promise.all(pools)
    return result.filter((t) => t !== null) as PoolInfo[]
  } catch (error) {
    return []
  }
}
