import React from 'react'
import { Box, Text } from 'grommet'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import styles from '../../styles/MenuItem.module.css'

interface Props {
  Icon: any
  label: string
  active?: boolean
  onClick: fn
  link: string
}

const MenuItem = (props: Props) => {
  const { Icon, label, active, onClick, link } = props
  const isDarkMode = useSelector((state) => state.dark)
  return (
    <Link href={link}>
      <Box
        pad={{ vertical: 'medium', horizontal: 'medium' }}
        align="center"
        direction="row"
        className={styles.item}
        margin="none"
        style={
          active ? { backgroundColor: isDarkMode ? '#233' : '#dadada' } : {}
        }
        onClick={onClick}
      >
        <Icon size="medium" />
        <Text size="small" style={{ marginLeft: 16 }}>
          {label}
        </Text>
      </Box>
    </Link>
  )
}

export default MenuItem
