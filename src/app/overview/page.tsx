'use client'
import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, GraphicComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { LabelLayout } from 'echarts/features'

echarts.use([PieChart, TooltipComponent, GraphicComponent, CanvasRenderer, LabelLayout])
import tgeLogo from '../../assets/tge_logo.png'
import useBreakpoint from '../../hooks/useBreakpoint'

const chartData = [
  { label: 'retail ido & Investors', value: '30%', mobileLabel: ['retail ido &', 'Investors'] },
  { label: 'bounceclub farm airdrop', value: '20%', mobileLabel: ['bounceclub', 'farm airdrop'] },
  { label: 'DEX & CEX liquidity(MM)', value: '30%', mobileLabel: ['DEX & CEX', 'liquidity(MM)'] },
  { label: 'Durian points Airdrop', value: '20%', mobileLabel: ['Durian points', 'Airdrop'] }
]

// Figma 设计稿配色
const pieColors = ['#F6FF76', '#797C24', '#D6DB8B', '#B5BD48']

export default function OverviewPage() {
  const isSM = useBreakpoint('lg')
  const pieChartRef = useRef<HTMLDivElement>(null)
  const pieChartInstance = useRef<echarts.ECharts | null>(null)

  // 转换数据为 ECharts 需要的格式
  const pieData = chartData.map((item, idx) => ({
    value: Number(item.value.replace('%', '')),
    name: item.label,
    mobileLabel: item.mobileLabel,
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
              overflow: '',
              // position: 'outside',
              formatter: function (params: any) {
                return isSM
                  ? `{a|${params.value}%}\n{b|${params.data.mobileLabel[0]}}\n{c|${params.data.mobileLabel[1]}}`
                  : `{a|${params.value}%}\n{b|${params.name}}`
              },
              rich: {
                a: {
                  fontSize: 28, // 小屏更小字体
                  fontWeight: 500,
                  color: '#FFF',
                  fontFamily: 'DM Sans',
                  lineHeight: isSM ? 24 : 34
                },
                b: {
                  fontSize: 16, // 小屏更小字体
                  fontWeight: 500,
                  color: '#FFF',
                  fontFamily: 'DM Sans',
                  lineHeight: isSM ? 16 : 22 // 关键：小屏最大宽度
                  // overflow: isSM ? 'break all' : undefined
                },
                c: {
                  fontSize: 16, // 小屏更小字体
                  fontWeight: 500,
                  color: '#FFF',
                  fontFamily: 'DM Sans',
                  lineHeight: isSM ? 16 : 22 // 关键：小屏最大宽度
                  // overflow: isSM ? 'break all' : undefined
                }
              },
              alignTo: 'edge',
              margin: 0
            },
            labelLine: {
              show: false, // 必须开启
              length: isSM ? 10 : 30,
              length2: isSM ? 30 : 120 // 小屏适当拉开
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
              if (params.dataIndex === 3 && isSM) {
                return {
                  align: 'left',
                  verticalAlign: 'top',
                  y: params.labelRect.y - 10
                }
              }
              if (params.dataIndex === 0 && isSM) {
                return {
                  align: 'right',
                  verticalAlign: 'top',
                  x: params.labelRect.x + 60,
                  y: params.labelRect.y - 60
                }
              }
              if (params.dataIndex === 2 && isSM) {
                return {
                  align: 'left',
                  verticalAlign: 'bottom',
                  y: params.labelRect.y + 90
                }
              }
              if (params.dataIndex === 1) {
                if (!isSM) {
                  return {
                    align: 'right',
                    verticalAlign: 'top',
                    y: params.labelRect.y - 60
                  }
                } else {
                  return {
                    align: 'right',
                    verticalAlign: 'bottom',
                    y: params.labelRect.y + 60
                  }
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
  }, [pieData, isSM])

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
        padding: isSM ? '16px' : '32px 32px 100px 32px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div
        style={{
          width: isSM ? 'min(310px, 100vh)' : 'min(100vw, 100vh)',
          height: isSM ? 'min(438px, 100vh)' : 'min(100vw, 100vh)',
          maxWidth: 1600,
          maxHeight: 1600,
          margin: '0 auto',
          minWidth: isSM ? '310px' : '1048px',
          minHeight: isSM ? '438px' : '845px'
        }}
        ref={pieChartRef}
      />
      {/* 右下角浮层 */}
      {typeof window !== 'undefined' && !isSM && (
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
      )}
    </div>
  )
}
