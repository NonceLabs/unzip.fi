import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Layer,
  Box,
  TextInput,
  Button,
  ResponsiveContext,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Image,
  Text,
} from 'grommet'
import { Search } from 'grommet-icons'
import { useWeb3React } from '@web3-react/core'
import withLocale, { useLocale } from '@utils/withLocale'
import { getTokenInfo, ellipsis } from '@utils/common'
import { addCustomToken } from '@utils/request'
import { appendAsset } from '@store/actions'
import { CURRENCY_SYMBOLS } from '@utils/index'

const AddTokenModal = ({ setVisible }) => {
  const [value, setValue] = useState('')
  const { account } = useWeb3React()
  const dispatch = useDispatch()
  const bnbPrice = useSelector((state) => state.bnbPrice)
  const currency = useSelector((state) => state.currency)
  const [tokenInfo, setTokenInfo] = useState(null)
  const [searching, setSearching] = useState(false)
  const isDarkMode = useSelector((state) => state.dark)
  const [message, setMessage] = useState('')
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
              justify="start"
              width={isMobile ? '300px' : '500px'}
              pad="medium"
              background={isDarkMode ? 'dark-1' : 'white'}
              style={{
                borderRadius: 8,
              }}
            >
              <Box
                direction="row"
                align="center"
                justify="between"
                width="90%"
                gap="10px"
              >
                <TextInput
                  placeholder={t('input_token_contract_address')}
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value)
                    setMessage('')
                  }}
                />
                <Button
                  primary
                  disabled={!value || searching || !!message}
                  icon={<Search size="small" />}
                  onClick={() => {
                    if (value.length === 42) {
                      setMessage('')
                      setTokenInfo(null)
                      setSearching(true)
                      getTokenInfo(value, account)
                        .then((result) => {
                          setSearching(false)
                          if (result.symbol) {
                            setTokenInfo(result)
                          } else {
                            setMessage(t('invalid_contract'))
                          }
                        })
                        .catch((error) => {
                          setSearching(false)
                          setMessage(error.message)
                        })
                    } else {
                      setMessage(t('invalid_contract'))
                    }
                  }}
                />
              </Box>
              <Table style={{ width: '90%', margin: '10px' }}>
                <TableBody>
                  <TableRow>
                    <TableCell scope="row">
                      <Text size="small">{t('logo')}</Text>
                    </TableCell>
                    <TableCell>
                      {tokenInfo ? (
                        <Image
                          src={`/images/tokens/${tokenInfo?.symbol}.png`}
                          fallback="/images/tokens/404.png"
                          style={{ width: 30, height: 30 }}
                        />
                      ) : (
                        <Image
                          src="/images/tokens/404.png"
                          style={{ width: 30, height: 30 }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                  {[
                    {
                      key: t('symbol'),
                      value: tokenInfo?.symbol || '-',
                    },
                    {
                      key: t('contract'),
                      value: ellipsis(tokenInfo?.contract || '-'),
                    },
                    {
                      key: t('balance'),
                      value: tokenInfo?.balance || '-',
                    },
                    {
                      key: t('price'),
                      value: tokenInfo
                        ? `${CURRENCY_SYMBOLS[currency]}${(
                            tokenInfo.price * bnbPrice
                          ).toFixed(4)}`
                        : '-',
                    },
                  ].map((item) => {
                    return (
                      <TableRow key={item.key}>
                        <TableCell scope="row">
                          <Text size="small">{item.key}</Text>
                        </TableCell>
                        <TableCell>
                          <strong>{item.value}</strong>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              <Text
                color="status-error"
                weight="bold"
                size="small"
                margin="small"
              >
                {message}
              </Text>

              <Button
                primary
                label={t('add')}
                disabled={!tokenInfo}
                onClick={() => {
                  if (tokenInfo) {
                    setVisible(false)
                    addCustomToken(tokenInfo?.contract)
                    dispatch(appendAsset(tokenInfo))
                  }
                }}
              />
            </Box>
          )
        }}
      </ResponsiveContext.Consumer>
    </Layer>
  )
}

export default withLocale(AddTokenModal)
