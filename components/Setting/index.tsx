import React from 'react'
import { Box, Heading, List, Text, Image, Anchor } from 'grommet'
import { ShareRounded } from 'grommet-icons'
import { useLocale } from '@utils/withLocale'
import { PROJECTS } from '@components/Farms/config'
import styles from '@styles/Home.module.css'
import { useSelector } from 'react-redux'

const Setting = () => {
  const [, t] = useLocale()
  const isDarkMode = useSelector((state) => state.dark)

  return (
    <Box direction="column" align="center" className={styles.mainBox}>
      <Heading level="3">{t('supported_farms')}</Heading>
      <List
        primaryKey="name"
        secondaryKey="percent"
        data={PROJECTS}
        style={{ width: 370 }}
        children={(datum, index) => {
          return (
            <Box key={index} direction="row" align="center" justify="between">
              <Box direction="row" align="center">
                <Image
                  src={datum.logo}
                  width={40}
                  height={40}
                  style={{ borderRadius: 20 }}
                />
                <Anchor
                  href={datum.link}
                  target="_blank"
                  margin={{ horizontal: '10px' }}
                >
                  <Text>{datum.name}</Text>
                  <ShareRounded
                    size="small"
                    color="#008cd5"
                    style={{ marginLeft: 4 }}
                  />
                </Anchor>
              </Box>
              <Box>
                {datum.tags.map((t) => {
                  return (
                    <Text
                      key={t}
                      size="small"
                      style={{
                        background: isDarkMode ? '#333' : '#e3e3e3',
                        padding: '4px 10px',
                        borderRadius: 4,
                      }}
                    >
                      {t}
                    </Text>
                  )
                })}
              </Box>
            </Box>
          )
        }}
      />
    </Box>
  )
}

export default Setting
