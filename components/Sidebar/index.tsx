import React from 'react'
import { Box, Nav, Sidebar, Anchor } from 'grommet'
import {
  View,
  SettingsOption,
  Twitter,
  MailOption,
  Send,
  History,
  Github,
} from 'grommet-icons'
import { useSelector } from 'react-redux'
import MenuItem from '@components/MenuItem'
import Account from '@components/Account'
import { TAB } from '@utils/types'
import withLocale, { useLocale } from '@utils/withLocale'

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
          <Twitter size="medium" color="light-3" />
        </Anchor>
        <Anchor
          target="_blank"
          href="mailto:chezhe@hey.com"
          style={{ margin: '0 10px' }}
        >
          <MailOption size="medium" color="light-3" />
        </Anchor>
        <Anchor
          style={{ marginRight: 10 }}
          target="_blank"
          href="https://t.me/joinchat/bdqygvERHzdkNWRl"
        >
          <Send size="medium" color="light-3" />
        </Anchor>
        <Anchor target="_blank" href="https://github.com/loafs/unzip.fi">
          <Github size="medium" color="light-3" />
        </Anchor>
      </Box>
    </Nav>
  )
}

const MainNavigation = (props: SidebarProps) => {
  const [, t] = useLocale()
  const account = useSelector((state) => state.account)
  if (!account) return null

  return (
    <Nav gap="none">
      <MenuItem
        label={t('overview')}
        Icon={View}
        active={props.activeTab === TAB.OVERVIEW}
        link={account ? `/address/${account}/overview` : '/overview'}
      />

      <MenuItem
        label={t('history')}
        Icon={History}
        active={props.activeTab === TAB.HISTORY}
        link={account ? `/address/${account}/history` : '/history'}
      />

      <MenuItem
        label={t('setting')}
        Icon={SettingsOption}
        active={props.activeTab === TAB.SETTING}
        link={account ? `/address/${account}/setting` : '/setting'}
      />
    </Nav>
  )
}

const Comp = (props: SidebarProps) => {
  const isDark = useSelector((state) => state.dark)
  return (
    <Sidebar
      width="300px"
      pad="none"
      gap="none"
      id="sidebar"
      background={isDark ? 'dark-1' : '#3490dc'}
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
