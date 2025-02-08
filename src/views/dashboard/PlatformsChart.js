import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'

const PlatformsChart = () => {
  const textColor = '#fff'
  const gridColor = 'rgba(255, 255, 255, 0.1)'
  const tooltipBackground = 'rgba(0, 0, 0, 0.9)'
  const chartBackground = '#1e1e2f'

  const colors = {
    backgroundColor: [
      'rgba(111, 66, 193, 0.9)',    // Purple
      'rgba(255, 99, 132, 0.9)',    // Pink
      'rgba(255, 206, 86, 0.9)',    // Yellow
      'rgba(54, 162, 235, 0.9)',    // Blue
    ],
    borderColor: [
      'rgba(111, 66, 193, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(54, 162, 235, 1)',
    ],
    hoverBackgroundColor: [
      'rgba(111, 66, 193, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(54, 162, 235, 1)',
    ],
  }

  // Sample data - replace with actual data
  const platformData = {
    labels: ['MT5', 'cTrader', 'DerivX', 'Other'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        borderWidth: 2,
        hoverBackgroundColor: colors.hoverBackgroundColor,
        hoverBorderColor: colors.borderColor,
        hoverBorderWidth: 3,
        offset: 8,
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
        <h4 className="mb-0" style={{ color: textColor }}>Trading Platforms</h4>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm={12}>
            <div style={{ 
              background: chartBackground,
              borderRadius: '12px',
              padding: '20px',
              position: 'relative',
            }}>
              <CChart
                type="doughnut"
                data={platformData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      align: 'center',
                      labels: {
                        color: textColor,
                        padding: 20,
                        font: {
                          size: 13,
                          family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                        },
                        generateLabels: (chart) => {
                          const datasets = chart.data.datasets
                          return chart.data.labels.map((label, i) => ({
                            text: `${label} (${datasets[0].data[i]}%)`,
                            fillStyle: colors.backgroundColor[i],
                            strokeStyle: colors.borderColor[i],
                            lineWidth: 2,
                            hidden: false,
                            fontColor: textColor,
                          }))
                        },
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 10,
                        boxHeight: 10,
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => `${context.label}: ${context.parsed}%`,
                      },
                      titleColor: textColor,
                      bodyColor: textColor,
                      backgroundColor: tooltipBackground,
                      borderColor: gridColor,
                      borderWidth: 1,
                      padding: 12,
                      displayColors: true,
                      titleFont: {
                        size: 13,
                        family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                      },
                      bodyFont: {
                        size: 12,
                        family: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                      },
                      cornerRadius: 8,
                    },
                  },
                  cutout: '75%',
                  radius: '90%',
                  animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                    easing: 'easeInOutQuart',
                  },
                  layout: {
                    padding: {
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    },
                  },
                }}
                style={{ 
                  minHeight: '300px',
                  filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))',
                }}
              />
              {/* Center text */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '35%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}>
                <div style={{ 
                  color: textColor,
                  fontSize: '2.5rem',
                  fontWeight: '600',
                  marginBottom: '5px',
                  fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                }}>
                  100%
                </div>
                <div style={{ 
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem',
                  fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
                }}>
                  Total Distribution
                </div>
              </div>
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default PlatformsChart
