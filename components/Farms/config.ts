import { FARM_TYPE } from '@utils/types'
import icons from '@utils/icons'
import {
  getPoolsStat as bdoGetPoolsStat,
  getMidasPoolsStat as midasGetPoolsStat,
} from '@utils/protocols/bdo'
import { getPoolsStat as pancakeGetPoolsStat } from '@utils/protocols/pancake'
import { getPoolsStat as alpacaGetPoolsStat } from '@utils/protocols/alpaca'
import { getPoolsStat as autofarmGetPoolsStat } from '@utils/protocols/autofarm'
import { getPoolsStat as beltGetPoolsStat } from '@utils/protocols/belt'
import { getPoolsStat as ellipsisGetPoolsStat } from '@utils/protocols/ellipsis'
import { getPoolsStat as waultGetPoolsStat } from '@utils/protocols/wault'
import { getPoolsStat as popsicleGetPoolsStat } from '@utils/protocols/popsicle'
import { getPoolsStat as uraniumGetPoolsStat } from '@utils/protocols/uranium'

export const PROJECTS: ProjectProps[] = [
  {
    name: 'Alpaca',
    link: 'https://app.alpacafinance.org/stake',
    desc: 'Leveraged yield farming by the people,for the people',
    logo: icons.ALPACA,
    getPoolsStat: alpacaGetPoolsStat,
    pools: [],
    tags: [FARM_TYPE.YIELD_FARMING],
  },
  {
    name: 'Autofarm',
    link: 'https://autofarm.network/',
    desc: 'For the true farmers',
    logo: icons.AUTOFARM,
    getPoolsStat: autofarmGetPoolsStat,
    pools: [],
    tags: [FARM_TYPE.YIELD_FARMING],
  },
  {
    name: 'bdollar',
    link: 'https://bdollar.fi',
    desc:
      'bDollar (BDO) is an algorithmic stablecoin running on Binance Smart-chain',
    logo: icons.BDO,
    getPoolsStat: bdoGetPoolsStat,
    pools: [],
    tags: [FARM_TYPE.ALGORITHM_STABLECOIN],
  },
  {
    name: 'Belt',
    link: 'https://beta.belt.fi',
    desc: 'The conveyor Belt of optimized yield to your assets',
    logo: icons.BELT,
    pools: [],
    getPoolsStat: beltGetPoolsStat,
    tags: [FARM_TYPE.YIELD_FARMING],
  },
  {
    name: 'Ellipsis',
    link: 'https://www.ellipsis.finance/',
    desc: 'Secure low-slippage stable swapping on #BSC',
    logo: icons.ELLIPSIS,
    pools: [],
    getPoolsStat: ellipsisGetPoolsStat,
    tags: [FARM_TYPE.YIELD_FARMING],
  },
  {
    name: 'Midas',
    link: 'https://midasdollar.fi/',
    desc:
      'Established team, non-anonymous. Ready & real use-cases for $MDO algo stablecoin with [Midas.eco](https://midas.eco/)',
    logo: icons.MIDAS,
    getPoolsStat: midasGetPoolsStat,
    pools: [],
    tags: [FARM_TYPE.ALGORITHM_STABLECOIN],
  },
  {
    name: 'Popsicle',
    link: 'https://popsicle.finance/',
    desc:
      'Cross-chain yield enhancement platform focusing on Automated Market-Making (AMM) Liquidity Providers (LP).',
    logo: icons.POPSICLE,
    getPoolsStat: popsicleGetPoolsStat,
    pools: [],
    tags: [FARM_TYPE.YIELD_FARMING],
  },
  {
    name: 'Pancake',
    link: 'https://pancakeswap.finance/farms',
    desc: 'The #1 AMM and yield farm on Binance Smart Chain.',
    logo: icons.PANCAKE,
    getPoolsStat: pancakeGetPoolsStat,
    pools: [],
    tags: [FARM_TYPE.YIELD_FARMING],
  },
  {
    name: 'Uranium',
    link: 'https://app.uranium.finance/',
    desc: 'The daily dividends AMM',
    logo: icons.URANIUM,
    getPoolsStat: uraniumGetPoolsStat,
    pools: [],
    tags: [FARM_TYPE.YIELD_FARMING, FARM_TYPE.AMM],
  },
  {
    name: 'Wault',
    link: 'https://app.wault.finance/',
    desc: 'DECENTRALIZED FINANCE PROTOCOL',
    logo: icons.WAULT,
    getPoolsStat: waultGetPoolsStat,
    pools: [],
    tags: [FARM_TYPE.YIELD_FARMING],
  },
]
