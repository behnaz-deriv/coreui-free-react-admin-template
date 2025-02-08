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
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
        data: [65, 59, 80, 81, 56, 55, 40, 35, 30, 25],
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
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: 'rgba(var(--cui-body-color-rgb), .1)',
                    },
                    ticks: {
                      color: 'rgb(var(--cui-body-color-rgb))',
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: 'rgb(var(--cui-body-color-rgb))',
                    },
                  },
                },
                maintainAspectRatio: false,
                aspectRatio: 2,
              }}
              style={{ height: '400px' }}
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default PaymentMethodsChart
