import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { Box, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const option = {
  backgroundColor: 'rgba(28,27,26,0.6)',
  grid: { left: 60, right: 60, top: 60, bottom: 60 },
  tooltip: { trigger: 'axis' },
  legend: {
    data: ['daily new users', 'cumulative new users'],
    bottom: 10,
    left: 'center',
    textStyle: { color: '#fff', fontFamily: 'DM Sans', fontWeight: 500 }
  },
  xAxis: {
    type: 'category',
    data: ['01-01', '02-01', '03-01', '04-01', '05-01', '06-01', '07-01', '08-01', '09-01', '10-01', '11-01', '12-01'],
    axisLabel: { color: '#DDD', fontFamily: 'DM Sans', fontWeight: 500, fontSize: 14 }
  },
  yAxis: [
    {
      type: 'value',
      // name: 'daily new users',
      position: 'left'
      // axisLabel: { color: '#DDD', fontFamily: 'DM Sans', fontWeight: 500, fontSize: 14 }
    },
    {
      type: 'value',
      // name: 'cumulative new users',
      position: 'right'
      // axisLabel: { color: '#9F8527', fontFamily: 'DM Sans', fontWeight: 500, fontSize: 14 }
    }
  ],
  series: [
    {
      name: 'daily new users',
      type: 'bar',
      data: [3200, 4000, 3565, 4200, 3900, 4100, 3800, 3700, 3600, 3550, 3400, 3300],
      itemStyle: { color: '#B1B53D', borderRadius: [4, 4, 0, 0] },
      barWidth: 16
    },
    {
      name: 'cumulative new users',
      type: 'line',
      yAxisIndex: 1,
      data: [3200, 7200, 10765, 14965, 18865, 22965, 26765, 30465, 34065, 37615, 41015, 44315],
      itemStyle: { color: '#9F8527' },
      lineStyle: { width: 2, color: '#9F8527' },
      symbol: 'circle',
      symbolSize: 8
    }
  ]
}

function CustomDatePicker() {
  const [value, setValue] = React.useState<Date | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={value}
        onChange={setValue}
        disableFuture
        slotProps={{
          textField: {
            variant: 'outlined',
            placeholder: 'Select date'
            // ...your custom sx styles here if needed
          }
        }}
      />
    </LocalizationProvider>
  )
}

export default function UserChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current)
      chartInstance.current.setOption(option)
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }
    }
  }, [])

  return (
    <Box
      sx={{
        bgcolor: 'rgba(28,27,26,0.6)',
        borderRadius: '24px',
        boxShadow: '0px 8px 14px 1px rgba(0,0,0,0.5)',
        p: 2,
        mb: 4,
        width: '100%',
        maxWidth: 1145,
        mx: 'auto'
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={2}>
        <Typography sx={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: 28, color: '#DDD' }}>
          cumulative new users
        </Typography>
        <CustomDatePicker />
      </Box>
      <Box sx={{ width: '100%', height: 356, mt: 2 }}>
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
      </Box>
    </Box>
  )
}
