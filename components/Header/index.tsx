import React from 'react'
import { Header, Layer, Box } from 'grommet'
import { Menu } from 'grommet-icons'
import { useSelector } from 'react-redux'
import Sidebar from '@components/Sidebar'
import Account from '@components/Account'

const Comp = (props: SidebarProps) => {
  const isDarkMode = useSelector((state) => state.dark)
  const [show, setShow] = React.useState(false)
  return (
    <Header
      background={isDarkMode ? '#111' : 'light-2'}
      pad="medium"
      height="60px"
    >
      <Menu color="brand" onClick={() => setShow(true)} />
      {show && (
        <Layer
          responsive={false}
          onClickOutside={(e) => {
            setShow(false)
          }}
        >
          <Sidebar activeTab={props.activeTab} isMobile />
        </Layer>
      )}
      <Box justify="end" pad="none">
        <Account />
      </Box>
    </Header>
  )
}

export default Comp
