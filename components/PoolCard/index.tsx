import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Image,
} from 'grommet'
import { isMobile } from '../../utils'

interface PoolCardProps {
  pool: PoolInfo
  calcValue: any
}

const PoolCard = (props: PoolCardProps) => {
  const { poolName, stakedToken, earnedToken, pendingToken, logo } = props.pool

  return (
    <Card height="small" width="medium" background="light-1" margin="small">
      <CardHeader pad="small">
        <Heading level="3" margin="none">
          {poolName}
        </Heading>
        {logo && <Image src={logo} width={40} height={40} />}
      </CardHeader>
      <CardBody
        height={isMobile() ? 'small' : 'medium'}
        pad={{ vertical: 'small', horizontal: 'small' }}
      >
        <Text margin="xxsmall">
          <Text color="dark-3">抵押</Text>
          <Text
            weight="bold"
            style={{ color: '#008cd5', marginLeft: 4, marginRight: 4 }}
          >
            {stakedToken.balance}
          </Text>
          <Text color="black">{stakedToken.symbol}</Text>
        </Text>
        {earnedToken && (
          <Text margin="xxsmall">
            <Text color="dark-3">赚取</Text>
            <Text
              weight="bold"
              style={{ color: '#008cd5', marginLeft: 4, marginRight: 4 }}
            >
              {earnedToken.balance}
            </Text>
            <Text color="black">{earnedToken.symbol}</Text>
          </Text>
        )}
        {pendingToken && (
          <Text margin="xxsmall">
            <Text color="dark-3">收益</Text>
            <Text
              weight="bold"
              style={{ color: '#008cd5', marginLeft: 4, marginRight: 4 }}
            >
              {pendingToken.balance}
            </Text>
            <Text color="black">{pendingToken.symbol}</Text>
          </Text>
        )}
      </CardBody>
      <CardFooter
        pad={{ vertical: 'small', horizontal: 'small' }}
        align="end"
        gap="medium"
        justify="end"
        background="light-2"
      >
        <Text>
          <Text size="small">价值</Text>
          <Text size="medium" color="brand" weight="bold" margin="small">
            {`$${props.calcValue && props.calcValue(props.pool)}`}
          </Text>
        </Text>
      </CardFooter>
    </Card>
  )
}

export default PoolCard
