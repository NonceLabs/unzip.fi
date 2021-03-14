import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Layer,
  Box,
  TextInput,
  Button,
  ResponsiveContext,
  Select,
  Text,
  Image,
} from 'grommet'
import { useLocale } from '@utils/withLocale'
import { TokenLogo } from '@components/Common'

const TransferModal = ({ setVisible, defaultTokenInfo }) => {
  const [receiverAddress, setReceiverAddress] = useState('')
  const [amount, setAmount] = useState('')
  const assets = useSelector((state) => state.assets)
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
                borderRadius: 8,
              }}
            >
              <Select
                options={assets}
                labelKey="symbol"
                valueKey="contract"
                value={<SelectItem tokenInfo={tokenInfo} />}
                children={(datum, index) => {
                  return <SelectItem tokenInfo={datum} />
                }}
                onChange={({ option }) => setTokenInfo(option)}
              />

              <TextInput
                placeholder={t('receiver_address')}
                style={{ margin: '10px auto' }}
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
              />

              <Box
                direction="row"
                align="center"
                justify="between"
                margin="small"
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
                  onClick={() => {
                    if (tokenInfo) {
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

function SelectItem({ tokenInfo }) {
  return (
    <Box
      direction="row"
      align="center"
      justify="between"
      pad="small"
      width="400px"
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
