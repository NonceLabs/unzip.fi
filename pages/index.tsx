import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, grommet, dark, Grommet, ResponsiveContext } from 'grommet'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEagerConnect, useInactiveListener } from '@hooks/index'
import Web3ProviderWrap from '@components/Web3Provider'
import Sidebar from '@components/Sidebar'
import Header from '@components/Header'
import { TAB } from '@utils/types'
import styles from '@styles/Home.module.css'
import Connector from '@components/Connector'
import DEFAULT_THEME from '@utils/themes/default'

export const App = () => {
  const context = useWeb3React<Web3Provider>()
  const { connector } = context
  const dispatch = useDispatch()
  const { account, chainId } = useWeb3React()
  const router = useRouter()
  const _account = useSelector((state) => state.account)
  const isDarkMode = useSelector((state) => state.dark)
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  const triedEager = useEagerConnect()

  useInactiveListener(!triedEager || !!activatingConnector)

  useEffect(() => {
    if (account) {
      router.replace(`/address/${account}/overview`)
    }
  }, [dispatch, account, _account, chainId])

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
                <Header activeTab={TAB.OVERVIEW} />
              ) : (
                <Sidebar activeTab={TAB.OVERVIEW} />
              )}
              <Connector />
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
