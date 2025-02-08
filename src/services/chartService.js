const CHART_API_URL = 'https://t51uru.buildship.run/get_chart_data'

export const fetchChartData = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams()
    
    // Only add parameters if they have non-empty values
    if (filters.country) {
      queryParams.append('country', filters.country)
    }
    if (filters.paymentMethod) {
      queryParams.append('payment_method', filters.paymentMethod)
    }
    if (filters.platform) {
      queryParams.append('platform', filters.platform)
    }

    const queryString = queryParams.toString()
    const url = queryString ? `${CHART_API_URL}?${queryString}` : CHART_API_URL
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
      cache: 'no-cache',
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching chart data:', error.message)
    throw error
  }
}

export const fetchClientTransactions = async (clientId) => {
  try {
    const url = `https://t51uru.buildship.run/client_transactions?client_id=${clientId}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
      cache: 'no-cache',
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching client transactions:', error.message)
    // Return mock data for development/testing
    return {
      suspected_transactions: {
        title: "Suspicious Transactions",
        data: [
          {
            transaction_id: "TX912656",
            transaction_date: "2025-02-07T00:00:00.000Z",
            transaction_time: "14:15:00",
            transaction_type: "Trade",
            amount: null,
            platform: "Deriv Trader",
            payment_method: null,
            fraud_indicator: "Multiple Transactions"
          },
          {
            transaction_id: "TX808199",
            transaction_date: "2025-02-07T00:00:00.000Z",
            transaction_time: "14:00:00",
            transaction_type: "Trade",
            amount: null,
            platform: "Deriv Trader",
            payment_method: null,
            fraud_indicator: "Multiple Transactions"
          },
          {
            transaction_id: "TX018917",
            transaction_date: "2025-02-07T00:00:00.000Z",
            transaction_time: "13:45:00",
            transaction_type: "Withdrawal",
            amount: 1119.13,
            platform: "DerivX",
            payment_method: "AirTM",
            fraud_indicator: "Multiple Transactions"
          }
        ]
      }
    }
  }
}
