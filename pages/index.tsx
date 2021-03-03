import React from 'react'

import {
  Avatar,
  Button,
  Box,
  grommet,
  Grommet,
  Nav,
  Sidebar,
  Menu,
  Text,
} from 'grommet'

import { Satellite, View, SettingsOption, PieChart } from 'grommet-icons'
import MenuItem from '../components/MenuItem'

const SidebarHeader = () => (
  <Box align="center">
    <Avatar
      border={{ size: 'small', color: 'accent-2' }}
      background="white"
      flex={false}
    >
      SY
    </Avatar>
  </Box>
)

const SidebarFooter = () => (
  <Nav gap="small">
    <MenuItem label="设置" icon={<SettingsOption size="medium" />} />
  </Nav>
)

const MainNavigation = () => (
  <Nav gap="none">
    <MenuItem label="概览" icon={<View size="medium" />} />
    <MenuItem label="分析" icon={<PieChart size="medium" />} />
    <MenuItem label="热门" icon={<Satellite size="medium" />} />
  </Nav>
)

export const SidebarIcons = () => (
  <Grommet theme={grommet} full>
    <Box direction="row" height={{ min: '100%' }}>
      <Sidebar
        background="light-3"
        width="small"
        pad="none"
        header={<SidebarHeader />}
        footer={<SidebarFooter />}
      >
        <MainNavigation />
      </Sidebar>
    </Box>
  </Grommet>
)

export default SidebarIcons
