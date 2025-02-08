import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CTable } from '@coreui/react'
import { fetchClientTransactions } from '../../services/chartService'
import TransactionsModal from './TransactionsModal'

const TransactionsList = ({ data: transactionsData }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedClientTransactions, setSelectedClientTransactions] = useState(null)
  const [loading, setLoading] = useState(false)

  const textColor = '#fff'
  const chartBackground = '#1e1e2f'

  const transactions = transactionsData?.data || []

  const handleRowClick = async (clientId) => {
    try {
      console.log('Row clicked for client:', clientId)
      setLoading(true)
      const transactions = await fetchClientTransactions(clientId)
      console.log('Fetched transactions:', transactions)
      setSelectedClientTransactions(transactions.suspected_transactions)
      console.log('Setting modal visible')
      setModalVisible(true)
    } catch (error) {
      console.error('Error fetching client transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  console.log('Modal visible:', modalVisible)
  console.log('Selected transactions:', selectedClientTransactions)

  return (
    <>
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
                  <tr 
                    key={`transaction-${index}`}
                    onClick={() => handleRowClick(transaction.client_id)}
                    style={{ cursor: 'pointer' }}
                  >
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
      <TransactionsModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false)
          setSelectedClientTransactions(null)
        }}
        transactions={selectedClientTransactions}
      />
    </>
  )
}

export default TransactionsList
