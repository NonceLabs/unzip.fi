import React from 'react'
import { Box, Nav, Sidebar } from 'grommet'

import { Satellite, View, SettingsOption, PieChart } from 'grommet-icons'
import MenuItem from '../MenuItem'

const SidebarHeader = () => <Box align="center"></Box>

const SidebarFooter = () => (
  <Nav gap="small">
    <MenuItem label="设置" icon={<SettingsOption size="medium" />} />
  </Nav>
)

const MainNavigation = () => (
  <Nav gap="none">
    <MenuItem label="概览" icon={<View size="medium" />} active />
    <MenuItem label="分析" icon={<PieChart size="medium" />} />
    <MenuItem label="热门" icon={<Satellite size="medium" />} />
  </Nav>
)

const Comp = () => {
  return (
    <Sidebar
      background="light-3"
      width="small"
      pad="none"
      id="sidebar"
      header={<SidebarHeader />}
      footer={<SidebarFooter />}
    >
      <MainNavigation />
    </Sidebar>
  )
}

export default Comp
