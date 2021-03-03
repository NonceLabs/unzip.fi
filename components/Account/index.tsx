import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button, Text, Image } from 'grommet'
import { ellipsis } from '../../utils/common'
import { injected } from '../../hooks/connectors'
import icons from '../../utils/icons'

function Account() {
  const { account, active, activate } = useWeb3React()

  return (
    <>
      {active ? (
        <div
          style={{
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
          }}
        >
          <Text size="small" margin="medium" weight="bold">
            {ellipsis(account as string)}
          </Text>
        </div>
      ) : (
        <>
          <Button
            primary
            style={{
              borderRadius: 8,
            }}
            label={
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  alignItems: 'center',
                }}
              >
                <Text style={{ marginRight: 8 }}>Connect</Text>
                <Image
                  fit="cover"
                  src={icons.METAMASK}
                  style={{ width: 30, height: 30 }}
                />
              </div>
            }
            onClick={() => {
              activate(injected)
            }}
          />
        </>
      )}
    </>
  )
}

export default Account
