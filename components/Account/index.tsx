import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Text, Image, Avatar, ResponsiveContext } from 'grommet'
import Link from 'next/link'
import { ellipsis } from '@utils/common'
import icons from '@utils/icons'
import { useLocale } from '@utils/withLocale'

function Account() {
  const account = useSelector((state) => state.account)
  const isDarkMode = useSelector((state) => state.dark)
  const [, t] = useLocale()

  return (
    <ResponsiveContext.Consumer>
      {(size) => {
        const isMobile = size === 'small'
        return (
          <>
            {account ? (
              <Box direction="column" align="center">
                {!isMobile && (
                  <Link href="/">
                    <Avatar src={isDarkMode ? icons.LOGO : icons.LOGO_DARK} />
                  </Link>
                )}
                <Text
                  size="small"
                  margin={{ vertical: 'small' }}
                  weight="bold"
                  color="light-3"
                >
                  {ellipsis(account as string, 6, 4)}
                </Text>
              </Box>
            ) : (
              <Box
                direction="column"
                align="center"
                justify="center"
                gap="small"
              >
                <Image
                  src={icons.LOGO_DARK}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <Text size="medium" weight="bold" color="light-3">
                  {t('welcome_to_unzip')}
                </Text>
                <Text size="small" textAlign="center" color="light-3">
                  {t('connect_tip')}
                </Text>
              </Box>
            )}
          </>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Account
