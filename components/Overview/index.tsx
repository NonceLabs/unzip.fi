import React from 'react'
import { Box, ResponsiveContext } from 'grommet'
import Assets from '../Assets'
import Farms from '../Farms'
import Analysis from '../Analysis/index'
import styles from '../../styles/Home.module.css'

const Overview = ({ assetLoading, farmLoading }) => {
  // const account = '0xD3f4381936A90db280c62b2783664c993eB6A952'

  return (
    <Box direction="column" align="center" className={styles.mainBox}>
      <ResponsiveContext.Consumer>
        {(size) => {
          const isMobile = size === 'small'
          return (
            <Box
              direction={isMobile ? 'column' : 'row'}
              width={isMobile ? '100%' : undefined}
            >
              <Box direction="column">
                <Box align="center" justify="center">
                  <Analysis
                    assetLoading={assetLoading}
                    farmLoading={farmLoading}
                  />
                </Box>
                <Assets loading={assetLoading} />
              </Box>
              <Farms loading={farmLoading} />
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Box>
  )
}

export default Overview
