import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Text, Image, Button } from 'grommet'
import { Add } from 'grommet-icons'
import { CURRENCY_SYMBOLS } from '@utils/constanst'
import styles from '@styles/Project.module.css'
import { AssetsSkeleton } from './Skeleton'
import AddTokenModal from './AddTokenModal'
import withLocale, { useLocale } from '@utils/withLocale'
import { thousandCommas } from '@utils/format'
import Link from 'next/link'
import { TokenLogo } from '@components/Common'

const Assets = () => {
  const bnbPrice = useSelector((state) => state.bnbPrice)
  const tokens = useSelector((state) => state.assets)
  const rate = useSelector((state) => state.rate)
  const account = useSelector((state) => state.account)
  const currency = useSelector((state) => state.currency)
  const [visible, setVisible] = useState(false)
  const [, t] = useLocale()

  return (
    <Box direction="column" className={styles.assets}>
      <Box direction="row" align="center" justify="end" width="100%">
        <Button
          secondary
          size="small"
          label={t('add_token')}
          icon={<Add />}
          onClick={() => setVisible(true)}
          style={{ marginBottom: 10 }}
        />
      </Box>
      {tokens
        .sort((a, b) => {
          return b.balance * b.price - a.balance * a.price
        })
        .map((t, idx) => {
          return (
            <Link
              key={t.contract}
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
                  <TokenLogo symbol={t.symbol} />
                  <Box direction="column">
                    <Text weight="bold" color="dark2">
                      {t.symbol}
                    </Text>

                    <Text size="small" color="dark-5">
                      {`${CURRENCY_SYMBOLS[currency]}${thousandCommas(
                        t.price * bnbPrice * rate,
                        2
                      )}`}
                    </Text>
                  </Box>
                </Box>

                <Box direction="column" align="end">
                  <Text weight="bold">
                    {`${CURRENCY_SYMBOLS[currency]}${thousandCommas(
                      t.balance * t.price * bnbPrice * rate,
                      2
                    )}`}
                  </Text>
                  <Text size="small" color="dark-5">
                    {thousandCommas(t.balance, 2)}
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
