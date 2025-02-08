import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'

const PlatformsChart = () => {
  // Sample data - replace with actual data
  const platformData = {
    labels: ['MT5', 'cTrader', 'DerivX', 'Other'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
        ],
        hoverBackgroundColor: [
          '#FF4C71',
          '#2E8BD1',
          '#FFB93F',
          '#3DA3A3',
        ],
      },
    ],
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>Trading Platforms Distribution</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm={12}>
            <div className="chart-wrapper">
              <CChart
                type="doughnut"
                data={platformData}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: 'rgb(var(--cui-body-color-rgb))',
                      },
                      position: 'right',
                    },
                  },
                  cutout: '60%',
                  radius: '90%',
                }}
              />
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default PlatformsChart
