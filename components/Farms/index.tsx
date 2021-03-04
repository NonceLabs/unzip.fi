import React from 'react'
import { useSelector } from 'react-redux'
import Project from '../Project'
import { FarmSkeleton } from '../Project/Skeleton'
import styles from '../../styles/Farms.module.css'

const calcValue = (price: number) => {
  return (pool: PoolInfo) => {
    let v = 0
    v += Number(pool.stakedToken.balance) * Number(pool.stakedToken.price)
    if (pool.pendingToken) {
      v += Number(pool.pendingToken.balance) * Number(pool.pendingToken.price)
    }
    return (v * price).toFixed(0)
  }
}

const Farms = ({ loading }) => {
  const bnbPrice = useSelector((state) => state.bnbPrice)
  const farms = useSelector((state) => state.farms)

  return (
    <div className={styles.projects}>
      {farms.map((farm, idx) => {
        return (
          <div key={idx}>
            <Project {...farm} calcValue={calcValue(bnbPrice)} />
          </div>
        )
      })}
      {loading && <FarmSkeleton />}
    </div>
  )
}

export default Farms
