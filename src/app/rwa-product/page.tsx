'use client'

import { Box } from '@mui/material'
import dynamic from 'next/dynamic'
const RwaYieldTrendChart = dynamic(() => import('components/durain/RwaYieldTrendChart'), { ssr: false })
import RwaProductActionPanel from 'components/durain/RwaProductActionPanel'
import RwaProductAccordion from 'components/durain/RwaProductAccordion'

export default function RwaProduct() {
  return (
    <Box sx={{ minHeight: '100vh', background: '#fff' }}>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 490px',
            justifyContent: 'center',
            alignItems: 'flex-start',
            background: '#F7F7F7',
            padding: 24,
            gap: 24
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <RwaYieldTrendChart />
            <RwaProductAccordion />
          </Box>
          <RwaProductActionPanel />
        </Box>
      </Box>
    </Box>
  )
}
