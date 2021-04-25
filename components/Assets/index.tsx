import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Text } from 'grommet'
import { CURRENCY_SYMBOLS } from '@utils/constanst'
import styles from '@styles/Project.module.css'
import { AssetsSkeleton } from './Skeleton'
import AddTokenModal from './AddTokenModal'
import withLocale, { useLocale } from '@utils/withLocale'
import { formatBalance, thousandCommas } from '@utils/format'
import Link from 'next/link'
import { TokenLogo } from '@components/Common'

const Assets = () => {
  const tokens = useSelector((state) => state.assets)
  const rate = useSelector((state) => state.rate)
  const account = useSelector((state) => state.account)
  const currency = useSelector((state) => state.currency)
  const [visible, setVisible] = useState(false)
  const [, t] = useLocale()

  return (
    <Box direction="column" className={styles.assets}>
      {tokens
        .sort((a, b) => {
          return (
            formatBalance(b.balance, b.contract_decimals) * b.quote_rate -
            formatBalance(a.balance, a.contract_decimals) * a.quote_rate
          )
        })
        .map((t, idx) => {
          return (
            <Link
              key={t.contract_address}
              href={`/address/${account}/overview/${t.contract}`}
            >
              <Box
                direction="row"
                align="center"
                justify="between"
                pad="small"
                className={styles.asset}
                style={{
                  borderBottomWidth: idx === tokens.length - 1 ? 0 : 1,
                }}
              >
                <Box direction="row" align="center">
                  <TokenLogo url={t.logo_url} />
                  <Box direction="column">
                    <Text weight="bold" color="dark2">
                      {t.contract_ticker_symbol}
                    </Text>

                    <Text size="small" color="dark-5">
                      {`${CURRENCY_SYMBOLS[currency]}${thousandCommas(
                        t.quote_rate * rate,
                        2
                      )}`}
                    </Text>
                  </Box>
                </Box>

                <Box direction="column" align="end">
                  <Text weight="bold">
                    {`${CURRENCY_SYMBOLS[currency]}${thousandCommas(
                      formatBalance(t.balance, t.contract_decimals) *
                        t.quote_rate *
                        rate,
                      2
                    )}`}
                  </Text>
                  <Text size="small" color="dark-5">
                    {thousandCommas(
                      formatBalance(t.balance, t.contract_decimals),
                      2
                    )}
                  </Text>
                </Box>
              </Box>
            </Link>
          )
        })}
      {tokens.length === 0 && <AssetsSkeleton />}
      {visible && <AddTokenModal setVisible={setVisible} />}
    </Box>
  )
}

export default withLocale(Assets)
