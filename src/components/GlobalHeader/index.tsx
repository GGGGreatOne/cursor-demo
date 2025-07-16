'use client'
import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import SvgLogo from 'assets/svg/header_logo.svg'
import SvgPhone from 'assets/svg/svg_phone.svg'
import SvgTwitter from 'assets/svg/twitter.svg';
import SvgUnion from 'assets/svg/union.svg';
import SvgTg from 'assets/svg/tg.svg';

const HEADER_HEIGHT = 80;

export default function GlobalHeader() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: HEADER_HEIGHT,
        minHeight: HEADER_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 8 }, // 16px/64px
        py: 0,
        bgcolor: '#1C1B1A',
        position: 'fixed', // 固定在顶部
        left: 0,
        top: 0,
        right: 0,
        zIndex: 1200,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', height: '100%' }}>
        {/*区域1*/}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ minWidth: 180 }}>
          <Box>
            <SvgLogo />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, ml: 28}}>
            <SvgTwitter style={{ width: 20, height: 20, cursor: 'pointer' }} />
            <SvgUnion style={{ width: 28, height: 21, cursor: 'pointer' }} />
            <SvgTg style={{ width: 20, height: 20, cursor: 'pointer' }} />
          </Box>
        </Stack>
        {/* 按钮组 */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="outlined"
            sx={{
              borderRadius: '9999px',
              borderColor: '#F6FF76',
              color: '#F6FF76',
              fontFamily: 'DM Sans',
              fontWeight: 500,
              fontSize: 14,
              width: 158,
              height: 48,
              lineHeight: 1.2,
              textTransform: 'none',
              px: 0,
              py: 0,
              letterSpacing: 0,
              '&:hover': { borderColor: '#F6FF76', background: 'rgba(246,255,118,0.08)' },
            }}
          >
            docs
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderRadius: '9999px',
              borderColor: '#F6FF76',
              color: '#F6FF76',
              fontFamily: 'DM Sans',
              fontWeight: 500,
              fontSize: 14,
              width: 158,
              height: 48,
              lineHeight: 1.2,
              textTransform: 'none',
              px: 0,
              py: 0,
              letterSpacing: 0,
              '&:hover': { borderColor: '#F6FF76', background: 'rgba(246,255,118,0.08)' },
            }}
          >
            stats
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: '9999px',
              bgcolor: '#F6FF76',
              color: '#1C1B1A',
              fontFamily: 'DM Sans',
              fontWeight: 500,
              fontSize: 14,
              width: 158,
              height: 48,
              lineHeight: 1.2,
              textTransform: 'none',
              px: 0,
              py: 0,
              letterSpacing: 0,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#F6FF76', opacity: 0.9 },
            }}
          >
            launch app
          </Button>
        </Stack>
        {/* use mobile to open the app 提示，浮动在header右下角 */}
        <Box
          sx={{
            position: 'absolute',
            right: 10,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'transparent',
          }}
        >
          <SvgPhone style={{ width: 14, height: 14, marginRight: 6 }} />
          <Typography
            sx={{
              fontFamily: 'DM Sans',
              fontWeight: 400,
              fontSize: 10,
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            use mobile to open the app
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
