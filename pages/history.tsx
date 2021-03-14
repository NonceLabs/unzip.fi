import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, grommet, dark, Grommet, ResponsiveContext } from 'grommet'
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
  updateRates,
} from '../store/actions'
import { PROJECTS } from '../components/Farms/config'
import {
  fetchBNBPrice,
  fetchAssetTokens,
  fetchCurrencies,
} from '../utils/request'
import Setting from '../components/Setting'
import DEFAULT_THEME from '../utils/themes/default'

export const App = () => {
  const isDarkMode = useSelector((state) => state.dark)

  const [activeTab, setActiveTab] = useState(TAB.HISTORY)

  DEFAULT_THEME.defaultMode = isDarkMode ? 'dark' : 'light'

  return (
    <Grommet theme={isDarkMode ? dark : grommet} full>
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
              background={isDarkMode ? '#222' : 'white'}
            >
              {isMobile ? (
                <Header activeTab={activeTab} setActiveTab={setActiveTab} />
              ) : (
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              )}
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
