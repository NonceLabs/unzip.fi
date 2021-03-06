import React from 'react'
import { Box, Nav, Sidebar, Anchor, Image } from 'grommet'
import {
  Satellite,
  View,
  SettingsOption,
  PieChart,
  Twitter,
  Mail,
  Github,
} from 'grommet-icons'
import MenuItem from '../MenuItem'
import Account from '../Account'
import { TAB } from '../../utils/types'
import withLocale, { useLocale } from '../../utils/withLocale'

const SidebarHeader = () => (
  <Box align="center" pad="small">
    <Account />
  </Box>
)

const SidebarFooter = (props: SidebarProps) => {
  const [, t] = useLocale()
  return (
    <Nav gap="none">
      <Box
        direction="row"
        align="center"
        justify="between"
        pad={{ horizontal: 'medium' }}
      >
        <Anchor target="_blank" href="https://twitter.com/FiUnzip">
          <Twitter size="medium" color="#008cd5" />
        </Anchor>
        <Anchor
          target="_blank"
          href="mailto:chezhe@hey.com"
          style={{ margin: '0 16px' }}
        >
          <Image src="/images/mail.png" width="20" height="20" />
        </Anchor>
        <Anchor target="_blank" href="https://t.me/joinchat/bdqygvERHzdkNWRl">
          <Image src="/images/telegram.svg" width="20" height="20" />
        </Anchor>
      </Box>
      <Box
        pad="none"
        margin={{ horizontal: 'small' }}
        border={{ color: 'light-5', side: 'bottom', size: 'small' }}
      />
      <MenuItem
        label={t('setting')}
        Icon={SettingsOption}
        active={props.activeTab === TAB.SETTING}
        onClick={() => props.setActiveTab(TAB.SETTING)}
      />
    </Nav>
  )
}

const MainNavigation = (props: SidebarProps) => {
  const [, t] = useLocale()
  return (
    <Nav gap="none">
      <MenuItem
        label={t('overview')}
        Icon={View}
        active={props.activeTab === TAB.OVERVIEW}
        onClick={() => props.setActiveTab(TAB.OVERVIEW)}
      />
      {/* <MenuItem
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
      /> */}
    </Nav>
  )
}

const Comp = (props: SidebarProps) => {
  return (
    <Sidebar
      background="light-3"
      width="250px"
      pad="none"
      gap="none"
      id="sidebar"
      header={props.isMobile ? <Box height="20px" /> : <SidebarHeader />}
      footer={<SidebarFooter {...props} />}
      style={
        props.isMobile
          ? {
              height: '104vh',
              position: 'fixed',
              top: '-50vh',
              left: '-50vw',
              maxWidth: 'unset',
            }
          : {}
      }
    >
      <MainNavigation {...props} />
    </Sidebar>
  )
}

export default withLocale(Comp)
