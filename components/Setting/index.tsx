import React from 'react'
import { Box, Heading, List, Text, Image, Anchor } from 'grommet'
import { ShareRounded } from 'grommet-icons'
import { useLocale } from '../../utils/withLocale'
import { PROJECTS } from '../Farms/config'
import styles from '../../styles/Home.module.css'

const Setting = () => {
  const [, t] = useLocale()
  return (
    <Box direction="column" align="center" className={styles.mainBox}>
      <Heading level="3">{t('supported_farms')}</Heading>
      <List
        primaryKey="name"
        secondaryKey="percent"
        data={PROJECTS}
        style={{ width: 300 }}
        children={(datum, index) => {
          console.log('###', datum)
          return (
            <Box key={index} direction="row" align="center" justify="between">
              <Image
                src={datum.logo}
                width={40}
                height={40}
                style={{ borderRadius: 20 }}
              />
              <Anchor href={datum.link} target="_blank">
                <Text>{datum.name}</Text>
                <ShareRounded
                  size="small"
                  color="#008cd5"
                  style={{ marginLeft: 4 }}
                />
              </Anchor>
            </Box>
          )
        }}
      />
    </Box>
  )
}

export default Setting
