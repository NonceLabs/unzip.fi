import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAsync } from 'react-use'
import { Heading, Image, Text, Markdown } from 'grommet'
import PoolCard from '../PoolCard'
import { ShareRounded } from 'grommet-icons'
import Spinner from '../Spinner'

function Project(props: ProjectProps) {
  const { name, logo, desc, link, getPoolsStat, calcValue } = props

  const { account } = useWeb3React()
  // const account = '0xD3f4381936A90db280c62b2783664c993eB6A952'
  const pools = useAsync(async () => {
    const result = await getPoolsStat(account)
    return result
  }, [account])

  let content = null
  if (pools.loading) {
    content = <Spinner poolName={name} />
  } else {
    content = (
      <div
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {(pools.value || []).map((pool, idx) => {
          return <PoolCard key={idx} pool={pool} calcValue={calcValue} />
        })}
        {(pools.value || []).length === 0 && (
          <>
            <Text alignSelf="center" textAlign="center">
              没有资产
            </Text>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <div
        style={{
          paddingBottom: 20,
          borderBottom: '1px solid #e3e3e3',
          maxWidth: '100vw',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <Image src={logo} style={{ width: 50, height: 50 }} />
            <Heading level={3} style={{ marginLeft: 4 }}>
              {name}
            </Heading>
            <a
              href={link}
              target="_blank"
              style={{ position: 'relative', top: 4 }}
            >
              <ShareRounded color="#008cd5" />
            </a>
          </div>
          <Markdown style={{ fontSize: 14, color: '#666' }}>{desc}</Markdown>
        </div>
        {content}
      </div>
    </>
  )
}

export default Project
