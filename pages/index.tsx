import React, { useState } from 'react'
import { Box, grommet, Grommet, ResponsiveContext } from 'grommet'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { useEagerConnect, useInactiveListener } from '../hooks'
import Web3ProviderWrap from '../components/Web3Provider'
import Sidebar from '../components/Sidebar'
import Overview from '../components/Overview'
import Header from '../components/Header'
import { TAB } from '../utils/types'

export const App = () => {
  const context = useWeb3React<Web3Provider>()
  const { connector } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>()
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  const [activeTab, setActiveTab] = useState(TAB.OVERVIEW)

  return (
    <Grommet theme={grommet} full>
      <ResponsiveContext.Consumer>
        {(size) => {
          const isMobile = size === 'small'
          return (
            <Box
              direction={isMobile ? 'column' : 'row'}
              style={{ height: '100vh' }}
            >
              {isMobile ? (
                <Header activeTab={activeTab} setActiveTab={setActiveTab} />
              ) : (
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              )}
              <Overview />
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Grommet>
  )
}

const Home = () => {
  return (
    <Web3ProviderWrap>
      <App />
    </Web3ProviderWrap>
  )
}

export default Home
