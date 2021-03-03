// import { getContract, formatBalance } from '../../common'
// const acryptos = require('./acryptos.json')
// const pancakeABI = require('../pancake/pancake.json')
// const bep20ABI = require('../../abis/BEP20.json')

// // https://app.acryptos.com/contracts/

// const getPool = async (
//   contract: any,
//   index: number,
//   account: string | null | undefined
// ): Promise<PoolInfo | null> => {
//   try {
//     const userInfo = await contract.userInfo(index, account)

//     const poolInfo = await contract.poolInfo(index)
//     const lpContract = getContract(pancakeABI.abi, poolInfo.lpToken)
//     const symbol = await lpContract.symbol()
//     if (Number(formatBalance(userInfo.amount)) === 0) {
//       return null
//     }
//     // console.log('###', index, poolInfo.lpToken)
//     let name = symbol
//     // if (symbol.includes('Cake-LP')) {
//     //   console.log(
//     //     '###',
//     //     index,
//     //     symbol,
//     //     !!lpContract.token0,
//     //     !!lpContract.token1
//     //   )
//     //   const token0 = await lpContract.token0()
//     //   const token1 = await lpContract.token1()
//     //   // const token0TokenContract = getContract(bep20ABI.abi, token0)
//     //   // const token0Symbol = await token0TokenContract.symbol()
//     //   // const token1TokenContract = getContract(bep20ABI.abi, token1)
//     //   // const token1Symbol = await token1TokenContract.symbol()

//     //   name = `${symbol}` // ${token0Symbol}/${token1Symbol}
//     // } else {
//     //   // const token = await lpContract.token()
//     //   // const token = getContract(bep20ABI.abi, token0)
//     //   name = `${symbol}`
//     // }
//     // console.log('###', index, symbol)

//     return {
//       isLPToken: true,
//       poolName: name,
//       userInfo: {
//         stakedValue: formatBalance(userInfo.amount),
//         earnedValue: formatBalance(userInfo.rewardDebt),
//         stakedToken: '',
//         earnedToken: '',
//       },
//     }
//   } catch (error) {
//     console.log('getPool', error)
//     return null
//   }
// }

// export const getPoolsStat = async (
//   account: string | null | undefined
// ): Promise<PoolInfo[]> => {
//   if (!account) {
//     return []
//   }

//   const contract = getContract(
//     acryptos.abi,
//     '0xeaE1425d8ed46554BF56968960e2E567B49D0BED'
//   )

//   try {
//     const poolLength = Number(await contract.poolLength())
//     const poolPromises = []
//     for (let index = 0; index < poolLength; index++) {
//       poolPromises.push(getPool(contract, index, account))
//     }
//     const result = await Promise.all(poolPromises)
//     return result.filter((t) => t !== null) as PoolInfo[]
//   } catch (error) {
//     console.log('getPoolsStat', error)
//     return []
//   }
// }
