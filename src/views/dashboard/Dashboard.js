import React from 'react'
import { CCol, CRow } from '@coreui/react'
import FraudMap from './FraudMap'
import PlatformsChart from './PlatformsChart'
import PaymentMethodsChart from './PaymentMethodsChart'

const Dashboard = () => {
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <FraudMap />
        </CCol>
      </CRow>
      <CRow>
        <CCol md={6}>
          <PlatformsChart />
        </CCol>
        <CCol md={6}>
          <PaymentMethodsChart />
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
