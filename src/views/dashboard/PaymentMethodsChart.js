import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'

const PaymentMethodsChart = () => {
  // Sample data - replace with actual data
  const paymentData = {
    labels: [
      'Credit/Debit Card',
      'Bank Transfer',
      'E-wallet',
      'Cryptocurrency',
      'Online Banking',
      'Mobile Payment',
      'Wire Transfer',
      'Local Payment Methods',
      'Digital Wallets',
      'Prepaid Cards',
    ],
    datasets: [
      {
        label: 'Transaction Volume',
        data: [65, 59, 80, 81, 56, 55, 40, 35, 30, 25],
        backgroundColor: (context) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return null

          const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0)
          gradient.addColorStop(0, 'rgba(54, 162, 235, 0.6)')
          gradient.addColorStop(1, 'rgba(54, 162, 235, 0.9)')
          return gradient
        },
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
        barPercentage: 0.7,
      },
    ],
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>Payment Methods Distribution</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm={12}>
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
                  tooltip: {
                    callbacks: {
                      label: (context) => `Volume: ${context.parsed.x}`,
                    },
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                  },
                },
                scales: {
                  x: {
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
                  y: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: 'rgb(var(--cui-body-color-rgb))',
                      font: {
                        size: 12,
                        weight: '500',
                      },
                    },
                  },
                },
                animation: {
                  duration: 1000,
                  easing: 'easeInOutQuart',
                },
                layout: {
                  padding: {
                    right: 10,
                  },
                },
              }}
              style={{ height: '450px' }}
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default PaymentMethodsChart
