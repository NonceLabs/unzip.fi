import React, { useState } from 'react'
import { Box, Heading, List, Button } from 'grommet'
import { useSelector, useDispatch } from 'react-redux'
import styles from '@styles/Home.module.css'
import TransactionItem from './Transaction'
import { useLocale } from '@utils/withLocale'
import dayjs from 'dayjs'
import _ from 'lodash'
import { appendTransactions } from '@store/actions'
import { fetchTransactions } from '@utils/request'

function History({}) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const transactions = useSelector((state) => state.transactions)
  const account = useSelector((state) => state.account)
  const [, t] = useLocale()

  const transactionObjs = _.groupBy(
    transactions.map((t) => {
      return {
        ...t,
        day: dayjs(t.timeStamp * 1000).format('MMM DD,YYYY'),
      }
    }),
    'day'
  )

  return (
    <Box direction="column" align="center" className={styles.mainBox}>
      {/* <Box
        width="100%"
        align="center"
        justify="between"
        height="100px"
        style={{ minHeight: 'unset' }}
      >
        <Heading level="3">{t('history')}</Heading>
      </Box> */}

      {Object.keys(transactionObjs).map((day) => {
        return (
          <Box key={day} style={{ minHeight: 'unset' }}>
            <Heading level="6">{day}</Heading>
            <List
              primaryKey="hash"
              data={transactionObjs[day]}
              children={(datum, index) => {
                return <TransactionItem transaction={datum} account={account} />
              }}
            />
          </Box>
        )
      })}

      <Button
        primary
        label={t('load_more')}
        margin={{ vertical: 'medium' }}
        onClick={() => {
          if (loading) {
            return
          }
          setLoading(true)
          fetchTransactions(
            account,
            (transactions) => {
              setLoading(false)
              dispatch(appendTransactions(transactions))
            },
            Math.ceil(transactions.length / 30) + 1
          ).catch(console.error)
        }}
      />
    </Box>
  )
}

export default History
