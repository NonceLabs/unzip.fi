import React from 'react'
import { Box, Heading, Text } from 'grommet'
import { useSelector } from 'react-redux'
import { calcValue } from '../../utils/price'
import withLocale, { useLocale } from '../../utils/withLocale'

const AssetHeader = () => {
  const bnbPrice = useSelector((state) => state.bnbPrice)
  const tokens = useSelector((state) => state.assets)
  const farms = useSelector((state) => state.farms)
  const [, t] = useLocale()

  let total = 0
  tokens.map((t) => {
    total += t.balance * t.price * bnbPrice
  })
  farms.map((f) => {
    f.pools.map((p) => {
      total += Number(calcValue(p, bnbPrice))
    })
  })
  return (
    <Box
      direction="column"
      align="center"
      justify="between"
      margin="medium"
      width=""
    >
      <Box direction="row" align="center">
        <Text size="30px" color="dark-2">
          {t('total_value')}
        </Text>
        <Text
          size="40px"
          color="brand"
          weight="bold"
          margin={{ horizontal: 'small' }}
        >{`$${total.toFixed(0)}`}</Text>
      </Box>
    </Box>
  )
}

export default withLocale(AssetHeader)
