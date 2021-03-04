import React from 'react'
import { Box, Heading } from 'grommet'
import { useSelector } from 'react-redux'
import { calcValue } from '../../utils/price'

const AssetHeader = () => {
  const bnbPrice = useSelector((state) => state.bnbPrice)
  const tokens = useSelector((state) => state.assets)
  const farms = useSelector((state) => state.farms)

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
    <Box direction="row" align="center" justify="between" width="100%">
      <Heading level="2" style={{ paddingLeft: 30 }}>
        {`总资产 $${total.toFixed(2)}`}
      </Heading>
    </Box>
  )
}

export default AssetHeader