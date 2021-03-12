import React from 'react'
import { Box, ResponsiveContext } from 'grommet'
import Assets from '../Assets'
import Farms from '../Farms'
import Analysis from '../Analysis/index'
import styles from '../../styles/Home.module.css'
import ErrorBox from '../ErrorBox'
import Header from './Header'

const Overview = ({ assetLoading, farmLoading, error }) => {
  // const account = '0xD3f4381936A90db280c62b2783664c993eB6A952'

  return (
    <Box direction="column" align="center" className={styles.mainBox}>
      <ErrorBox error={error} />
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
                  <Analysis
                    assetLoading={assetLoading}
                    farmLoading={farmLoading}
                  />
                  <Assets loading={assetLoading} />
                </Box>
                <Farms loading={farmLoading} />
              </Box>
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Box>
  )
}

export default Overview
