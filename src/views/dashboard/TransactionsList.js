import React from 'react'
import { CCard, CCardBody, CCardHeader, CTable } from '@coreui/react'

const TransactionsList = ({ data: transactionsData }) => {
  const textColor = '#fff'
  const chartBackground = '#1e1e2f'

  const transactions = transactionsData?.data || []
  
  const formatDate = (dateString) => {
    try {
      if (!dateString) return '-'
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return '-'
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch (error) {
      console.error('Error formatting date:', error)
      return '-'
    }
  }

  const formatAmount = (amount) => {
    try {
      if (amount === null || amount === undefined || isNaN(amount)) return '-'
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)
    } catch (error) {
      console.error('Error formatting amount:', error)
      return '-'
    }
  }

  const getTypeColor = (type) => {
    if (!type) return '#ffffff' // Default color if type is undefined
    switch (type.toLowerCase()) {
      case 'withdrawal':
        return '#e55353'
      case 'deposit':
        return '#2eb85c'
      case 'trade':
        return '#f9b115'
      default:
        return '#ffffff'
    }
  }

  return (
    <CCard
      className="h-100 shadow-lg border-0"
      style={{
        background: 'rgba(26, 26, 44, 0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <CCardHeader className="border-bottom-0 bg-transparent pt-4">
        <h4 className="mb-0" style={{ color: textColor }}>
          Suspicious Accounts
        </h4>
      </CCardHeader>
      <CCardBody>
        <div
          style={{
            background: chartBackground,
            borderRadius: '12px',
            padding: '20px',
          }}
        >
          <CTable
            responsive
            hover
            style={{
              color: textColor,
              '--cui-table-color': textColor,
              '--cui-table-bg': 'transparent',
              '--cui-table-border-color': 'rgba(255, 255, 255, 0.1)',
              '--cui-table-hover-bg': 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Country</th>
                <th>KYC Status</th>
                <th>Account Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={`transaction-${index}`}>
                  <td>{transaction.client_id}</td>
                  <td>{transaction.country}</td>
                  <td>
                    <span
                      style={{
                        color: transaction.kyc_completed ? '#2eb85c' : '#e55353',
                        fontWeight: '500',
                      }}
                    >
                      {transaction.kyc_completed ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        color: transaction.account_status === 'Normal' ? '#2eb85c' : '#e55353',
                        fontWeight: '500',
                      }}
                    >
                      {transaction.account_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </CTable>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default TransactionsList
