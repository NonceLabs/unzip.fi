import React, { Component } from 'react'
import { Box, Text } from 'grommet'
import styles from '../../styles/MenuItem.module.css'

interface Props {
  icon: any
  label: string
  active?: boolean
}

const MenuItem = (props: Props) => {
  const { icon, label, active } = props
  return (
    <Box
      pad={{ vertical: 'small', horizontal: 'medium' }}
      align="center"
      direction="row"
      className={styles.item}
      margin="none"
      style={active ? { background: '#dadada' } : {}}
    >
      {icon}
      <Text size="small" style={{ marginLeft: 16 }}>
        {label}
      </Text>
    </Box>
  )
}

export default MenuItem
