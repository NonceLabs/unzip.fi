import React from 'react'
import { Box, Image, Text } from 'grommet'
import { useSelector } from 'react-redux'
import { ShareRounded } from 'grommet-icons'
import { calcValue } from '../../utils/price'
import PoolCard from '../PoolCard'
import styles from '../../styles/Project.module.css'

function Project(props: ProjectProps) {
  const bnbPrice = useSelector((state) => state.bnbPrice)

  const { name, logo, link, getPoolsStat, pools } = props

  let total = 0
  pools.map((p) => {
    total += Number(calcValue(p, bnbPrice))
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
            <Text
              size="medium"
              color="brand"
              weight="bold"
              margin="none"
            >{`$${total}`}</Text>
          </Box>
          {/* <Markdown style={{ fontSize: 14, color: '#666' }}>{desc}</Markdown> */}
        </div>
        <Box
          pad="small"
          border={{ color: 'light-3', side: 'bottom', size: 'large' }}
        />
        <Box direction="column" align="center" justify="center">
          {(pools || []).map((pool, idx) => {
            return (
              <PoolCard
                key={idx}
                pool={pool}
                totalValue={calcValue(pool, bnbPrice)}
              />
            )
          })}
        </Box>
      </div>
    </>
  )
}

export default Project
