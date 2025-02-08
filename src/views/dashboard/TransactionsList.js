import React, { useState } from 'react'
import { CCard, CCardBody, CCardHeader, CTable } from '@coreui/react'
import { fetchClientTransactions, updateClientStatus } from '../../services/chartService'
import TransactionsModal from './TransactionsModal'

const TransactionsList = ({ data: transactionsData }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedClientTransactions, setSelectedClientTransactions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [updatingClientId, setUpdatingClientId] = useState(null)

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
                <th>Actions</th>
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
                          color: transaction.account_status === 'Normal' ? '#2eb85c' : 
                                transaction.account_status === 'Suspicious' ? '#f9b115' :
                                transaction.account_status === 'High Risk' ? '#fd7e14' : '#e55353',
                          fontWeight: '500',
                        }}
                      >
                        {transaction.account_status}
                    </span>
                  </td>
                  <td>
                    {transaction.account_status !== 'Normal' && (
                      <button
                        style={{
                          backgroundColor: transaction.account_status === 'Blocked' ? '#2eb85c' : '#e55353',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500',
                        }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          setUpdatingClientId(transaction.client_id);
                          const newStatus = transaction.account_status === 'Blocked' ? 'Normal' : 'Blocked';
                          updateClientStatus(transaction.client_id, newStatus)
                            .then(() => {
                              // Refresh the data after status update
                              window.location.reload();
                            })
                            .catch((error) => {
                              console.error('Error updating client status:', error);
                            })
                            .finally(() => {
                              setUpdatingClientId(null);
                            });
                        }}
                      >
                        {updatingClientId === transaction.client_id ? 'Updating...' : 
                          transaction.account_status === 'Blocked' ? 'Unblock' : 'Block'}
                      </button>
                    )}
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
