import React from 'react'
import { CCol, CRow } from '@coreui/react'
import FraudMap from './FraudMap'
import PlatformsChart from './PlatformsChart'
import PaymentMethodsChart from './PaymentMethodsChart'
import TransactionsList from './TransactionsList'

const Dashboard = () => {
  return (
    <CRow>
      {/* Left side - Transactions (60%) */}
      <CCol xs={12} lg={7}>
        <TransactionsList />
      </CCol>

      {/* Right side - Charts (40%) */}
      <CCol xs={12} lg={5}>
        <CRow>
          <CCol xs={12}>
            <FraudMap />
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12} className="mb-4">
            <PlatformsChart />
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12}>
            <PaymentMethodsChart />
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  )
}

export default Dashboard
