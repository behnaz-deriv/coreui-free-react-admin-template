import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'

const FraudMap = () => {
  const textColor = '#fff'
  const gridColor = 'rgba(255, 255, 255, 0.1)'
  const tooltipBackground = 'rgba(0, 0, 0, 0.9)'
  const chartBackground = '#1e1e2f'

  // Sample data - replace with actual data
  const fraudData = {
    labels: ['Malaysia', 'Indonesia', 'Thailand', 'Vietnam', 'Philippines'],
    datasets: [
      {
        label: 'Fraud Cases',
        data: [65, 59, 80, 81, 56],
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return null

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
          gradient.addColorStop(0, 'rgba(255, 99, 132, 0.2)')
          gradient.addColorStop(0.5, 'rgba(255, 99, 132, 0.5)')
          gradient.addColorStop(1, 'rgba(255, 99, 132, 0.8)')
          return gradient
        },
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        borderRadius: 12,
        maxBarThickness: 40,
        hoverBackgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return null

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
          gradient.addColorStop(0, 'rgba(255, 99, 132, 0.6)')
          gradient.addColorStop(1, 'rgba(255, 99, 132, 1)')
          return gradient
        },
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        hoverBorderWidth: 3,
      },
    ],
  }

  return (
    <CCard 
      className="mb-4 shadow-lg border-0" 
      style={{ 
        background: 'rgba(26, 26, 44, 0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <CCardHeader className="border-bottom-0 bg-transparent pt-4">
        <h4 className="mb-0" style={{ color: textColor }}>Trending Countries for Fraud</h4>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm={12}>
            <div style={{ 
              background: chartBackground,
              borderRadius: '12px',
              padding: '20px',
            }}>
              <CChart
                type="bar"
                data={fraudData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                      text: 'Regions',
                      color: textColor,
                      font: {
                        size: 16,
                        weight: '600',
                        family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                      },
                      padding: { bottom: 30 },
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => `Cases: ${context.parsed.y}`,
                      },
                      titleColor: textColor,
                      bodyColor: textColor,
                      backgroundColor: tooltipBackground,
                      borderColor: gridColor,
                      borderWidth: 1,
                      padding: 12,
                      titleFont: {
                        size: 13,
                        family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                      },
                      bodyFont: {
                        size: 12,
                        family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                      },
                      displayColors: false,
                      cornerRadius: 8,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: gridColor,
                        drawBorder: false,
                        borderDash: [5, 5],
                      },
                      ticks: {
                        color: textColor,
                        font: {
                          size: 12,
                          family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                        },
                        padding: 10,
                      },
                      title: {
                        display: true,
                        text: 'Number of Cases',
                        color: textColor,
                        font: {
                          size: 13,
                          family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                          weight: '600',
                        },
                        padding: { bottom: 10 },
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        color: textColor,
                        font: {
                          size: 12,
                          family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                        },
                        padding: 10,
                      },
                      title: {
                        display: true,
                        text: 'Countries',
                        color: textColor,
                        font: {
                          size: 13,
                          family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                          weight: '600',
                        },
                        padding: { top: 10 },
                      },
                    },
                  },
                  animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart',
                    delay: (context) => context.dataIndex * 100,
                  },
                  layout: {
                    padding: {
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    },
                  },
                  interaction: {
                    mode: 'index',
                    intersect: false,
                  },
                }}
                style={{ 
                  minHeight: '400px',
                  filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))',
                }}
              />
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default FraudMap
