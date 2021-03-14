import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Text, Image } from 'grommet'
import { ellipsis } from '@utils/common'
import icons from '@utils/icons'
import { useLocale } from '@utils/withLocale'

function Account() {
  const account = useSelector((state) => state.account)
  const [, t] = useLocale()

  return (
    <>
      {account ? (
        <Text size="small" margin="none" weight="bold">
          {ellipsis(account as string, 6, 4)}
        </Text>
      ) : (
        <Box direction="column" align="center" justify="center" gap="small">
          <Image
            src={icons.LOGO_DARK}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Text size="medium" weight="bold">
            {t('welcome_to_unzip')}
          </Text>
          <Text size="small" textAlign="center">
            {t('connect_tip')}
          </Text>
        </Box>
      )}
    </>
  )
}

export default Account
