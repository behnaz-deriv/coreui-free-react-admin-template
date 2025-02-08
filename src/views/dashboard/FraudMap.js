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
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
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
                plugins: {
                  legend: {
                    labels: {
                      color: 'rgb(var(--cui-body-color-rgb))',
                    },
                  },
                },
                scales: {
                  y: {
                    grid: {
                      color: 'rgba(var(--cui-body-color-rgb), .1)',
                    },
                    ticks: {
                      color: 'rgb(var(--cui-body-color-rgb))',
                    },
                  },
                  x: {
                    grid: {
                      color: 'rgba(var(--cui-body-color-rgb), .1)',
                    },
                    ticks: {
                      color: 'rgb(var(--cui-body-color-rgb))',
                    },
                  },
                },
              }}
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default FraudMap
