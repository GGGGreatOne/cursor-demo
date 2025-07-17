import React, { useEffect, useRef, useState, useMemo } from 'react'
import * as echarts from 'echarts'
import { Box, Typography, ButtonGroup, Button } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers'
type DateRange<T> = [T | null, T | null]

const xLabels = [
  '01-01',
  '02-01',
  '03-01',
  '04-01',
  '05-01',
  '06-01',
  '07-01',
  '08-01',
  '09-01',
  '10-01',
  '11-01',
  '12-01'
]
const btcData = [3000, 3200, 3500, 3700, 3900, 4100, 4300, 4500, 4700, 4900, 5100, 5300]
const ethData = [2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100]
const solData = [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200]
const cumulative = btcData.map((b, i) => b + ethData[i] + solData[i])

export default function TotalVolume() {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  const [dateRange, setDateRange] = useState<DateRange<Date>>([null, null])
  const [selecting, setSelecting] = useState<'start' | 'end'>('start')

  // 图表配置
  const chartOption = useMemo(
    () => ({
      backgroundColor: 'rgba(28,27,26,0.6)',
      grid: { left: 60, right: 60, top: 80, bottom: 100 },
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['BTC', 'ETH', 'SOL', 'cumulative'],
        bottom: 24,
        left: 'center',
        itemWidth: 16,
        itemHeight: 16,
        textStyle: { color: '#DDD', fontFamily: 'DM Sans', fontWeight: 500, fontSize: 14 },
        icon: 'rect'
      },
      xAxis: {
        type: 'category',
        data: xLabels,
        axisLabel: {
          color: '#DDD',
          fontFamily: 'DM Sans',
          fontWeight: 500,
          fontSize: 14,
          // ECharts 可能传字符串
          formatter: function (v: any) {
            const num = typeof v === 'number' ? v : v
            return num
          }
        },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
        axisTick: { show: false }
      },
      yAxis: [
        {
          type: 'value',
          name: '',
          axisLabel: {
            color: '#DDD',
            fontFamily: 'DM Sans',
            fontWeight: 500,
            fontSize: 14,
            formatter: function (v: any) {
              const num = typeof v === 'number' ? v : Number(v)
              return `${(num / 1000).toFixed(2)}K`
            }
          },
          splitLine: { lineStyle: { color: 'rgba(255,255,255,0.2)', type: 'dashed' } }
        },
        {
          type: 'value',
          name: '',
          axisLabel: {
            color: '#9F8527',
            fontFamily: 'DM Sans',
            fontWeight: 500,
            fontSize: 14,
            formatter: function (v: any) {
              const num = typeof v === 'number' ? v : Number(v)
              return `${(num / 1000).toFixed(2)}K`
            }
          },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: 'BTC',
          type: 'bar',
          data: btcData,
          itemStyle: { color: '#B1B53D', borderRadius: [4, 4, 0, 0] },
          barWidth: 16,
          stack: 'volume'
        },
        {
          name: 'ETH',
          type: 'bar',
          data: ethData,
          itemStyle: { color: '#6DA824', borderRadius: [4, 4, 0, 0] },
          barWidth: 16,
          stack: 'volume'
        },
        {
          name: 'SOL',
          type: 'bar',
          data: solData,
          itemStyle: { color: '#F6FF76', borderRadius: [4, 4, 0, 0] },
          barWidth: 16,
          stack: 'volume'
        },
        {
          name: 'cumulative',
          type: 'line',
          yAxisIndex: 1,
          data: cumulative,
          itemStyle: { color: '#9F8527' },
          lineStyle: { width: 2, color: '#9F8527' },
          symbol: 'circle',
          symbolSize: 8,
          z: 10
        }
      ]
    }),
    []
  )

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current)
      chartInstance.current.setOption(chartOption)
    }
    return () => {
      chartInstance.current?.dispose()
    }
  }, [chartOption])

  return (
    <Box
      sx={{
        bgcolor: 'rgba(28,27,26,0.6)',
        borderRadius: '24px',
        boxShadow: '0px 8px 14px 1px rgba(0,0,0,0.5)',
        p: '16px 16px 8px',
        width: 1145,
        height: 505,
        mx: 'auto',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      {/* 顶部标题和日期区间 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" px={1}>
        <Typography sx={{ fontFamily: 'DM Sans', fontWeight: 500, fontSize: 28, color: '#DDD' }}>
          total volume
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <ButtonGroup>
            <Button variant={selecting === 'start' ? 'contained' : 'outlined'} onClick={() => setSelecting('start')}>
              开始日期
            </Button>
            <Button variant={selecting === 'end' ? 'contained' : 'outlined'} onClick={() => setSelecting('end')}>
              结束日期
            </Button>
          </ButtonGroup>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={selecting === 'start' ? dateRange[0] : dateRange[1]}
              onChange={date => {
                setDateRange(selecting === 'start' ? [date, dateRange[1]] : [dateRange[0], date])
              }}
              disableFuture
              slotProps={{
                textField: {
                  variant: 'outlined',
                  sx: {
                    bgcolor: 'rgba(246,255,118,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '100px',
                    px: 2,
                    py: 1,
                    color: '#F6FF76',
                    fontFamily: 'DM Sans',
                    fontWeight: 500,
                    fontSize: 16,
                    minWidth: 180,
                    cursor: 'pointer',
                    '& .MuiInputBase-root': {
                      bgcolor: 'transparent',
                      color: '#F6FF76',
                      fontFamily: 'DM Sans',
                      fontWeight: 500,
                      fontSize: 16,
                      border: 'none',
                      p: 0
                    },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiInputBase-input': { textAlign: 'center', p: 0 },
                    '& .MuiSvgIcon-root': { color: '#F6FF76' }
                  }
                }
              }}
            />
          </LocalizationProvider>
          <Typography sx={{ color: '#F6FF76', ml: 2 }}>
            {dateRange[0]?.toLocaleDateString() || '开始'} - {dateRange[1]?.toLocaleDateString() || '结束'}
          </Typography>
        </Box>
      </Box>
      {/* 图表主体 */}
      <Box sx={{ width: '100%', flex: 1, mt: 1 }}>
        <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
      </Box>
    </Box>
  )
}
