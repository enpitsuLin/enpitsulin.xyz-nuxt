<script setup lang="tsx">
import type { SVGAttributes, VNode } from 'vue'
import QRCodeUtil from 'qrcode'

interface Props extends /* @vue-ignore */ SVGAttributes {
  ecl?: QRCodeUtil.QRCodeErrorCorrectionLevel
  size?: number
  uri: string
  clearArea?: boolean
  image?: VNode
  imageBackground?: string
  dotColor?: string
  backgroundColor?: string
}

const {
  ecl = 'M',
  size: sizeProp = 200,
  uri,
  clearArea = false,
  image,
  imageBackground = 'transparent',
  dotColor,
  backgroundColor,
  ...props
} = defineProps<Props>()

const slots = defineSlots<{ image: () => VNode }>()

function generateMatrix(
  value: string,
  errorCorrectionLevel: QRCodeUtil.QRCodeErrorCorrectionLevel,
) {
  const arr = Array.prototype.slice.call(
    QRCodeUtil.create(value, { errorCorrectionLevel }).modules.data,
    0,
  ) as unknown as Uint8Array
  const sqrt = Math.sqrt(arr.length)
  return arr.reduce(
    (rows, key, index) => {
      if (index % sqrt === 0)
        rows.push([key])
      else rows[rows.length - 1]?.push(key)
      return rows
    },
    [] as number[][],
  )
}

const logoSize = clearArea ? 72 : 0
const size = sizeProp - 10 * 2

const dots = [] as VNode[]

const matrix = generateMatrix(uri, ecl)
const cellSize = size / matrix.length
const qrList = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
]

qrList.forEach(({ x, y }) => {
  const x1 = (matrix.length - 7) * cellSize * x
  const y1 = (matrix.length - 7) * cellSize * y
  for (let i = 0; i < 3; i++) {
    dots.push(createRectDot(
      i,
      x,
      y,
      cellSize,
      x1 + cellSize * i,
      y1 + cellSize * i,
    ))
  }
})

if (slots.image) {
  const x1 = (matrix.length - 7) * cellSize * 1
  const y1 = (matrix.length - 7) * cellSize * 1
  dots.push(createImageDot(x1, y1, cellSize, slots.image))
}

const clearArenaSize = Math.floor(logoSize / cellSize)
const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2
const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1

for (let i = 0; i < matrix.length; i++) {
  const row = matrix[i]
  for (let j = 0; j < (row?.length ?? 0); j++) {
    const value = row?.[j]
    if (value) {
      if (!isPositionSquare(i, j, matrix.length) && (image || !isInClearArea(i, j, matrixMiddleStart, matrixMiddleEnd)))
        dots.push(createCircleDot(i, j, cellSize))
    }
  }
}

const svgAttrs = computed(() => Object.assign<SVGAttributes, SVGAttributes>({
  height: size,
  width: size,
  viewBox: `0 0 ${size} ${size}`,
}, props))

function isPositionSquare(i: number, j: number, matrixLength: number): boolean {
  return (i < 7 && j < 7) || (i > matrixLength - 8 && j < 7) || (i < 7 && j > matrixLength - 8)
}

function isInClearArea(i: number, j: number, start: number, end: number): boolean {
  return i > start && i < end && j > start && j < end
}

function createRectDot(
  index: number,
  x: number,
  y: number,
  cellSize: number,
  x1: number,
  y1: number,
): VNode {
  const fill = index % 2 !== 0 ? backgroundColor : dotColor
  const rx = (index - 2) * -5 + (index === 0 ? 2 : 3)
  const ry = (index - 2) * -5 + (index === 0 ? 2 : 3)
  const width = cellSize * (7 - index * 2)
  const height = cellSize * (7 - index * 2)

  return (
    <rect
      key={`${index}- ${x} -${y}`}
      fill={fill}
      rx={rx}
      ry={ry}
      width={width}
      height={height}
      x={x1}
      y={y1}
    />
  )
}

function createImageDot(
  x1: number,
  y1: number,
  cellSize: number,
  imageSlot: () => VNode,
): VNode {
  const width = cellSize * 7
  const height = cellSize * 7
  const x = x1 + cellSize
  const y = y1 + cellSize

  return (
    <g key="image-dot">
      <rect
        fill={imageBackground}
        width={width}
        height={height}
        x={x}
        y={y}
      />
      {imageSlot()}
    </g>
  )
}

function createCircleDot(i: number, j: number, cellSize: number): VNode {
  const cx = (j + 0.5) * cellSize
  const cy = (i + 0.5) * cellSize
  const r = cellSize * 0.4

  return (
    <circle
      key={`${i}-${j} `}
      fill={dotColor}
      cx={cx}
      cy={cy}
      r={r}
    />
  )
}
</script>

<template>
  <svg v-bind="svgAttrs">
    <component :is="() => dots" />
  </svg>
</template>
