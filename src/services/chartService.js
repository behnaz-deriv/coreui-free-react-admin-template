const CHART_API_URL = 'https://t51uru.buildship.run/get_chart_data'

export const fetchChartData = async () => {
  try {
    const response = await fetch(CHART_API_URL, {
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
    // Return mock data for development/testing
    return {
      trending_countries: {
        title: "Trending Countries for Fraud",
        data: [
          { country: "Russia", cases: 2644, amount: 917640.13 },
          { country: "South Africa", cases: 2330, amount: 830812.78 },
          { country: "France", cases: 2172, amount: 851595.53 },
          { country: "Germany", cases: 2102, amount: 888183.72 },
          { country: "India", cases: 1607, amount: 843568.68 }
        ]
      },
      trading_platforms: {
        title: "Trading Platforms",
        total: "100%",
        data: [
          { platform: "DerivX", percentage: 33 },
          { platform: "cTrader", percentage: 34 },
          { platform: "MT5", percentage: 33 }
        ]
      },
      payment_methods: {
        title: "Payment Methods",
        data: [
          { method: "ADVCash", volume: 742533, count: 263 },
          { method: "OZOW", volume: 725837, count: 264 },
          { method: "Credit Card", volume: 725593, count: 258 },
          { method: "Skrill", volume: 719261, count: 266 },
          { method: "Perfect Money", volume: 712716, count: 260 },
          { method: "AirTM", volume: 705858, count: 253 }
        ]
      },
      suspected_transactions: {
        title: "Suspicious Transactions",
        data: [
          {
            client_id: 1,
            transaction_id: "TX018917",
            transaction_date: "2025-02-07T00:00:00.000Z",
            transaction_type: "Withdrawal",
            amount: 1119.13,
            platform: "DerivX",
            payment_method: "AirTM",
            country: "India",
            kyc_completed: true
          },
          {
            client_id: 2,
            transaction_id: "TX567579",
            transaction_date: "2025-02-07T00:00:00.000Z",
            transaction_type: "Withdrawal",
            amount: 3244.29,
            platform: "DerivX",
            payment_method: "Perfect Money",
            country: "India",
            kyc_completed: true
          },
          {
            client_id: 3,
            transaction_id: "TX218725",
            transaction_date: "2025-02-07T00:00:00.000Z",
            transaction_type: "Deposit",
            amount: 1984.11,
            platform: "DerivX",
            payment_method: "Skrill",
            country: "Germany",
            kyc_completed: true
          },
          {
            client_id: 4,
            transaction_id: "TX934180",
            transaction_date: "2025-02-07T00:00:00.000Z",
            transaction_type: "Withdrawal",
            amount: 1325.8,
            platform: "DerivX",
            payment_method: "Credit Card",
            country: "South Africa",
            kyc_completed: true
          }
        ]
      }
    }
  }
}
