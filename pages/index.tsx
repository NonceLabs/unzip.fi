import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, grommet, Grommet, ResponsiveContext } from 'grommet'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Head from 'next/head'
import { useEagerConnect, useInactiveListener } from '../hooks'
import Web3ProviderWrap from '../components/Web3Provider'
import Sidebar from '../components/Sidebar'
import Overview from '../components/Overview'
import Header from '../components/Header'
import { TAB } from '../utils/types'
import styles from '../styles/Home.module.css'
import {
  appendFarm,
  updateAssets,
  updateBNBPrice,
  updateAccount,
  resetAssetAndFarm,
} from '../store/actions'
import { PROJECTS } from '../components/Farms/config'
import { fetchBNBPrice, fetchAssetTokens } from '../utils/request'
import Setting from '../components/Setting'

export const App = () => {
  const context = useWeb3React<Web3Provider>()
  const { connector } = context
  const dispatch = useDispatch()
  const { account, error, chainId } = useWeb3React()
  const _account = useSelector((state) => state.account)
  // const account = '0xD3f4381936A90db280c62b2783664c993eB6A952'
  // const account = '0x97838eF6e7Df941078331DF652c3546c38756Bc6'

  const [assetLoading, setAssetLoading] = useState(false)
  const [farmLoading, setFarmLoading] = useState(false)

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  const [activeTab, setActiveTab] = useState(TAB.OVERVIEW)

  useEffect(() => {
    setAssetLoading(true)
    setFarmLoading(true)

    fetchBNBPrice((price) => {
      dispatch(updateBNBPrice(Number(price)))
    })

    if (chainId !== 56) {
      dispatch(resetAssetAndFarm())
      return
    }

    if (!account || _account === account) return

    dispatch(updateAccount(account))

    fetchAssetTokens(account).then((tokens) => {
      dispatch(updateAssets(tokens))
      setTimeout(() => {
        setAssetLoading(false)
      }, 300)
    })

    PROJECTS.map((p, idx) => {
      p.getPoolsStat(account).then((pools) => {
        if (pools.length) {
          dispatch(appendFarm({ ...PROJECTS[idx], pools }))
          setFarmLoading(false)
        }
      })
    })
  }, [dispatch, account, _account, chainId])

  return (
    <Grommet theme={grommet} full>
      <Head>
        <title>Unzip.fi</title>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-30ZY3T023L"
        ></script>
        <script src="/scripts/ga.js"></script>
      </Head>
      <ResponsiveContext.Consumer>
        {(size) => {
          const isMobile = size === 'small'
          return (
            <Box
              direction={isMobile ? 'column' : 'row'}
              className={styles.content}
            >
              {isMobile ? (
                <Header activeTab={activeTab} setActiveTab={setActiveTab} />
              ) : (
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              )}
              {activeTab === TAB.OVERVIEW && (
                <Overview
                  farmLoading={farmLoading}
                  assetLoading={assetLoading}
                  error={error}
                />
              )}
              {activeTab === TAB.SETTING && <Setting />}
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

const Home = () => {
  return (
    <Web3ProviderWrap>
      <App />
    </Web3ProviderWrap>
  )
}

export default Home
