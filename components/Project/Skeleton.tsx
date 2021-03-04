import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Box } from 'grommet'

export const ProjectSkeleton = () => {
  return <Skeleton width={300} height={250} />
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
