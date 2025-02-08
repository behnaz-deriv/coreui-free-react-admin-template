import React from 'react'
import { CTable } from '@coreui/react'
import Modal from '../../components/Modal'

const TransactionsModal = ({ visible, onClose, transactions }) => {
  const textColor = '#fff'
  const chartBackground = '#1e1e2f'

  const formatDateTime = (dateString, timeString) => {
    try {
      if (!dateString) return '-'
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return '-'
      return `${date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })} ${timeString || ''}`
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
    if (!type) return '#ffffff'
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
    <Modal isOpen={visible} onClose={onClose}>
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: textColor, margin: 0 }}>Client Transactions</h4>
      </div>
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
              <th>Date & Time</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Platform</th>
              <th>Payment Method</th>
              <th>Fraud Indicator</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.data?.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td>{transaction.transaction_id}</td>
                <td>{formatDateTime(transaction.transaction_date, transaction.transaction_time)}</td>
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
                <td style={{ color: '#e55353' }}>{transaction.fraud_indicator}</td>
              </tr>
            ))}
          </tbody>
        </CTable>
    </Modal>
  )
}

export default TransactionsModal
