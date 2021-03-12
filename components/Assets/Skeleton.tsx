import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Box } from 'grommet'
import { useSelector } from 'react-redux'

export const AssetSkeleton = () => {
  const isDarkMode = useSelector((state) => state.dark)
  return (
    <SkeletonTheme
      color={isDarkMode ? '#202020' : undefined}
      highlightColor={isDarkMode ? '#444' : undefined}
    >
      <Skeleton width="100%" height={80} />
    </SkeletonTheme>
  )
}

export const AssetsSkeleton = () => {
  return (
    <Box direction="column" gap="small">
      {[1, 2, 3].map((t) => {
        return <AssetSkeleton key={t} />
      })}
    </Box>
  )
}
