'use client'
import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import tgeLogo from '../../assets/tge_logo.png'

const chartData = [
  { label: 'retail ido & Investors', value: '30%' },
  { label: 'bounceclub farm airdrop', value: '20%' },
  { label: 'DEX & CEX liquidity(MM)', value: '30%' },
  { label: 'Durian points Airdrop', value: '20%' }
]

// Figma 设计稿配色
const pieColors = ['#F6FF76', '#797C24', '#D6DB8B', '#B5BD48']

export default function OverviewPage() {
  const pieChartRef = useRef<HTMLDivElement>(null)
  const pieChartInstance = useRef<echarts.ECharts | null>(null)

  // 转换数据为 ECharts 需要的格式
  const pieData = chartData.map((item, idx) => ({
    value: Number(item.value.replace('%', '')),
    name: item.label,
    itemStyle: { color: pieColors[idx % pieColors.length] }
  }))

  useEffect(() => {
    if (pieChartRef.current) {
      pieChartInstance.current = echarts.init(pieChartRef.current)
      pieChartInstance.current.setOption({
        backgroundColor: 'rgba(28,27,26,1)',
        tooltip: {
          trigger: 'item',
          formatter: function (params: any) {
            return `<span style='font-size:14px;'>${params.name}</span><br/><b style='font-size:18px;'>${params.value}%</b> (${params.percent}%)`
          }
        },
        series: [
          {
            name: 'Distribution',
            type: 'pie',
            radius: ['30%', '70%'], // 外半径减小
            center: ['50%', '50%'],
            // avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside',
              formatter: function (params: any) {
                return `{a|${params.value}%}\n{b|${params.name}}`
              },
              rich: {
                a: {
                  fontSize: 28,
                  fontWeight: 500,
                  color: '#FFF',
                  fontFamily: 'DM Sans',
                  lineHeight: 34
                  // textAlign: 'left', // 关键：左对齐
                },
                b: {
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#FFF',
                  fontFamily: 'DM Sans',
                  lineHeight: 22
                  // textAlign: 'left', // 关键：左对齐
                }
              },
              alignTo: 'edge',
              margin: 0 // 增大外边距
            },
            labelLine: {
              show: false // 必须开
            },
            // 饼图中心显示 tokenomics
            emphasis: {
              itemStyle: {
                borderWidth: 5,
                borderColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: 'rgba(255,241,167,1)' },
                    { offset: 1, color: 'rgba(255,224,24,1)' }
                  ]
                }
              }
            },
            // 饼图中心自定义title
            silent: false,
            labelLayout: function (params: any) {
              console.log('labelLayout', params)
              if (params.dataIndex === 1) {
                return {
                  align: 'right',
                  verticalAlign: 'top',
                  y: params.labelRect.y - 60
                }
              }
              return {}
            },
            data: pieData
            // 饼图中心title用graphic实现
          }
        ],
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: 'bottom',
            style: {
              text: 'tokenomics',
              fill: '#FFF',
              font: '500 28px DM Sans',
              textAlign: 'center',
              textVerticalAlign: 'middle'
            }
          }
        ]
      })
      // resize 监听
      const handleResize = () => {
        console.log('handleResize chartSize', pieChartInstance.current)
        pieChartInstance.current && pieChartInstance.current.resize()
      }
      window.addEventListener('resize', handleResize)
      return () => {
        pieChartInstance.current?.dispose()
        window.removeEventListener('resize', handleResize)
      }
    }
    return () => {
      pieChartInstance.current?.dispose()
    }
  }, [pieData])

  return (
    <div
      style={{
        background: 'rgba(28,27,26,1)',
        boxShadow: '0px 8px 14px 1px rgba(0,0,0,0.5)',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: '32px 32px 100px 32px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div
        style={{
          width: 'min(100vw, 100vh)',
          height: 'min(100vw, 100vh)',
          maxWidth: 1600,
          maxHeight: 1600,
          margin: '0 auto',
          minWidth: '1048px', // 新增
          minHeight: '845px' // 新增
        }}
        ref={pieChartRef}
      />
      {/* 右下角浮层 */}
      <div
        style={{
          position: 'fixed',
          right: 32,
          bottom: 32,
          width: 238,
          height: 238,
          pointerEvents: 'none',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img
          src={tgeLogo.src}
          alt="TGE Logo"
          style={{ width: '100%', height: '100%', objectFit: 'contain', userSelect: 'none' }}
        />
      </div>
    </div>
  )
}
