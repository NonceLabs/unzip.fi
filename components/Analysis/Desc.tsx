import React from 'react'
import { Box, ResponsiveContext, Text } from 'grommet'
import { useSelector } from 'react-redux'
import { CURRENCY_SYMBOLS } from '@utils/index'
import { calcValue } from '@utils/price'
import withLocale, { useLocale } from '@utils/withLocale'
import { thousandCommas } from '@utils/format'

const AssetHeader = () => {
  const bnbPrice = useSelector((state) => state.bnbPrice)
  const tokens = useSelector((state) => state.assets)
  const farms = useSelector((state) => state.farms)
  const rate = useSelector((state) => state.rate)
  const currency = useSelector((state) => state.currency)
  const isDarkMode = useSelector((state) => state.dark)

  const [, t] = useLocale()

  let total = 0
  let wallet = 0
  let farming = 0

  tokens.map((t) => {
    total += t.balance * t.price * bnbPrice * rate
    wallet += t.balance * t.price * bnbPrice * rate
  })
  farms.map((f) => {
    f.pools.map((p) => {
      total += Number(calcValue(p, bnbPrice * rate))
      farming += Number(calcValue(p, bnbPrice * rate))
    })
  })
  return (
    <ResponsiveContext.Consumer>
      {(size) => {
        const isMobile = size === 'small'
        return (
          <Box
            direction="column"
            align="start"
            justify="between"
            margin="medium"
            width={isMobile ? '100%' : '250px'}
            flex="grow"
          >
            <Box direction="row" align="center" justify="between" width="100%">
              <Text size="20px" color="dark-2">
                {t('total_value')}
              </Text>
              <Text size="30px" color="brand" weight="bold">
                {`${CURRENCY_SYMBOLS[currency]}${thousandCommas(total, 0)}`}
              </Text>
            </Box>

            <Box
              width="100%"
              background={isDarkMode ? 'dark-1' : 'light-3'}
              pad="4px"
              style={{ marginTop: 10 }}
            />

            <Box
              direction="row"
              align="center"
              justify="between"
              width="100%"
              margin={{ vertical: 'small' }}
            >
              <Text size="16px" color="dark-2">
                {t('wallet')}
              </Text>
              <Text size="20px" color="brand" weight="bold">
                {`${CURRENCY_SYMBOLS[currency]}${thousandCommas(wallet, 0)}`}
              </Text>
            </Box>

            <Box direction="row" align="center" justify="between" width="100%">
              <Text size="16px" color="dark-2">
                {t('farming')}
              </Text>
              <Text size="20px" color="brand" weight="bold">
                {`${CURRENCY_SYMBOLS[currency]}${thousandCommas(farming, 0)}`}
              </Text>
            </Box>
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default withLocale(AssetHeader)
