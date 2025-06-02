// Mock API Service for the CRM Platform
const apiService = {
  customers: [
    { id: 1, name: 'John Doe', email: 'john@example.com', totalSpend: 15000, visits: 5, lastVisit: '2024-12-01', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', totalSpend: 8000, visits: 2, lastVisit: '2024-10-15', status: 'inactive' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', totalSpend: 25000, visits: 8, lastVisit: '2024-12-10', status: 'active' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', totalSpend: 5000, visits: 1, lastVisit: '2024-09-20', status: 'inactive' },
    { id: 5, name: 'David Brown', email: 'david@example.com', totalSpend: 18000, visits: 6, lastVisit: '2024-11-28', status: 'active' },
  ],
  
  campaigns: [
    { id: 1, name: 'High Value Customers', audienceSize: 156, sent: 156, failed: 2, createdAt: '2024-12-01', status: 'completed' },
    { id: 2, name: 'Win Back Campaign', audienceSize: 89, sent: 89, failed: 0, createdAt: '2024-11-28', status: 'completed' },
    { id: 3, name: 'New Customer Welcome', audienceSize: 203, sent: 198, failed: 5, createdAt: '2024-11-25', status: 'completed' },
  ],

  // Simulate API delay
  delay: (ms = 500) => new Promise(resolve => setTimeout(resolve, ms)),

  // Get all customers
  getCustomers: async () => {
    await apiService.delay(300);
    return Promise.resolve(apiService.customers);
  },

  // Get all campaigns
  getCampaigns: async () => {
    await apiService.delay(200);
    return Promise.resolve(apiService.campaigns);
  },

  // Create a new campaign
  createCampaign: async (campaign) => {
    await apiService.delay(400);
    const newCampaign = {
      id: Date.now(),
      ...campaign,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'completed'
    };
    apiService.campaigns.unshift(newCampaign);
    return Promise.resolve(newCampaign);
  },

  // Add a new customer (for future use)
  addCustomer: async (customer) => {
    await apiService.delay(300);
    const newCustomer = {
      id: Date.now(),
      ...customer,
      status: 'active'
    };
    apiService.customers.unshift(newCustomer);
    return Promise.resolve(newCustomer);
  },

  // Update customer (for future use)
  updateCustomer: async (id, updates) => {
    await apiService.delay(300);
    const customerIndex = apiService.customers.findIndex(c => c.id === id);
    if (customerIndex !== -1) {
      apiService.customers[customerIndex] = { ...apiService.customers[customerIndex], ...updates };
      return Promise.resolve(apiService.customers[customerIndex]);
    }
    return Promise.reject(new Error('Customer not found'));
  },

  // Delete customer (for future use)
  deleteCustomer: async (id) => {
    await apiService.delay(300);
    const customerIndex = apiService.customers.findIndex(c => c.id === id);
    if (customerIndex !== -1) {
      const deleted = apiService.customers.splice(customerIndex, 1)[0];
      return Promise.resolve(deleted);
    }
    return Promise.reject(new Error('Customer not found'));
  }
};

export default apiService;