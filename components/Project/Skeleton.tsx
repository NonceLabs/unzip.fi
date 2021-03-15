import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Box } from 'grommet'
import { useSelector } from 'react-redux'
import styles from '@styles/Project.module.css'

export const ProjectSkeleton = () => {
  const isDarkMode = useSelector((state) => state.dark)
  return (
    <Box className={styles.project} align="center" justify="center">
      <SkeletonTheme
        color={isDarkMode ? '#202020' : undefined}
        highlightColor={isDarkMode ? '#444' : undefined}
      >
        <Skeleton width={300} height={250} />
      </SkeletonTheme>
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
