import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { Box, ResponsiveContext } from 'grommet'
import Assets from '../Assets'
import Farms from '../Farms'
import AssetHeader from '../Assets/Header'
import Analysis from '../Analysis'
import styles from '../../styles/Home.module.css'

const Overview = ({ assetLoading, farmLoading }) => {
  // const account = '0xD3f4381936A90db280c62b2783664c993eB6A952'

  return (
    <Box direction="column" align="center" className={styles.mainBox}>
      <AssetHeader />
      <ResponsiveContext.Consumer>
        {(size) => {
          const isMobile = size === 'small'
          return (
            <Box
              direction={isMobile ? 'column' : 'row'}
              width={isMobile ? '100%' : undefined}
            >
              <Box direction="column">
                <Assets loading={assetLoading} />
                <Box align="center" justify="center">
                  <Analysis
                    width={350}
                    height={350}
                    assetLoading={assetLoading}
                    farmLoading={farmLoading}
                  />
                </Box>
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
