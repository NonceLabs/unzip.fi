import React from 'react'
import Chart from './Chart'
import { Box, ResponsiveContext } from 'grommet'
import styles from '@styles/Project.module.css'
import Desc from './Desc'

const Analysis = () => {
  return (
    <ResponsiveContext.Consumer>
      {(size) => {
        const isMobile = size === 'small'
        return (
          <Box
            direction={isMobile ? 'column' : 'row'}
            className={styles.assets}
            align={isMobile ? 'center' : 'start'}
          >
            <Chart width={300} height={300} />

            <Desc />
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  )
}

export default Analysis
