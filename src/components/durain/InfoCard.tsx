import React from 'react'
import { Box, Typography } from '@mui/material'

export interface InfoCardItem {
  label: string
  value: string | number
}

export interface InfoCardProps {
  items: InfoCardItem[]
}

export default function InfoCard({ items }: InfoCardProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: { xs: 'wrap', md: 'nowrap' },
        flexDirection: { xs: 'row', sm: 'row', md: 'row' },
        alignItems: 'center',
        justifyContent: { xs: 'flex-start', md: 'space-between' },
        gap: { xs: '16px', sm: '24px', md: '40px' },
        bgcolor: 'rgba(246,255,118,0.1)',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '16px',
        backdropFilter: 'blur(4px)',
        px: { xs: '16px', sm: '24px', md: '48px' },
        py: { xs: '16px', sm: '24px', md: '32px' },
        width: '100%',
        maxWidth: '1132px',
        height: { xs: 'auto', md: '168px' },
        boxSizing: 'border-box'
      }}
    >
      {items.map((item, idx) => (
        <React.Fragment key={item.label}>
          <Box
            sx={{
              width: { xs: '100%', sm: '45%', md: 180 },
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flexShrink: 0,
              height: '100%'
            }}
          >
            <Typography
              sx={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 1.2,
                color: 'rgba(255,255,255,0.8)',
                letterSpacing: '1%',
                textTransform: 'lowercase',
                textAlign: 'center',
                wordBreak: 'break-word'
              }}
            >
              {item.label}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                fontSize: 32,
                lineHeight: 1.2,
                color: '#fff',
                textAlign: 'center',
                wordBreak: 'break-word'
              }}
            >
              {item.value}
            </Typography>
          </Box>
          {idx < items.length - 1 && (
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                width: '1px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '1px',
                height: '100%',
                alignSelf: 'center'
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  )
}
