import React, { useState, useEffect } from 'react'
import { fetchChartData } from '../../services/chartService'
import { CCol, CRow } from '@coreui/react'
import FraudMap from './FraudMap'
import PlatformsChart from './PlatformsChart'
import PaymentMethodsChart from './PaymentMethodsChart'
import TransactionsList from './TransactionsList'
import Filters from './Filters'

const Dashboard = () => {
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    country: 'France',
    platform: '',
    paymentMethod: ''
  })

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setLoading(true)
        const data = await fetchChartData({
          country: filters.country || 'France',
          platform: filters.platform || 'DerivX',
          paymentMethod: filters.paymentMethod || 'AirTM'
        })
        setChartData(data)
        setError(null)
      } catch (err) {
        setError('Failed to load chart data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadChartData()
  }, [filters])

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }))
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <Filters 
        onFilterChange={handleFilterChange}
        chartData={chartData}
      />
      <CRow>
        {/* Left side - Transactions (60%) */}
        <CCol xs={12} lg={7}>
          <TransactionsList 
            data={chartData?.suspected_transactions} 
            chartData={chartData}
          />
        </CCol>

        {/* Right side - Charts (40%) */}
        <CCol xs={12} lg={5}>
          <CRow>
            <CCol xs={12}>
              <FraudMap data={chartData?.trending_countries} />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={12} className="mb-4">
              <PlatformsChart data={chartData?.trading_platforms} />
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={12}>
              <PaymentMethodsChart data={chartData?.payment_methods} />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
