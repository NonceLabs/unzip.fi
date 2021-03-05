import React from 'react'
import { Header, Layer, Box } from 'grommet'
import { Menu } from 'grommet-icons'
import Sidebar from '../Sidebar'
import Account from '../Account'

const Comp = (props: SidebarProps) => {
  const [show, setShow] = React.useState(false)
  return (
    <Header background="light-2" pad="medium" height="60px">
      <Menu color="brand" onClick={() => setShow(true)} />
      {show && (
        <Layer
          responsive={false}
          onClickOutside={(e) => {
            setShow(false)
          }}
        >
          <Sidebar
            activeTab={props.activeTab}
            setActiveTab={(tab) => {
              props.setActiveTab(tab)
              setShow(false)
            }}
            isMobile
          />
        </Layer>
      )}
      <Box justify="end">
        <Account />
      </Box>
    </Header>
  )
}

export default Comp
