import React from 'react'
import { Box, Text } from 'grommet'

const ErrorBox = ({ error }) => {
  if (!error) {
    return null
  }
  return (
    <Box
      pad="small"
      background="light-5"
      style={{ marginTop: 10, minHeight: 'unset', borderRadius: 6 }}
    >
      <Text weight="bold" color="status-error">
        {error.message}
      </Text>
    </Box>
  )
}

export default ErrorBox
