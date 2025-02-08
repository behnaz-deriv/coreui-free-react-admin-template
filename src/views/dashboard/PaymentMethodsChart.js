import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'

const PaymentMethodsChart = ({ data }) => {
  if (!data) return null
  const textColor = '#fff'
  const gridColor = 'rgba(255, 255, 255, 0.1)'
  const tooltipBackground = 'rgba(0, 0, 0, 0.9)'
  const chartBackground = '#1e1e2f'

  const paymentData = {
    labels: data.data.map(item => item.method),
    datasets: [
      {
        label: 'Transaction Volume',
        data: data.data.map(item => item.volume),
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return null

          const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0)
          gradient.addColorStop(0, 'rgba(54, 162, 235, 0.8)')
          gradient.addColorStop(0.5, 'rgba(75, 192, 192, 0.8)')
          gradient.addColorStop(1, 'rgba(0, 184, 217, 0.8)')
          return gradient
        },
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        borderRadius: 8,
        barPercentage: 0.7,
        hoverBackgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return null

          const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0)
          gradient.addColorStop(0, 'rgba(54, 162, 235, 1)')
          gradient.addColorStop(0.5, 'rgba(75, 192, 192, 1)')
          gradient.addColorStop(1, 'rgba(0, 184, 217, 1)')
          return gradient
        },
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        hoverBorderWidth: 2,
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
        <h4 className="mb-0" style={{ color: textColor }}>Payment Methods</h4>
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
                data={paymentData}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                      title: {
                        display: true,
                        text: data.title || 'Payment Methods by Volume',
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
                        label: (context) => {
                          const item = data.data[context.dataIndex]
                          return [
                            `Volume: ${item.volume.toLocaleString()}`,
                            `Count: ${item.count.toLocaleString()}`
                          ]
                        },
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
                    x: {
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
                        callback: (value) => value.toLocaleString(),
                      },
                      title: {
                        display: true,
                        text: 'Transaction Volume',
                        color: textColor,
                        font: {
                          size: 13,
                          family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                          weight: '600',
                        },
                        padding: { top: 10 },
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        color: textColor,
                        font: {
                          size: 12,
                          family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                          weight: '500',
                        },
                        padding: 10,
                      },
                      title: {
                        display: true,
                        text: 'Payment Methods',
                        color: textColor,
                        font: {
                          size: 13,
                          family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                          weight: '600',
                        },
                        padding: { bottom: 10 },
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
                  height: '350px',
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

export default PaymentMethodsChart
