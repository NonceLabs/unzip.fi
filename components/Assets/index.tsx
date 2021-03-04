import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Text, Heading } from 'grommet'
import styles from '../../styles/Project.module.css'
import { calcValue } from '../../utils/price'

const Assets = () => {
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
    <Box direction="column">
      <Heading level="2" style={{ paddingLeft: 30 }}>{`总资产 $${total.toFixed(
        2
      )}`}</Heading>
      <Box direction="column" className={styles.assets}>
        {tokens.map((t, idx) => {
          return (
            <Box
              key={t.address}
              direction="row"
              align="center"
              justify="between"
              pad="small"
              className={styles.asset}
              style={{ borderBottomWidth: idx === tokens.length - 1 ? 0 : 1 }}
            >
              <Box direction="column">
                <Text weight="bold" color="dark2">
                  {t.symbol}
                </Text>
                <Text size="small" color="dark-5">
                  {t.balance}
                </Text>
              </Box>
              <Text weight="bold" color="black">{`$${(
                t.balance *
                t.price *
                bnbPrice
              ).toFixed(2)}`}</Text>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Assets
