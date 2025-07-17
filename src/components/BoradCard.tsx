'use client'
import React from 'react'
import { Box, Typography } from '@mui/material'
import LogoText from 'components/LogoText'

export interface BoradCardProps {
  title: string
  slogan: string
}

export default function BoradCard({ title, slogan }: BoradCardProps) {
  return (
    <Box
      sx={{
        bgcolor: '#1C1B1A',
        borderRadius: '40px',
        boxShadow: '0px 8px 14px 1px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        position: 'relative',
        padding: '80px 280px',
        overflow: 'hidden'
      }}
    >
      {/* Decorative ellipse and bar from Figma node 7002-29758 */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 451,
          height: 446,
          borderRadius: '21px',
          zIndex: 1
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 46,
            top: -222,
            width: 359,
            height: 446,
            borderRadius: '50%',
            background: 'radial-gradient(50% 50% at 50% 50%, rgba(246,255,118,0.15) 0%, rgba(246,255,118,0) 100%)',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
      </Box>
      <Box sx={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '9.26px' }}>
        <LogoText
          text={
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 600,
                fontSize: 88,
                color: '#E3FDD9',
                lineHeight: 1.2,
                textAlign: 'left',
                display: 'block'
              }}
            >
              {title}
            </span>
          }
          gapSize="large"
          size="80px"
        />
      </Box>
      <Typography
        sx={{
          zIndex: 2,
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.3,
          color: '#F6FF76',
          textAlign: 'center',
          textTransform: 'lowercase',
          letterSpacing: 0.5
        }}
      >
        {slogan.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </Typography>
    </Box>
  )
}
