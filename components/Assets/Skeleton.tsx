import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Box } from 'grommet'

export const AssetSkeleton = () => {
  return <Skeleton width="100%" height={80} />
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
