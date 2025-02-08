import React from 'react'
import { CCard, CCardBody, CCardHeader, CTable } from '@coreui/react'

const TransactionsList = () => {
  const textColor = '#fff'
  const chartBackground = '#1e1e2f'

  // Sample data - replace with actual data
  const transactions = [
    {
      id: '1',
      date: '2024-02-08',
      platform: 'MT5',
      amount: '$1,234.56',
      method: 'Credit Card',
      status: 'Completed',
    },
    {
      id: '2',
      date: '2024-02-08',
      platform: 'cTrader',
      amount: '$2,345.67',
      method: 'Bank Transfer',
      status: 'Pending',
    },
    {
      id: '3',
      date: '2024-02-08',
      platform: 'DerivX',
      amount: '$3,456.78',
      method: 'E-wallet',
      status: 'Completed',
    },
    {
      id: '4',
      date: '2024-02-07',
      platform: 'MT5',
      amount: '$4,567.89',
      method: 'Cryptocurrency',
      status: 'Failed',
    },
    {
      id: '5',
      date: '2024-02-07',
      platform: 'cTrader',
      amount: '$5,678.90',
      method: 'Wire Transfer',
      status: 'Completed',
    },
  ]

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return '#2eb85c'
      case 'pending':
        return '#f9b115'
      case 'failed':
        return '#e55353'
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
          Recent Transactions
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
                <th>Date</th>
                <th>Platform</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.platform}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.method}</td>
                  <td>
                    <span
                      style={{
                        color: getStatusColor(transaction.status),
                        fontWeight: '500',
                      }}
                    >
                      {transaction.status}
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
