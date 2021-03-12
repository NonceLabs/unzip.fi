import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, DropButton, Image, Text } from 'grommet'
import { Checkmark } from 'grommet-icons'
import { CURRENCIES } from '../../utils'
import { updateCurrency } from '../../store/actions'
import styles from '../../styles/Home.module.css'

function Header() {
  const [open, setOpen] = useState(false)
  const rates = useSelector((state) => state.rates)
  const currency = useSelector((state) => state.currency)
  const dispatch = useDispatch()

  return (
    <Box direction="row" align="center" width="100%" justify="end" pad="medium">
      <DropButton
        label={currency}
        size="medium"
        open={open}
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
                  className={styles.currencyItem}
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
    </Box>
  )
}

export default Header
