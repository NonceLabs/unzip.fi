import React from 'react'

import { Box, grommet, Grommet, ResponsiveContext } from 'grommet'

import Sidebar from '../components/Sidebar'
import Farms from '../components/Farms'
import Header from '../components/Header'

export const SidebarIcons = () => (
  <Grommet theme={grommet} full>
    <ResponsiveContext.Consumer>
      {(size) => {
        const isMobile = size === 'small'
        return (
          <Box direction={isMobile ? 'column' : 'row'} height={{ min: '100%' }}>
            {isMobile ? <Header /> : <Sidebar />}
            <Farms />
          </Box>
        )
      }}
    </ResponsiveContext.Consumer>
  </Grommet>
)

export default SidebarIcons
