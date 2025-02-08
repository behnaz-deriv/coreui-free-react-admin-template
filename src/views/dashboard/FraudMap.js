import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'

const FraudMap = () => {
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
          gradient.addColorStop(1, 'rgba(255, 99, 132, 0.8)')
          return gradient
        },
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        borderRadius: 8,
        maxBarThickness: 50,
      },
    ],
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>Trending Countries for Fraud</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm={12}>
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
                    text: 'Fraud Cases by Country',
                    color: 'rgb(var(--cui-body-color-rgb))',
                    font: {
                      size: 16,
                      weight: 'bold',
                    },
                    padding: 20,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `Cases: ${context.parsed.y}`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(var(--cui-body-color-rgb), .05)',
                      drawBorder: false,
                    },
                    ticks: {
                      color: 'rgb(var(--cui-body-color-rgb))',
                      font: {
                        size: 12,
                      },
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: 'rgb(var(--cui-body-color-rgb))',
                      font: {
                        size: 12,
                      },
                    },
                  },
                },
                animation: {
                  duration: 1000,
                  easing: 'easeInOutQuart',
                },
              }}
              style={{ minHeight: '300px' }}
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default FraudMap
