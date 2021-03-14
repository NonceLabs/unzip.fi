import React from 'react'
import { Box, Anchor, Text, Image } from 'grommet'
import { Ascending, Descending, Share } from 'grommet-icons'
import { formatBalance } from '@utils/format'
import { ellipsis } from '@utils/common'

interface Props {
  transaction: Transaction
  account: string
}

function TransactionItem(props: Props) {
  const { transaction, account } = props
  const { hash, from, to, tokenSymbol, value } = transaction

  const isReceived = from === account.toLowerCase()

  return (
    <Box
      key={hash}
      direction="row"
      align="center"
      justify="between"
      width="600px"
      pad="none"
    >
      <Box direction="row" align="center" width="50px">
        <Box
          background="light-3"
          align="center"
          justify="center"
          style={{ width: 30, height: 30, borderRadius: 15 }}
        >
          {isReceived ? (
            <Descending color="status-error" />
          ) : (
            <Ascending color="status-ok" />
          )}
        </Box>
      </Box>
      <Box direction="row" align="center" justify="start" width="250px">
        <Image
          src={`/images/tokens/${tokenSymbol}.png`}
          fallback="/images/tokens/404.png"
          style={{ width: 30, height: 30, flex: 'unset' }}
          fit="contain"
        />
        <Text margin={{ horizontal: 'small' }} weight="bold">
          {`${formatBalance(value)} ${tokenSymbol}`}
        </Text>
      </Box>

      <Box direction="row" align="center" justify="end" width="240px">
        <Text size="small" margin={{ horizontal: 'small' }}>
          {isReceived ? 'From' : 'To'}
        </Text>
        <Box
          direction="row"
          align="center"
          style={{
            backgroundColor: '#e3e3e3',
            padding: '2px 8px',
            borderRadius: 4,
            paddingRight: 12,
          }}
        >
          <Text size="small">{ellipsis(isReceived ? to : from)}</Text>
          <Anchor
            target="_blank"
            href={`https://bscscan.com/address/${isReceived ? to : from}`}
            style={{ marginLeft: 4 }}
          >
            <Share size="small" color="brand" />
          </Anchor>
        </Box>
      </Box>
    </Box>
  )
}

export default TransactionItem
