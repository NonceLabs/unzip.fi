import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Layer,
  Box,
  TextInput,
  Button,
  ResponsiveContext,
  Select,
  Text,
} from 'grommet'
import { useLocale } from '@utils/withLocale'
import { TokenLogo } from '@components/Common'
import { getProvider } from '@components/Web3Provider'
import { utils } from 'ethers'
import { isMainToken, transferToken } from '@utils/common'

const TransferModal = ({ setVisible, defaultTokenInfo }) => {
  const [receiverAddress, setReceiverAddress] = useState('')
  const [amount, setAmount] = useState('')
  const assets = useSelector((state) => state.assets)
  const account = useSelector((state) => state.account)
  const [tokenInfo, setTokenInfo] = useState(defaultTokenInfo)
  const isDarkMode = useSelector((state) => state.dark)
  const [, t] = useLocale()

  return (
    <Layer
      responsive={false}
      onClickOutside={(e) => {
        setVisible(false)
      }}
    >
      <ResponsiveContext.Consumer>
        {(size) => {
          const isMobile = size === 'small'
          return (
            <Box
              direction="column"
              align="center"
              justify="center"
              width={isMobile ? '100%' : '500px'}
              pad="medium"
              background={isDarkMode ? 'dark-1' : 'white'}
              style={{
                borderRadius: isMobile ? 0 : 8,
                height: isMobile ? '100vh' : undefined,
                padding: 20,
                width: isMobile ? '100vw' : undefined,
              }}
            >
              <Select
                options={assets}
                labelKey="symbol"
                valueKey="contract"
                value={<SelectItem tokenInfo={tokenInfo} isMobile={isMobile} />}
                children={(datum, index) => {
                  return <SelectItem tokenInfo={datum} isMobile={isMobile} />
                }}
                onChange={({ option }) => setTokenInfo(option)}
              />

              <TextInput
                placeholder={t('receiver_address')}
                style={{
                  margin: '10px auto',
                  width: isMobile ? 330 : 460,
                  height: 60,
                }}
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                size="large"
              />

              <TextInput
                placeholder={t('amount')}
                size="large"
                type="number"
                reverse
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                style={{
                  width: isMobile ? 330 : 460,
                  height: 60,
                }}
              />

              <Box
                direction="row"
                align="center"
                justify="between"
                margin="medium"
                width="100%"
              >
                <Button
                  secondary
                  label={t('cancel')}
                  disabled={!tokenInfo}
                  onClick={() => {
                    if (tokenInfo) {
                      setVisible(false)
                    }
                  }}
                />
                <Button
                  primary
                  label={t('send')}
                  disabled={!tokenInfo}
                  onClick={async () => {
                    if (tokenInfo) {
                      const provider = getProvider()
                      const signer = provider.getSigner()
                      if (isMainToken(tokenInfo.contract)) {
                        await signer.sendTransaction({
                          to: receiverAddress,
                          value: utils.parseEther(amount),
                        })
                      } else {
                        await transferToken(
                          account,
                          receiverAddress,
                          amount,
                          tokenInfo.contract
                        )
                      }
                      setVisible(false)
                    }
                  }}
                />
              </Box>
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Layer>
  )
}

export default TransferModal

function SelectItem({ tokenInfo, isMobile }) {
  return (
    <Box
      direction="row"
      align="center"
      justify="between"
      pad="small"
      style={{
        width: isMobile ? 292 : 410,
        height: 60,
      }}
    >
      <Box direction="row" align="center">
        <TokenLogo symbol={tokenInfo.symbol} />
        <Text weight="bold">{tokenInfo.symbol}</Text>
      </Box>

      <Box direction="row" align="center">
        <Text color="dark-4" weight="bold">
          {tokenInfo.balance}
        </Text>
      </Box>
    </Box>
  )
}
