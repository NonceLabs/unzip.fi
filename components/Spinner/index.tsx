import React from 'react'
import { Text } from 'grommet'

interface Props {
  poolName: string
}

function Spinner(props: Props) {
  return (
    <div className="loader-wrap">
      <Text style={{ marginLeft: 20 }}>{`正在计算 ${props.poolName}`}</Text>
    </div>
  )
}

export default Spinner
