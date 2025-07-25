'use client'
import React from 'react'
import { Box } from '@mui/material'
import InfoCard from 'components/durain/InfoCard'
import BoradCard from 'components/durain/BoradCard'
import dynamic from 'next/dynamic'
const UserChart = dynamic(() => import('components/durain/UserChart'), { ssr: false })
const TotalVolume = dynamic(() => import('components/durain/TotalVolume'), { ssr: false })

export default function DurainV3Page() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#1C1B1A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, md: 10 },
        py: { xs: 6, md: 10 }
      }}
    >
      <BoradCard title="durian.win" slogan={'tap. swipe. trade.\ndeep liquidity, effortless perp.'} />
      <InfoCard
        items={[
          { label: 'total users', value: '123,345' },
          { label: 'total deposits (all time)', value: '123,345' },
          { label: 'total volume', value: '123,345' },
          { label: 'total withdrawals (all time)', value: '123,345' }
        ]}
      />
      <UserChart />
      <TotalVolume />
    </Box>
  )
}
