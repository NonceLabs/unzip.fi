import React from 'react'
import { Box, Nav, Sidebar, Anchor } from 'grommet'
import { View, SettingsOption, Twitter, MailOption, Send } from 'grommet-icons'
import { useSelector } from 'react-redux'
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
      <Box direction="row" align="center" justify="between" pad="medium">
        <Anchor target="_blank" href="https://twitter.com/FiUnzip">
          <Twitter size="medium" />
        </Anchor>
        <Anchor
          target="_blank"
          href="mailto:chezhe@hey.com"
          style={{ margin: '0 16px' }}
        >
          <MailOption size="medium" />
        </Anchor>
        <Anchor target="_blank" href="https://t.me/joinchat/bdqygvERHzdkNWRl">
          <Send size="medium" />
        </Anchor>
      </Box>
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

      <MenuItem
        label={t('setting')}
        Icon={SettingsOption}
        active={props.activeTab === TAB.SETTING}
        onClick={() => props.setActiveTab(TAB.SETTING)}
      />
    </Nav>
  )
}

const Comp = (props: SidebarProps) => {
  const isDark = useSelector((state) => state.dark)
  return (
    <Sidebar
      width="200px"
      pad="none"
      gap="none"
      id="sidebar"
      background={isDark ? 'dark-1' : 'light-3'}
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
