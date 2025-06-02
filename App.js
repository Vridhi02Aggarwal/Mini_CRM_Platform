import React, { useState, useEffect } from 'react';
import { BarChart3, Send, Users, Plus, Database } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CampaignHistory from './components/CampaignHistory';
import CampaignForm from './components/CampaignForm';
import apiService from './services/apiService';
import './App.css';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [customers, setCustomers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [customersData, campaignsData] = await Promise.all([
          apiService.getCustomers(),
          apiService.getCampaigns()
        ]);
        setCustomers(customersData);
        setCampaigns(campaignsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleCreateCampaign = async (campaignData) => {
    try {
      const newCampaign = await apiService.createCampaign(campaignData);
      setCampaigns(prev => [newCampaign, ...prev]);
      setCurrentView('campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'campaigns', label: 'Campaigns', icon: Send },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'create-campaign', label: 'Create Campaign', icon: Plus },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading CRM Platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Database className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Mini CRM</h1>
            </div>
          </div>
          <nav className="flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentView === 'dashboard' && (
          <Dashboard customers={customers} campaigns={campaigns} />
        )}
        
        {currentView === 'campaigns' && (
          <CampaignHistory 
            campaigns={campaigns} 
            onCreateNew={() => setCurrentView('create-campaign')}
          />
        )}
        
        {currentView === 'create-campaign' && (
          <CampaignForm
            customers={customers}
            onSave={handleCreateCampaign}
            onCancel={() => setCurrentView('campaigns')}
          />
        )}
        
        {currentView === 'customers' && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Customers</h2>
              <p className="text-gray-600 mt-1">Manage your customer database</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spend</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500">{customer.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">₹{customer.totalSpend.toLocaleString()}</td>
                        <td className="px-6 py-4 text-gray-900">{customer.visits}</td>
                        <td className="px-6 py-4 text-gray-900">{customer.lastVisit}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            customer.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {customer.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;