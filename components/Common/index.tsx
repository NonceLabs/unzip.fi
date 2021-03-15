import { Image } from 'grommet'

export const TokenLogo = ({ symbol }) => {
  return (
    <Image
      src={`/images/tokens/${symbol}.png`}
      fallback="/images/tokens/404.png"
      style={{ width: 30, height: 30, marginRight: 8 }}
    />
  )
}
