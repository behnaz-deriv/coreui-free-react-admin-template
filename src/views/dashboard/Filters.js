import React, { useState, useEffect, useMemo } from 'react'
import { CCol, CRow, CFormSelect, CSpinner } from '@coreui/react'

const Filters = ({ onFilterChange, chartData }) => {
  const textColor = '#fff'
  const selectBackground = '#1e1e2f'

  // Get unique countries from transactions data
  const countries = useMemo(() => {
    const countryList = chartData?.suspected_transactions?.data?.map(t => t.country) || []
    return ['All Countries', ...new Set(countryList)].sort()
  }, [chartData])

  // Get unique platforms from trading_platforms data
  const platforms = useMemo(() => {
    const platformList = chartData?.trading_platforms?.data?.map(p => p.platform) || []
    return ['All Platforms', ...new Set(platformList)]
  }, [chartData])

  // Get unique payment methods from payment_methods data
  const paymentMethods = useMemo(() => {
    const methodList = chartData?.payment_methods?.data?.map(p => p.method) || []
    return ['All Payment Methods', ...new Set(methodList)]
  }, [chartData])

  const handleFilterChange = (type, value) => {
    onFilterChange(type, value)
  }

  const selectStyles = {
    backgroundColor: selectBackground,
    color: textColor,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    '--cui-form-select-indicator-color': textColor,
  }

  return (
    <CRow className="g-3 mb-4">
      <CCol sm={12} md={4}>
        <CFormSelect
          style={selectStyles}
          onChange={(e) => handleFilterChange('platform', e.target.value)}
          className="shadow-sm"
          options={platforms.map((platform) => ({
            label: platform,
            value: platform === 'All Platforms' ? '' : platform,
          }))}
        />
      </CCol>
      <CCol sm={12} md={4}>
        <CFormSelect
          style={selectStyles}
          onChange={(e) => handleFilterChange('country', e.target.value)}
          className="shadow-sm"
          options={countries.map((country) => ({
            label: country,
            value: country === 'All Countries' ? '' : country,
          }))}
        />
      </CCol>
      <CCol sm={12} md={4}>
        <CFormSelect
          style={selectStyles}
          onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
          className="shadow-sm"
          options={paymentMethods.map((method) => ({
            label: method,
            value: method === 'All Payment Methods' ? '' : method,
          }))}
        />
      </CCol>
    </CRow>
  )
}

export default Filters
