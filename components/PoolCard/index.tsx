import React from 'react'
import { Text, Box } from 'grommet'
import { useSelector } from 'react-redux'
import withLocale, { useLocale } from '../../utils/withLocale'
import { thousandCommas } from '../../utils/format'
import { CURRENCY_SYMBOLS } from '../../utils'

interface PoolCardProps {
  pool: PoolInfo
  totalValue: number | string
}

const PoolCard = (props: PoolCardProps) => {
  const { poolName, stakedToken, earnedToken, pendingToken, logo } = props.pool
  const currency = useSelector((state) => state.currency)
  const isDarkMode = useSelector((state) => state.dark)

  const [, t] = useLocale()

  return (
    <Box direction="column" width="300px">
      <Box
        direction="row"
        align="center"
        justify="between"
        pad={{ vertical: 'small', bottom: '0px' }}
      >
        <Text color="dark-2" weight="bold" size="small">
          {poolName}
        </Text>
      </Box>

      <Text margin="xxsmall">
        <Text color="dark-3" size="small">
          {t(stakedToken?.label || 'staked')}
        </Text>
        <Text
          weight="bold"
          style={{ color: '#008cd5', marginLeft: 4, marginRight: 4 }}
        >
          {thousandCommas(stakedToken.balance, 2)}
        </Text>
        <Text color="dark-2" size="small">
          {stakedToken.symbol}
        </Text>
      </Text>

      {pendingToken && (
        <Text margin="xxsmall">
          <Text color="dark-3" size="small">
            {t('yield')}
          </Text>
          <Text
            weight="bold"
            style={{ color: '#008cd5', marginLeft: 4, marginRight: 4 }}
          >
            {thousandCommas(pendingToken.balance, 2)}
          </Text>
          <Text color="dark-2" size="small">
            {pendingToken.symbol}
          </Text>
        </Text>
      )}

      {earnedToken && (
        <Text margin="xxsmall">
          <Text color="dark-3" size="small">
            {t('yield')}
          </Text>
          <Text
            weight="bold"
            style={{ color: '#008cd5', marginLeft: 4, marginRight: 4 }}
          >
            {thousandCommas(earnedToken.balance, 2)}
          </Text>
          <Text color="dark-2" size="small">
            {earnedToken.symbol}
          </Text>
        </Text>
      )}

      <Box background={isDarkMode ? 'dark-1' : 'light-3'} pad="1px" />

      <Box
        direction="row"
        align="center"
        justify="end"
        pad={{ vertical: 'small', bottom: '0px' }}
      >
        <Text size="small">{t('value')}</Text>
        <Text
          size="small"
          color="brand"
          weight="bold"
          margin="none"
          style={{ opacity: 0.6, marginLeft: 6 }}
        >
          {`${CURRENCY_SYMBOLS[currency]}${thousandCommas(
            props.totalValue,
            0
          )}`}
        </Text>
      </Box>
    </Box>
  )
}

export default withLocale(PoolCard)
