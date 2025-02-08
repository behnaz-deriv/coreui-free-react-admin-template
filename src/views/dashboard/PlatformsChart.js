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
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        hoverBorderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        hoverBorderWidth: 3,
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
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      color: 'rgb(var(--cui-body-color-rgb))',
                      padding: 20,
                      font: {
                        size: 13,
                      },
                      generateLabels: (chart) => {
                        const datasets = chart.data.datasets
                        return chart.data.labels.map((label, i) => ({
                          text: `${label} (${datasets[0].data[i]}%)`,
                          fillStyle: datasets[0].backgroundColor[i],
                          strokeStyle: datasets[0].borderColor[i],
                          lineWidth: 1,
                          hidden: false,
                        }))
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.parsed}%`,
                    },
                  },
                },
                cutout: '60%',
                radius: '90%',
                animation: {
                  animateRotate: true,
                  animateScale: true,
                  duration: 1000,
                  easing: 'easeInOutQuart',
                },
              }}
              style={{ minHeight: '300px' }}
              />
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default PlatformsChart
