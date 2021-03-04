import React, { Component } from 'react'
import { Box, Text } from 'grommet'
import styles from '../../styles/MenuItem.module.css'

interface Props {
  Icon: any
  label: string
  active?: boolean
  onClick: fn
}

const MenuItem = (props: Props) => {
  const { Icon, label, active, onClick } = props
  return (
    <Box
      pad={{ vertical: 'medium', horizontal: 'medium' }}
      align="center"
      direction="row"
      className={styles.item}
      margin="none"
      style={active ? { backgroundColor: '#dadada' } : {}}
      onClick={onClick}
    >
      <Icon size="medium" />
      <Text size="small" style={{ marginLeft: 16 }}>
        {label}
      </Text>
    </Box>
  )
}

export default MenuItem
