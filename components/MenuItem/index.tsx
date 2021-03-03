import React from 'react'
import { Box, Text } from 'grommet'
import styles from '../../styles/MenuItem.module.css'

const MenuItem = ({ icon, label }) => {
  return (
    <Box
      pad={{ vertical: 'small', horizontal: 'medium' }}
      align="center"
      direction="row"
      className={styles.item}
      margin="none"
    >
      {icon}
      <Text size="small" style={{ marginLeft: 16 }}>
        {label}
      </Text>
    </Box>
  )
}

export default MenuItem
