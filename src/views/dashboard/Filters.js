import React, { useState, useEffect } from 'react'
import { CCol, CRow, CFormSelect, CSpinner } from '@coreui/react'

const Filters = ({ onFilterChange }) => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const textColor = '#fff'
  const selectBackground = '#1e1e2f'

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        
        // Sort countries by name
        const sortedCountries = data
          .map(country => country.name.common)
          .sort((a, b) => a.localeCompare(b))
        
        setCountries(['All Countries', ...sortedCountries])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching countries:', error)
        setCountries(['All Countries']) // Fallback
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  // Sample filter options - replace with actual data
  const platforms = ['All Platforms', 'MT5', 'cTrader', 'DerivX', 'Other']
  const paymentMethods = [
    'All Payment Methods',
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
  ]

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
        {loading ? (
          <div className="d-flex align-items-center" style={{ height: '38px' }}>
            <CSpinner size="sm" color="light" className="ms-2" />
          </div>
        ) : (
          <CFormSelect
            style={selectStyles}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="shadow-sm"
            options={countries.map((country) => ({
              label: country,
              value: country === 'All Countries' ? '' : country,
            }))}
          />
        )}
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
