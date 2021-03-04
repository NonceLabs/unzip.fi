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
          onClickOutside={(e) => {
            setShow(false)
            console.log('e', e)
          }}
          style={{
            background: 'rgba(0,0,0,0.5)',
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
