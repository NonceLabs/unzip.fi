import React from 'react'
import { useSelector } from 'react-redux'
import Project from '../Project'
import { FarmSkeleton } from '../Project/Skeleton'
import styles from '../../styles/Farms.module.css'

const Farms = ({ loading }) => {
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
      {loading && <FarmSkeleton />}
    </div>
  )
}

export default Farms
