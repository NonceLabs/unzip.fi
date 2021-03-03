import React from 'react'
import { useAsync } from 'react-use'
import { PROJECTS } from './config'
import Project from '../Project'
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

const Farms = () => {
  const _calcValue = useAsync(async () => {
    const response = await fetch(
      'https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=3B9KB3G5YKFVBU941BQDV15YABZVXZIDMR'
    )
    const result = await response.json()
    return calcValue(Number(result.result.ethusd))
  }, [])

  return (
    <div className={styles.projects}>
      {PROJECTS.map((project, idx) => {
        return (
          <div key={idx}>
            <Project
              {...project}
              calcValue={_calcValue.loading ? undefined : _calcValue.value}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Farms
