import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Box, Button, Text, Image, Heading } from 'grommet'
import icons from '@utils/icons'
import { injected } from '@hooks/connectors'
import { useLocale } from '@utils/withLocale'
import Header from '@components/Overview/Header'

function Connector() {
  const { activate } = useWeb3React()
  const [, t] = useLocale()

  return (
    <Box direction="column" align="center" width="100%" gap="medium">
      <Header />
      <Heading level="2">{t('login_unzip')}</Heading>
      <Button
        primary
        style={{
          borderRadius: 8,
          width: 300,
        }}
        size="large"
        label={
          <Box direction="row" align="center" justify="center">
            <Image
              src={icons.METAMASK}
              style={{ width: 30, height: 30, marginRight: 10 }}
            />
            <Text style={{ marginRight: 8 }}>{t('login_with_metamask')}</Text>
          </Box>
        }
        onClick={() => {
          activate(injected)
        }}
      />
      <Button
        secondary
        size="large"
        style={{
          borderRadius: 8,
          width: 300,
        }}
        label={
          <Box direction="row" align="center" justify="center">
            <Image
              src={icons.IMTOKEN}
              style={{
                width: 30,
                height: 30,
                borderRadius: 4,
                marginRight: 10,
              }}
            />
            <Text style={{ marginRight: 8 }}>{t('login_with_imtoken')}</Text>
          </Box>
        }
        onClick={() => {
          activate(injected)
        }}
      />
    </Box>
  )
}

export default Connector
