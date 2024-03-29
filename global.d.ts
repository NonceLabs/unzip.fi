type fn = (...args: any[]) => any

interface Window {
  imToken: any
  web3: any
  ethereum: any
}

interface Contract {
  setProvider: any
}

interface PendingReward {
  value: string | number
  token: string
}

interface PoolInfo {
  isLPToken: boolean
  poolName: string
  stakedToken: TokenInfo
  earnedToken?: TokenInfo
  pendingToken?: TokenInfo
  logo?: any
}

interface TokenInfo {
  symbol: string
  contract?: string
  balance?: number | string
  price?: number | string
  label?: string
}

type PoolInfoFn = (account: string | null | undefined) => Promise<PoolInfo[]>

interface ProjectProps {
  name: string
  logo: any
  desc: string
  link: string
  getPoolsStat: PoolInfoFn
  pools: PoolInfo[]
  tags: FARM_TYPE[]
}

interface SidebarProps {
  activeTab: TAB
  isMobile?: boolean
}

interface AssetToken {
  contract_ticker_symbol: string
  contract_address: string
  contract_decimals: number
  balance: string
  quote_rate: number
  logo_url: string
}

type __localeType = 'zh' | 'en' | null

interface Transaction {
  blockNumber: string
  timeStamp: string
  hash: string
  blockHash: string
  from: string
  contractAddress: string
  to: string
  value: string
  tokenName: string
  tokenSymbol: string
  tokenDecimal: string
  transactionIndex: string
  input: string
}
