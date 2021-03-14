import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, ResponsiveContext, Heading, Text, List, Button } from 'grommet'
import styles from '@styles/Home.module.css'
import { useRouter } from 'next/router'
import { getTokenInfo } from '@utils/common'
import { thousandCommas } from '@utils/format'
import { CURRENCY_SYMBOLS } from '@utils/index'
import { useLocale } from '@utils/withLocale'
import { fetchTransactionsByContract } from '@utils/request'
import InfoBox from './InfoBox'
import dayjs from 'dayjs'
import _ from 'lodash'
import TransactionItem from '@components/History/Transaction'
import { Transaction } from 'grommet-icons'
import TransferModal from './TransferModal'
import { TokenLogo } from '@components/Common'

function TokenView({}) {
  const router = useRouter()
  const [, t] = useLocale()
  const [tokenInfo, setTokenInfo] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [visible, setVisible] = useState(false)

  const bnbPrice = useSelector((state) => state.bnbPrice)
  const rate = useSelector((state) => state.rate)
  const account = useSelector((state) => state.account)
  const currency = useSelector((state) => state.currency)
  const tokenContract = router.query.token as string

  useEffect(() => {
    getTokenInfo(tokenContract, account)
      .then((result) => {
        setTokenInfo(result)
      })
      .catch(console.error)

    fetchTransactionsByContract(account, tokenContract)
      .then((result) => {
        if (_.isArray(result)) {
          setTransactions(result)
        }
      })
      .catch(console.error)
  }, [tokenContract, account])

  const transactionObjs = _.groupBy(
    (transactions || []).map((t) => {
      return {
        ...t,
        day: dayjs(t.timeStamp * 1000).format('MMM DD,YYYY'),
      }
    }),
    'day'
  )
  if (!tokenInfo || !tokenInfo.symbol) return null

  return (
    <Box
      direction="column"
      align="center"
      className={styles.mainBox}
      pad={{ vertical: 'medium', horizontal: '20px' }}
    >
      {visible && (
        <TransferModal defaultTokenInfo={tokenInfo} setVisible={setVisible} />
      )}
      <ResponsiveContext.Consumer>
        {(size) => {
          return (
            <Box width="600px" direction="column" justify="start">
              <Box
                direction="row"
                align="center"
                justify="between"
                pad={{ vertical: 'small' }}
                style={{ minHeight: 'unset' }}
              >
                <Box direction="row" align="center" justify="center">
                  <TokenLogo symbol={tokenInfo.symbol} />
                  <Heading level="3" margin="none">
                    {tokenInfo.symbol}
                  </Heading>

                  <Text color="status-ok" size="large" margin="small">
                    {`${CURRENCY_SYMBOLS[currency]}${thousandCommas(
                      tokenInfo.price * bnbPrice * rate,
                      2
                    )}`}
                  </Text>
                </Box>
                <Button
                  primary
                  label={t('transfer')}
                  icon={<Transaction />}
                  onClick={() => setVisible(true)}
                />
              </Box>

              <InfoBox t={t} tokenContract={tokenContract} />

              {Object.keys(transactionObjs).map((day) => {
                return (
                  <Box key={day} style={{ minHeight: 'unset' }}>
                    <Heading level="6">{day}</Heading>
                    <List
                      primaryKey="hash"
                      data={transactionObjs[day]}
                      children={(datum, index) => {
                        return (
                          <TransactionItem
                            transaction={datum}
                            account={account}
                          />
                        )
                      }}
                    />
                  </Box>
                )
              })}
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Box>
  )
}

export default TokenView
