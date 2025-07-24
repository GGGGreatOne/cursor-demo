import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'

const options = [
  {
    label: 'Individual',
    desc: 'For personal use, direct investments, and individual access.'
  },
  {
    label: 'Corporate',
    desc: 'For teams, institutions, or businesses managing RWAs.'
  }
]

export default function SuccessCard({ onContinue }: { onContinue?: () => void }) {
  const [selected, setSelected] = useState(0)
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 310, md: 468 },
        maxWidth: 468,
        bgcolor: 'rgba(255,255,255,0.16)',
        borderRadius: '24px',
        boxShadow: '8px 8px 24px 0px rgba(2,2,70,0.05)',
        backdropFilter: 'blur(16px)',
        p: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', alignSelf: 'stretch' }}>
        <Typography
          sx={{ color: '#fff', fontSize: 24, fontWeight: 700, fontFamily: 'Inter', textAlign: 'left', lineHeight: 1.3 }}
        >
          Select the option that best describes you.
        </Typography>
        <Typography
          sx={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: 16,
            fontWeight: 500,
            fontFamily: 'Inter',
            textAlign: 'left',
            lineHeight: 1.3
          }}
        >
          Registered individuals can add organizations to the account later under profile settings
        </Typography>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', alignSelf: 'stretch', mt: 1 }}>
        {options.map((opt, i) => (
          <Box
            key={opt.label}
            onClick={() => setSelected(i)}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '16px',
              p: '24px 16px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.4)',
              bgcolor: selected === i ? 'rgba(28,63,58,0.6)' : 'transparent',
              cursor: 'pointer',
              transition: 'background 0.2s',
              maxWidth: 404,
              width: '100%'
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                minWidth: 20,
                minHeight: 20,
                borderRadius: '50%',
                bgcolor: selected === i ? '#fff' : 'transparent',
                border: selected === i ? 'none' : '1px solid rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}
            >
              {selected === i ? (
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.5" width="20" height="20" rx="10" fill="white" />
                  <path
                    d="M14.1668 7.375L8.43766 13.1042L5.8335 10.5"
                    stroke="#1C3F3A"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', alignSelf: 'stretch' }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 16, fontFamily: 'Inter' }}>
                {opt.label}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400, fontSize: 14, fontFamily: 'Inter' }}>
                {opt.desc}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        fullWidth
        sx={{
          bgcolor: '#1C3F3A',
          color: '#fff',
          borderRadius: '100px',
          fontWeight: 500,
          fontSize: 16,
          fontFamily: 'Inter',
          px: 3,
          py: 2,
          height: 56,
          textTransform: 'none',
          boxShadow: 'none',
          mt: 2,
          '&:hover': { bgcolor: '#185c4a' }
        }}
        onClick={onContinue}
      >
        Continue
      </Button>
    </Box>
  )
}
