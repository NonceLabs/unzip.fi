import { Image } from 'grommet'

interface Props {
  symbol?: string
  url?: string
}

export const TokenLogo = (props: Props) => {
  const { symbol, url } = props
  return (
    <Image
      src={url || `/images/tokens/${symbol}.png`}
      fallback="/images/tokens/404.png"
      style={{ width: 30, height: 30, marginRight: 8 }}
    />
  )
}
