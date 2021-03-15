import React from 'react'
import { Box, Image, Text } from 'grommet'
import { useSelector } from 'react-redux'
import { ShareRounded } from 'grommet-icons'
import { calcValue } from '@utils/price'
import PoolCard from '@components/PoolCard'
import styles from '@styles/Project.module.css'
import { thousandCommas } from '@utils/format'
import { CURRENCY_SYMBOLS } from '@utils/constanst'

function Project(props: ProjectProps) {
  const bnbPrice = useSelector((state) => state.bnbPrice)
  const rate = useSelector((state) => state.rate)
  const currency = useSelector((state) => state.currency)
  const isDarkMode = useSelector((state) => state.dark)

  const { name, logo, link, getPoolsStat, pools } = props

  let total = 0
  pools.map((p) => {
    total += Number(calcValue(p, bnbPrice * rate))
  })

  return (
    <>
      <div className={styles.project}>
        <div>
          <Box direction="row" align="center" justify="between">
            <Box direction="row" align="center" justify="start">
              <Image src={logo} style={{ width: 30, height: 30 }} />
              <Text style={{ marginLeft: 4 }}>{name}</Text>
              <a
                href={link}
                target="_blank"
                style={{ position: 'relative', top: 4, marginLeft: 6 }}
              >
                <ShareRounded color="#008cd5" size="20px" />
              </a>
            </Box>
            <Text size="medium" color="brand" weight="bold" margin="none">
              {`${CURRENCY_SYMBOLS[currency]}${thousandCommas(total, 0)}`}
            </Text>
          </Box>
        </div>

        <Box
          background={isDarkMode ? 'dark-1' : 'light-3'}
          style={{ marginTop: 10 }}
          pad="4px"
        />

        <Box direction="column" align="center" justify="center">
          {(pools || []).map((pool, idx) => {
            return (
              <PoolCard
                key={idx}
                pool={pool}
                totalValue={calcValue(pool, bnbPrice * rate)}
              />
            )
          })}
        </Box>
      </div>
    </>
  )
}

export default Project
