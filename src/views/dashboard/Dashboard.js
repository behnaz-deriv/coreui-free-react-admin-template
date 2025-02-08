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
    country: '',
    platform: '',
    paymentMethod: ''
  })

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setLoading(true)
        // Only include non-empty filter values
        const activeFilters = {}
        if (filters.country !== '') activeFilters.country = filters.country
        if (filters.platform !== '') activeFilters.platform = filters.platform
        if (filters.paymentMethod !== '') activeFilters.paymentMethod = filters.paymentMethod
        
        const data = await fetchChartData(activeFilters)
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

  const handleClearFilters = () => {
    setFilters({
      country: '',
      platform: '',
      paymentMethod: ''
    })
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
        selectedFilters={filters}
        onClearFilters={handleClearFilters}
      />
      <CRow>
        {/* Left side - Transactions (60%) */}
        <CCol xs={12} lg={7}>
          <TransactionsList 
            data={chartData?.suspected_transactions}
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
