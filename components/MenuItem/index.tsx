import React from 'react'
import { Box, Text } from 'grommet'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import styles from '@styles/MenuItem.module.css'

interface Props {
  Icon: any
  label: string
  active?: boolean
  link: string
}

const MenuItem = (props: Props) => {
  const { Icon, label, active, link } = props
  const isDarkMode = useSelector((state) => state.dark)
  return (
    <Link href={link} prefetch>
      <Box
        pad={{ vertical: 'medium', horizontal: 'medium' }}
        align="center"
        direction="row"
        className={styles.item}
        margin="none"
        style={
          active ? { backgroundColor: isDarkMode ? '#233' : '#2e81c5' } : {}
        }
      >
        <Icon size="medium" color="light-3" />
        <Text size="medium" color="light-3" style={{ marginLeft: 16 }}>
          {label}
        </Text>
      </Box>
    </Link>
  )
}

export default MenuItem
