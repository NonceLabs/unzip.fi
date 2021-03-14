import React from 'react'
import { Box, Anchor, Text, Image, ResponsiveContext } from 'grommet'
import { Ascending, Descending, Share } from 'grommet-icons'
import { formatBalance } from '@utils/format'
import { ellipsis } from '@utils/common'
import { useSelector } from 'react-redux'
import { TokenLogo } from '@components/Common'
interface Props {
  transaction: Transaction
  account: string
}

function TransactionItem(props: Props) {
  const { transaction, account } = props
  const { hash, from, to, tokenSymbol, value } = transaction

  const isDarkMode = useSelector((state) => state.dark)
  const isReceived = to === account.toLowerCase()

  return (
    <ResponsiveContext.Consumer>
      {(size) => {
        const isMobile = size === 'small'

        const addressBox = (
          <Box direction="row" align="center" justify="end" width="240px">
            <Text size="small" margin={{ horizontal: 'small' }}>
              {isReceived ? 'From' : 'To'}
            </Text>
            <Box
              direction="row"
              align="center"
              style={{
                backgroundColor: isDarkMode ? '#333' : '#e3e3e3',
                padding: '2px 8px',
                borderRadius: 4,
                paddingRight: 12,
              }}
            >
              <Text size="small">{ellipsis(isReceived ? from : to)}</Text>
              <Anchor
                target="_blank"
                href={`https://bscscan.com/address/${isReceived ? from : to}`}
                style={{ marginLeft: 4 }}
              >
                <Share size="small" color="brand" />
              </Anchor>
            </Box>
          </Box>
        )

        return (
          <Box
            key={hash}
            direction="row"
            align="center"
            justify="between"
            width={isMobile ? '100%' : '600px'}
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
              <TokenLogo symbol={tokenSymbol} />
              <Text margin={{ horizontal: 'small' }} weight="bold">
                {`${formatBalance(value)} ${tokenSymbol}`}
              </Text>
            </Box>

            {!isMobile && addressBox}
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default TransactionItem
