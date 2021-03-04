import React, { useState } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts'
import { useSelector } from 'react-redux'
import { ResponsiveContext } from 'grommet'
import Skeleton from 'react-loading-skeleton'
import { calcValue } from '../../utils/price'

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" font-size="60" fill={fill}>
        {`$${value}`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 16}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        font-size="30"
      >{`${payload.name}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={30}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(占比 ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

const colors = [
  '#3D138D',
  '#00873D',
  '#00739D',
  '#333333',
  '#6FFFB0',
  '#CCCCCC',
]

const Analysis = ({ farmLoading, assetLoading }) => {
  if (farmLoading && assetLoading) {
    return <Skeleton width={300} height={300} style={{ borderRadius: 150 }} />
  }
  const bnbPrice = useSelector((state) => state.bnbPrice)
  const tokens = useSelector((state) => state.assets)
  const farms = useSelector((state) => state.farms)

  const [activeIndex, setActiveIndex] = useState(0)

  const data = []

  let accountValue = 0
  tokens.map((t) => {
    accountValue += t.balance * t.price * bnbPrice
  })
  data.push({
    name: '账户',
    value: Number(accountValue.toFixed(0)),
    fill: '#008cd5',
  })
  farms.map((f, idx) => {
    let v = 0
    f.pools.map((p) => {
      v += Number(calcValue(p, bnbPrice))
    })
    data.push({
      name: f.name,
      value: Number(v.toFixed(0)),
      fill: colors[idx],
    })
  })

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={300} height={300}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={200}
          outerRadius={300}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={(_, index) => setActiveIndex(index)}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default Analysis
