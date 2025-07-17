import { styled } from '@mui/material'
import React from 'react'
import LogoSvg from 'assets/svg/logo_l.svg'

const Wrapper = styled('div')({})

export default function LogoText({
  text,
  fontWeight,
  fontSize,
  gapSize,
  size
}: {
  text?: string | React.ReactNode
  fontWeight?: number
  fontSize?: number
  gapSize?: 'small' | 'large'
  size?: string
}) {
  // Default logo size: 80x97 (from SVG)
  const svgWidth = size ? size : '80px'
  const svgHeight = size
    ? typeof size === 'string' && size.endsWith('px')
      ? `${(parseInt(size) * 97) / 80}px`
      : '97px'
    : '97px'
  const gap = gapSize === 'small' ? '4px' : '12px'
  return (
    <Wrapper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'visible',
        '& > svg': {
          width: svgWidth,
          height: svgHeight,
          marginBottom: gap
        }
      }}
    >
      <LogoSvg />
      <span
        style={{
          fontWeight: fontWeight ?? 400,
          fontSize: fontSize ?? 16,
          lineHeight: 1.2,
          color: '#E3FDD9',
          textAlign: 'center',
          display: 'block'
        }}
      >
        {text}
      </span>
    </Wrapper>
  )
}
