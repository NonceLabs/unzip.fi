import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, DropButton, Image, Text } from 'grommet'
import { Checkmark } from 'grommet-icons'
import DarkModeToggle from 'react-dark-mode-toggle'
import { CURRENCIES } from '../../utils'
import { updateCurrency, updateTheme } from '../../store/actions'
import styles from '../../styles/Home.module.css'

function Header() {
  const [open, setOpen] = useState(false)
  const rates = useSelector((state) => state.rates)
  const currency = useSelector((state) => state.currency)
  const isDarkMode = useSelector((state) => state.dark)
  const dispatch = useDispatch()

  return (
    <Box direction="row" align="center" width="100%" justify="end" pad="medium">
      <DropButton
        label={currency}
        size="small"
        open={open}
        margin={{ horizontal: 'medium' }}
        dropAlign={{ top: 'bottom', right: 'right' }}
        icon={
          <Image
            src={`/images/currency/${currency}.svg`}
            width="20"
            height="20"
          />
        }
        onClick={() => setOpen(!open)}
        dropContent={
          <Box direction="column">
            {CURRENCIES.map((t) => {
              if (!rates[t]) {
                return null
              }
              return (
                <Box
                  key={t}
                  direction="row"
                  align="center"
                  pad="small"
                  className={
                    isDarkMode ? styles.currencyItemDark : styles.currencyItem
                  }
                  onClick={() => {
                    dispatch(updateCurrency(t))
                    setOpen(false)
                  }}
                >
                  <Image
                    src={`/images/currency/${t}.svg`}
                    width="20"
                    height="20"
                  />
                  <Text size="small" margin={{ horizontal: 'small' }}>
                    {t}
                  </Text>
                  {t === currency && <Checkmark color="brand" size="small" />}
                </Box>
              )
            })}
          </Box>
        }
      />

      <DarkModeToggle
        onChange={() => dispatch(updateTheme(!isDarkMode))}
        checked={isDarkMode}
        size={66}
      />
    </Box>
  )
}

export default Header
