import React, { useState } from 'react'
import Pie, { ProvidedProps, PieArcDatum } from '@vx/shape/lib/shapes/Pie'
import { scaleOrdinal } from '@vx/scale'
import { Group } from '@vx/group'
import { GradientPinkBlue } from '@vx/gradient'
import letterFrequency, {
  LetterFrequency,
} from '@vx/mock-data/lib/mocks/letterFrequency'
import browserUsage, {
  BrowserUsage as Browsers,
} from '@vx/mock-data/lib/mocks/browserUsage'
import { animated, useTransition, interpolate } from 'react-spring'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import { genAnalysisData } from './helper'

// data and types
type BrowserNames = keyof Browsers

interface BrowserUsage {
  label: BrowserNames
  usage: number
}

const letters: LetterFrequency[] = letterFrequency.slice(0, 4)
const browserNames = Object.keys(browserUsage[0]).filter(
  (k) => k !== 'date'
) as BrowserNames[]

// accessor functions
const usage = (d: BrowserUsage) => d.usage

// color scales
const getBrowserColor = scaleOrdinal({
  domain: browserNames,
  range: [
    'rgba(255,255,255,0.7)',
    'rgba(255,255,255,0.6)',
    'rgba(255,255,255,0.5)',
    'rgba(255,255,255,0.4)',
    'rgba(255,255,255,0.3)',
    'rgba(255,255,255,0.2)',
    'rgba(255,255,255,0.1)',
  ],
})

const getLetterFrequencyColor = scaleOrdinal({
  domain: letters.map((l) => l.letter),
  range: [
    'rgba(93,30,91,1)',
    'rgba(93,30,91,0.8)',
    'rgba(93,30,91,0.6)',
    'rgba(93,30,91,0.4)',
  ],
})

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 }

export type PieProps = {
  width: number
  height: number
  assetLoading: boolean
  farmLoading: boolean
  margin?: typeof defaultMargin
  animate?: boolean
}

export default function Chart({
  width,
  height,
  assetLoading,
  farmLoading,
  margin = defaultMargin,
  animate = true,
}: PieProps) {
  if (farmLoading && assetLoading) {
    return <Skeleton width={300} height={300} style={{ borderRadius: 150 }} />
  }
  const bnbPrice = useSelector((state) => state.bnbPrice)
  const tokens = useSelector((state) => state.assets)
  const farms = useSelector((state) => state.farms)

  let data = genAnalysisData(bnbPrice, tokens, farms)

  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [selectedChildItem, setSelectedChildItem] = useState(null)

  if (width < 10) return null

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const radius = Math.min(innerWidth, innerHeight) / 2
  const centerY = innerHeight / 2
  const centerX = innerWidth / 2
  const donutThickness = 50

  const item = data.find(({ label }) => label === selectedItem)

  return (
    <svg width={width} height={height}>
      <GradientPinkBlue id="vx-pie-gradient" />
      <rect
        rx={8}
        width={width}
        height={height}
        fill="url('#vx-pie-gradient')"
      />
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={
            selectedItem
              ? data.filter(({ label }) => label === selectedItem)
              : data
          }
          pieValue={usage}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={3}
          padAngle={0.005}
        >
          {(pie) => (
            <AnimatedPie<BrowserUsage>
              {...pie}
              animate={animate}
              getKey={(arc) => arc.data.label}
              onClickDatum={({ data: { label } }) =>
                animate &&
                setSelectedItem(
                  selectedItem && selectedItem === label ? null : label
                )
              }
              getColor={(arc) => getBrowserColor(arc.data.label)}
            />
          )}
        </Pie>
        {item && (
          <Pie
            data={item.shares}
            pieValue={usage}
            pieSortValues={() => -1}
            outerRadius={radius - donutThickness * 1.3}
          >
            {(pie) => {
              return (
                <AnimatedPie
                  {...pie}
                  animate={animate}
                  getKey={({ data: { label } }) => label}
                  onClickDatum={({ data: { label } }) => {}}
                  getColor={({ data: { label } }) =>
                    getLetterFrequencyColor(label)
                  }
                />
              )
            }}
          </Pie>
        )}
      </Group>
    </svg>
  )
}

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number }

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
})
const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
  startAngle,
  endAngle,
  opacity: 1,
})

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean
  getKey: (d: PieArcDatum<Datum>) => string
  getColor: (d: PieArcDatum<Datum>) => string
  onClickDatum: (d: PieArcDatum<Datum>) => void
  delay?: number
}

function AnimatedPie<Datum>({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
}: AnimatedPieProps<Datum>) {
  const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(
    arcs,
    getKey,
    // @ts-ignore react-spring doesn't like this overload
    {
      from: animate ? fromLeaveTransition : enterUpdateTransition,
      enter: enterUpdateTransition,
      update: enterUpdateTransition,
      leave: animate ? fromLeaveTransition : enterUpdateTransition,
    }
  )
  return (
    <>
      {transitions.map(
        (
          {
            item: arc,
            props,
            key,
          }: {
            item: PieArcDatum<Datum>
            props: AnimatedStyles
            key: string
          },
          idx
        ) => {
          const [centroidX, centroidY] = path.centroid(arc)
          const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1

          return (
            <g key={idx}>
              <animated.path
                // compute interpolated path d attribute from intermediate angle values
                d={interpolate(
                  [props.startAngle, props.endAngle],
                  (startAngle, endAngle) =>
                    path({
                      ...arc,
                      startAngle,
                      endAngle,
                    })
                )}
                fill={getColor(arc)}
                onClick={() => onClickDatum(arc)}
                onTouchStart={() => onClickDatum(arc)}
              />
              {hasSpaceForLabel && (
                <animated.g style={{ opacity: props.opacity }}>
                  <text
                    fill="white"
                    x={centroidX}
                    y={centroidY}
                    dy=".33em"
                    fontSize={9}
                    textAnchor="middle"
                    pointerEvents="none"
                  >
                    {getKey(arc)}
                  </text>
                </animated.g>
              )}
            </g>
          )
        }
      )}
    </>
  )
}
