import { Box, Typography, styled } from '@mui/material'
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export default function RwaYieldTrendChart() {
  // 样式和逻辑与原实现一致
  const chartRef = useRef(null)

  // styled 组件
  const ChartContainer = styled(Box)(() => ({
    background: '#F7F7F7',
    borderRadius: '12px',
    boxShadow: '8px 8px 24px 0px rgba(2, 2, 70, 0.05)',
    backdropFilter: 'blur(16px)',
    padding: '31px 4px 4px',
    width: '638px',
    height: '485px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }))
  const ChartHeader = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '9px',
    padding: '0 16px'
  }))
  const ChartTitle = styled(Box)(() => ({
    width: '100%'
  }))
  const ChartContent = styled(Box)(() => ({
    flex: 1,
    position: 'relative',
    padding: '12px 16px'
  }))
  const ChartCanvas = styled(Box)(() => ({
    width: '100%',
    height: '100%'
  }))

  useEffect(() => {
    if (!chartRef.current) return
    const chart = echarts.init(chartRef.current)
    const option = {
      backgroundColor: 'transparent',
      grid: {
        left: '0',
        right: '0',
        top: '16px',
        bottom: '16px',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['04-2', '04-4', '04-6', '04-8', '04-10', '04-12', '04-14'],
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: 'rgba(0, 0, 0, 0.5)',
          fontSize: 12,
          fontFamily: 'Geist'
        }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 6.44,
        interval: 1.71,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          lineStyle: { color: 'rgba(0, 0, 0, 0.3)', width: 0.5 }
        },
        axisLabel: {
          color: 'rgba(0, 0, 0, 0.5)',
          fontSize: 12,
          fontFamily: 'Geist',
          formatter: (value: any) => value.toFixed(2) + '%'
        }
      },
      series: [
        {
          type: 'line',
          data: [2.1, 3.2, 4.5, 5.8, 6.2, 5.9, 6.1],
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: 'rgba(28, 63, 58, 0.6)',
            width: 2.5
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(28, 63, 58, 0.1)' },
                { offset: 1, color: 'rgba(28, 63, 58, 0.01)' }
              ]
            }
          }
        }
      ],
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(28, 28, 28, 0.8)',
        backdropFilter: 'blur(33.33px)',
        borderRadius: 6.83,
        border: 'none',
        textStyle: {
          color: '#fff',
          fontSize: 16,
          fontFamily: 'Inter',
          fontWeight: 500
        },
        formatter: (params: any) => {
          const data = params[0]
          return `
            <div style="padding: 4px 8px;">
              <div style="display: flex; align-items: center; gap: 4px;">
                <div style="width: 5px; height: 5px; background: #A8C5DA; border-radius: 50%;"></div>
                <div>
                  <div style="font-size: 16px; font-weight: 500; color: #fff;">APR</div>
                  <div style="font-size: 16px; font-weight: 500; color: #fff;">${data.value}%</div>
                </div>
              </div>
            </div>
          `
        }
      }
    }
    chart.setOption(option)
    const handleResize = () => {
      chart.resize()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      chart.dispose()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartTitle>
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: 16,
              lineHeight: 1.3,
              color: 'rgba(0, 0, 0, 0.5)',
              textTransform: 'uppercase'
            }}
          >
            Yield Trend (7-Day Annualized)
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Forma DJR Micro',
              fontWeight: 700,
              fontSize: 30,
              lineHeight: 1.4,
              color: '#1C3F3A'
            }}
          >
            +4.9765%
          </Typography>
        </ChartTitle>
      </ChartHeader>
      <ChartContent>
        <ChartCanvas ref={chartRef} />
      </ChartContent>
    </ChartContainer>
  )
}
