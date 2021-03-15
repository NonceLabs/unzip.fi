import React from 'react'
import { Box, Image, Text, Anchor } from 'grommet'

function InfoBox({ tokenContract, t }) {
  return (
    <Box
      direction="column"
      align="start"
      justify="start"
      pad="small"
      gap="small"
      style={{
        border: '1px solid #e3e3e3',
        borderRadius: 8,
        minHeight: 'unset',
      }}
    >
      <Box direction="row" align="center" justify="between">
        <Image
          src="/images/bscscan.jpg"
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            marginRight: 10,
          }}
        />
        <Anchor
          href={`https://bscscan.com/token/${tokenContract}`}
          target="_blank"
        >
          <Text weight="normal" size="small">
            {t('view_info')}
          </Text>
        </Anchor>
      </Box>
      <Box direction="row" align="center" justify="between">
        <Image
          src="/images/pancake.jpg"
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            marginRight: 10,
          }}
        />
        <Anchor
          href={`https://exchange.pancakeswap.finance/#/swap?inputCurrency=${tokenContract}`}
          target="_blank"
        >
          <Text weight="normal" size="small">
            {t('buy_or_sell')}
          </Text>
        </Anchor>
      </Box>
    </Box>
  )
}

export default InfoBox
