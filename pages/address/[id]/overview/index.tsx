import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, grommet, dark, Grommet, ResponsiveContext } from 'grommet'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Sidebar from '@components/Sidebar'
import Overview from '@components/Overview'
import Header from '@components/Header'
import { TAB } from '@utils/types'
import styles from '@styles/Home.module.css'
import {
  appendFarm,
  updateAssets,
  updateBNBPrice,
  updateAccount,
  updateRates,
} from '@store/actions'
import {
  fetchBNBPrice,
  fetchAssetTokens,
  fetchCurrencies,
} from '@utils/request'
import { PROJECTS } from '@components/Farms/config'
import Web3ProviderWrap from '@components/Web3Provider'
import { useEagerConnect, useInactiveListener } from '@hooks/index'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

const OverviewPage = () => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state) => state.dark)
  const router = useRouter()
  const account = router.query.id as string

  const context = useWeb3React<Web3Provider>()
  const { connector } = context
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])
  const triedEager = useEagerConnect()
  useInactiveListener(!triedEager || !!activatingConnector)

  useEffect(() => {
    fetchBNBPrice((price) => {
      dispatch(updateBNBPrice(Number(price)))
    })

    dispatch(updateAccount(account))

    fetchCurrencies((rates) => {
      dispatch(updateRates(rates))
    })

    fetchAssetTokens(account).then((tokens) => {
      dispatch(updateAssets(tokens))
    })

    PROJECTS.map((p, idx) => {
      p.getPoolsStat(account).then((pools) => {
        if (pools.length) {
          dispatch(appendFarm({ ...PROJECTS[idx], pools }))
        }
      })
    })
  }, [dispatch, account])

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
              <Overview />
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

export default () => (
  <Web3ProviderWrap>
    <OverviewPage />
  </Web3ProviderWrap>
)
