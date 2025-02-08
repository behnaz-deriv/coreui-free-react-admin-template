import React, { useState, useMemo } from 'react'
import { CCard, CCardBody, CCardHeader, CTable } from '@coreui/react'
import Filters from './Filters'

const TransactionsList = ({ data: transactionsData, chartData }) => {
  const [filters, setFilters] = useState({
    platform: '',
    country: '',
    paymentMethod: '',
  })
  const textColor = '#fff'
  const chartBackground = '#1e1e2f'

  const transactions = transactionsData?.data || []

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatAmount = (amount) => {
    if (amount === null) return '-'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const getTypeColor = (type) => {
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

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const platformMatch = !filters.platform || transaction.platform === filters.platform
      const countryMatch = !filters.country || transaction.country === filters.country
      const methodMatch = !filters.paymentMethod || transaction.payment_method === filters.paymentMethod
      return platformMatch && countryMatch && methodMatch
    })
  }, [filters, transactions])

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
          Recent Transactions
        </h4>
        <Filters onFilterChange={handleFilterChange} chartData={chartData} />
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
                <th>Transaction ID</th>
                <th>Client ID</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Platform</th>
                <th>Payment Method</th>
                <th>Country</th>
                <th>KYC</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.transaction_id}>
                  <td>{transaction.transaction_id}</td>
                  <td>{transaction.client_id}</td>
                  <td>{formatDate(transaction.transaction_date)}</td>
                  <td>
                    <span
                      style={{
                        color: getTypeColor(transaction.transaction_type),
                        fontWeight: '500',
                      }}
                    >
                      {transaction.transaction_type}
                    </span>
                  </td>
                  <td>{formatAmount(transaction.amount)}</td>
                  <td>{transaction.platform}</td>
                  <td>{transaction.payment_method || '-'}</td>
                  <td>{transaction.country}</td>
                  <td>
                    <span
                      style={{
                        color: transaction.kyc_completed ? '#2eb85c' : '#e55353',
                        fontWeight: '500',
                      }}
                    >
                      {transaction.kyc_completed ? 'Yes' : 'No'}
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
