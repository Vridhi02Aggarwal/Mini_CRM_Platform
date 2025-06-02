import React from 'react';
import { Users, BarChart3, Send, TrendingUp } from 'lucide-react';

const Dashboard = ({ customers, campaigns }) => {
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalCampaigns = campaigns.length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpend, 0);

  const stats = [
    { label: 'Total Customers', value: totalCustomers, icon: Users, color: 'blue' },
    { label: 'Active Customers', value: activeCustomers, icon: TrendingUp, color: 'green' },
    { label: 'Total Campaigns', value: totalCampaigns, icon: Send, color: 'purple' },
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: BarChart3, color: 'orange' },
  ];

  const getStatColor = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Overview of your CRM performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Customers</h3>
          <div className="space-y-3">
            {customers.slice(0, 5).map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{customer.name}</p>
                  <p className="text-sm text-gray-600">{customer.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{customer.totalSpend.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{customer.visits} visits</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h3>
          <div className="space-y-3">
            {campaigns.slice(0, 5).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-sm text-gray-600">{campaign.createdAt}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{campaign.audienceSize} recipients</p>
                  <p className="text-sm text-gray-600">{((campaign.sent - campaign.failed) / campaign.sent * 100).toFixed(1)}% success</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
