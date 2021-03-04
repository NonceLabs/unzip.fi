import React from 'react'
import { Box, Nav, Sidebar, Anchor } from 'grommet'
import {
  Satellite,
  View,
  SettingsOption,
  PieChart,
  Twitter,
  Mail,
} from 'grommet-icons'
import MenuItem from '../MenuItem'
import Account from '../Account'
import { TAB } from '../../utils/types'

const SidebarHeader = () => (
  <Box align="center" pad="small">
    <Account />
  </Box>
)

const SidebarFooter = () => (
  <Nav gap="small">
    <Box direction="row" align="center" pad="medium">
      <Anchor href="https://twitter.com/FiUnzip">
        <Twitter size="medium" color="#008cd5" />
      </Anchor>
      <Anchor href="mailto:chezhe@hey.com" style={{ marginLeft: 16 }}>
        <Mail size="medium" color="#008cd5" />
      </Anchor>
    </Box>
    {/* <MenuItem label="设置" Icon={SettingsOption} onClick={() => {}} /> */}
  </Nav>
)

const MainNavigation = (props: SidebarProps) => {
  return (
    <Nav gap="none">
      <MenuItem
        label="概览"
        Icon={View}
        active={props.activeTab === TAB.OVERVIEW}
        onClick={() => props.setActiveTab(TAB.OVERVIEW)}
      />
      <MenuItem
        label="分析"
        Icon={PieChart}
        active={props.activeTab === TAB.PIECHART}
        onClick={() => props.setActiveTab(TAB.PIECHART)}
      />
      <MenuItem
        label="热门"
        Icon={Satellite}
        active={props.activeTab === TAB.TREND}
        onClick={() => props.setActiveTab(TAB.TREND)}
      />
    </Nav>
  )
}

const Comp = (props: SidebarProps) => {
  return (
    <Sidebar
      background="light-3"
      width="small"
      pad="none"
      id="sidebar"
      header={props.isMobile ? <Box height="30px" /> : <SidebarHeader />}
      footer={<SidebarFooter />}
    >
      <MainNavigation {...props} />
    </Sidebar>
  )
}

export default Comp
