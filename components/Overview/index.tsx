import React from 'react'
import { Box, ResponsiveContext } from 'grommet'
import Assets from '@components/Assets'
import Farms from '@components/Farms'
import Analysis from '@components/Analysis/index'
import styles from '@styles/Home.module.css'
import Header from './Header'

const Overview = ({}) => {
  return (
    <Box direction="column" align="center" className={styles.mainBox}>
      <ResponsiveContext.Consumer>
        {(size) => {
          const isMobile = size === 'small'
          return (
            <Box>
              <Header />
              <Box
                pad="none"
                width="96%"
                border={{ color: 'light-4', side: 'bottom', size: 'small' }}
                alignSelf="center"
              />
              <Box
                direction={isMobile ? 'column' : 'row'}
                width={isMobile ? '100%' : undefined}
              >
                <Box direction="column">
                  <Analysis />
                  <Assets />
                </Box>
                <Farms />
              </Box>
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Box>
  )
}

export default Overview
