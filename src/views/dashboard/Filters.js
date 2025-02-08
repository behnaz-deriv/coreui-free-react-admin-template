import React from 'react'
import { CCol, CRow, CFormSelect } from '@coreui/react'

const Filters = ({ onFilterChange }) => {
  const textColor = '#fff'
  const selectBackground = '#1e1e2f'

  const platformOptions = [
    { value: 'DerivX', label: 'DerivX' },
    { value: 'Deriv Trader', label: 'Deriv Trader' },
    { value: 'MT5', label: 'MT5' },
  ]

  const paymentMethodOptions = [
    { value: 'OZOW', label: 'OZOW' },
    { value: 'Credit Card', label: 'Credit Card' },
    { value: 'Skrill', label: 'Skrill' },
    { value: 'Perfect Money', label: 'Perfect Money' },
    { value: 'ADVCash', label: 'ADVCash' },
    { value: 'AirTM', label: 'AirTM' },
  ]

  const countryOptions = [
    { value: 'France', label: 'France' },
    { value: 'Germany', label: 'Germany' },
    { value: 'India', label: 'India' },
    { value: 'Russia', label: 'Russia' },
    { value: 'South Africa', label: 'South Africa' },
  ]

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
          onChange={(e) => onFilterChange('platform', e.target.value)}
          className="shadow-sm"
          options={[
            { label: 'All Platforms', value: '' },
            ...platformOptions
          ]}
        />
      </CCol>
      <CCol sm={12} md={4}>
        <CFormSelect
          style={selectStyles}
          onChange={(e) => onFilterChange('country', e.target.value)}
          className="shadow-sm"
          options={[
            { label: 'All Countries', value: '' },
            ...countryOptions
          ]}
        />
      </CCol>
      <CCol sm={12} md={4}>
        <CFormSelect
          style={selectStyles}
          onChange={(e) => onFilterChange('paymentMethod', e.target.value)}
          className="shadow-sm"
          options={[
            { label: 'All Payment Methods', value: '' },
            ...paymentMethodOptions
          ]}
        />
      </CCol>
    </CRow>
  )
}

export default Filters
