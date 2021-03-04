import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Image,
  Box,
} from 'grommet'
import { isMobile } from '../../utils'

interface PoolCardProps {
  pool: PoolInfo
  totalValue: number | string
}

const PoolCard = (props: PoolCardProps) => {
  const { poolName, stakedToken, earnedToken, pendingToken, logo } = props.pool

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
          抵押
        </Text>
        <Text
          weight="bold"
          style={{ color: '#008cd5', marginLeft: 4, marginRight: 4 }}
        >
          {stakedToken.balance}
        </Text>
        <Text color="dark-2" size="small">
          {stakedToken.symbol}
        </Text>
      </Text>

      {pendingToken && (
        <Text margin="xxsmall">
          <Text color="dark-3" size="small">
            收益
          </Text>
          <Text
            weight="bold"
            style={{ color: '#008cd5', marginLeft: 4, marginRight: 4 }}
          >
            {pendingToken.balance}
          </Text>
          <Text color="dark-2" size="small">
            {pendingToken.symbol}
          </Text>
        </Text>
      )}

      {earnedToken && (
        <Text margin="xxsmall">
          <Text color="dark-3" size="small">
            赚取
          </Text>
          <Text
            weight="bold"
            style={{ color: '#008cd5', marginLeft: 4, marginRight: 4 }}
          >
            {earnedToken.balance}
          </Text>
          <Text color="dark-2" size="small">
            {earnedToken.symbol}
          </Text>
        </Text>
      )}

      <Box
        pad="none"
        border={{ color: 'light-3', side: 'bottom', size: 'medium' }}
      />

      <Box
        direction="row"
        align="center"
        justify="end"
        pad={{ vertical: 'small', bottom: '0px' }}
      >
        <Text size="small">价值</Text>
        <Text
          size="small"
          color="brand"
          weight="bold"
          margin="none"
          style={{ opacity: 0.6, marginLeft: 6 }}
        >
          {`$${props.totalValue}`}
        </Text>
      </Box>
    </Box>
  )
}

export default PoolCard
