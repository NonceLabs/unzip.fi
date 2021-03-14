import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, grommet, dark, Grommet, ResponsiveContext } from 'grommet'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Sidebar from '@components/Sidebar'
import Header from '@components/Header'
import { TAB } from '@utils/types'
import styles from '@styles/Home.module.css'
import { updateRates, appendTransactions, updateAccount } from '@store/actions'
import { fetchCurrencies, fetchTransactions } from '@utils/request'
import History from '@components/History'

const HistoryPage = () => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector((state) => state.dark)
  const router = useRouter()
  const account = router.query.id as string

  const [activeTab, setActiveTab] = useState(TAB.HISTORY)

  useEffect(() => {
    if (account) {
      dispatch(updateAccount(account))
      fetchCurrencies((rates) => {
        dispatch(updateRates(rates))
      })
      fetchTransactions(account, (transactions) => {
        dispatch(appendTransactions(transactions))
      }).catch(console.error)
    }
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
                <Header activeTab={activeTab} setActiveTab={setActiveTab} />
              ) : (
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              )}
              <History />
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

export default HistoryPage
