import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Box } from 'grommet'
import styles from '../../styles/Project.module.css'

export const ProjectSkeleton = () => {
  return (
    <Box className={styles.project} align="center" justify="center">
      <Skeleton width={300} height={250} />
    </Box>
  )
}

export const FarmSkeleton = () => {
  return (
    <Box direction="column" gap="small">
      {[1, 2].map((t) => {
        return <ProjectSkeleton key={t} />
      })}
    </Box>
  )
}
