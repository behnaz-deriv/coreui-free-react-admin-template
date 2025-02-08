import React from 'react'
import { CCol, CRow, CFormSelect } from '@coreui/react'

const Filters = ({ onFilterChange }) => {
  const textColor = '#fff'
  const selectBackground = '#1e1e2f'

  // Sample filter options - replace with actual data
  const platforms = ['All Platforms', 'MT5', 'cTrader', 'DerivX', 'Other']
  const countries = ['All Countries', 'Malaysia', 'Indonesia', 'Thailand', 'Vietnam', 'Philippines']
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
