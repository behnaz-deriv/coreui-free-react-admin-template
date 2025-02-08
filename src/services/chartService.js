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
    throw error
  }
}

export const updateClientStatus = async (clientId, newStatus) => {
  try {
    const url = `https://t51uru.buildship.run/block_client?client_id=${clientId}&new_status=${newStatus}`
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
    console.error('Error updating client status:', error.message)
    throw error
  }
}
