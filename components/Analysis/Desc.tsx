import React from 'react'
import { Box, ResponsiveContext, Text } from 'grommet'
import { useSelector } from 'react-redux'
import { calcValue } from '../../utils/price'
import withLocale, { useLocale } from '../../utils/withLocale'

const AssetHeader = () => {
  const bnbPrice = useSelector((state) => state.bnbPrice)
  const tokens = useSelector((state) => state.assets)
  const farms = useSelector((state) => state.farms)
  const [, t] = useLocale()

  let total = 0
  let wallet = 0
  let farming = 0

  tokens.map((t) => {
    total += t.balance * t.price * bnbPrice
    wallet += t.balance * t.price * bnbPrice
  })
  farms.map((f) => {
    f.pools.map((p) => {
      total += Number(calcValue(p, bnbPrice))
      farming += Number(calcValue(p, bnbPrice))
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
            width={isMobile ? '100%' : undefined}
            flex="grow"
          >
            <Box direction="row" align="center" justify="between" width="100%">
              <Text size="20px" color="dark-2">
                {t('total_value')}
              </Text>
              <Text size="30px" color="brand" weight="bold">{`$${total.toFixed(
                0
              )}`}</Text>
            </Box>

            <Box
              pad="none"
              width="100%"
              border={{ color: 'light-3', side: 'bottom', size: 'large' }}
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
              <Text size="20px" color="brand" weight="bold">{`$${wallet.toFixed(
                0
              )}`}</Text>
            </Box>

            <Box direction="row" align="center" justify="between" width="100%">
              <Text size="16px" color="dark-2">
                {t('farming')}
              </Text>
              <Text
                size="20px"
                color="brand"
                weight="bold"
              >{`$${farming.toFixed(0)}`}</Text>
            </Box>
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default withLocale(AssetHeader)
