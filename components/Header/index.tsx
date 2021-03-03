import React from 'react'
import { Header, Layer, Button } from 'grommet'
import { Menu } from 'grommet-icons'
import Sidebar from '../Sidebar'

const Comp = () => {
  const [show, setShow] = React.useState(false)
  return (
    <Header background="light-2" pad="medium" height="xxsmall">
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
          <Sidebar />
        </Layer>
      )}
    </Header>
  )
}

export default Comp
