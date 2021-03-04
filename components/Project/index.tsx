import React from 'react'
import { Box, Image, Text, Markdown } from 'grommet'
import PoolCard from '../PoolCard'
import { ShareRounded } from 'grommet-icons'
import styles from '../../styles/Project.module.css'

function Project(props: ProjectProps) {
  const { name, logo, desc, link, getPoolsStat, calcValue, pools } = props

  return (
    <>
      <div className={styles.project}>
        <div>
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
          {/* <Markdown style={{ fontSize: 14, color: '#666' }}>{desc}</Markdown> */}
        </div>
        <Box direction="column" align="center" justify="center">
          {(pools || []).map((pool, idx) => {
            return <PoolCard key={idx} pool={pool} calcValue={calcValue} />
          })}
        </Box>
      </div>
    </>
  )
}

export default Project
