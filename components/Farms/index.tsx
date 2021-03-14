import React from 'react'
import { useSelector } from 'react-redux'
import Project from '@components/Project'
import { FarmSkeleton } from '@components/Project/Skeleton'
import styles from '@styles/Farms.module.css'

const Farms = ({}) => {
  const farms = useSelector((state) => state.farms)

  return (
    <div className={styles.projects}>
      {farms.map((farm, idx) => {
        return (
          <div key={idx}>
            <Project {...farm} />
          </div>
        )
      })}
      {farms.length === 0 && <FarmSkeleton />}
    </div>
  )
}

export default Farms
