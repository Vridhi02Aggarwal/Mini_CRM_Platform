import React from 'react';
import { Plus, Users, Send, X, Calendar, TrendingUp, BarChart3 } from 'lucide-react';

const CampaignHistory = ({ campaigns, onCreateNew }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSuccessRate = (sent, failed) => {
    if (sent === 0) return 0;
    return ((sent - failed) / sent * 100).toFixed(1);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Campaign History</h2>
          <p className="text-gray-600 mt-1">Track your campaign performance and insights</p>
        </div>
        <button
          onClick={onCreateNew}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns yet</h3>
          <p className="text-gray-600 mb-6">Create your first campaign to get started</p>
          <button
            onClick={onCreateNew}
            className="flex items-center mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {campaign.createdAt}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Audience Size</p>
                      <p className="text-2xl font-bold text-blue-900">{campaign.audienceSize}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Sent</p>
                      <p className="text-2xl font-bold text-green-900">{campaign.sent}</p>
                    </div>
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-red-600 font-medium">Failed</p>
                      <p className="text-2xl font-bold text-red-900">{campaign.failed}</p>
                    </div>
                    <X className="w-8 h-8 text-red-600" />
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Success Rate</p>
                      <p className="text-2xl font-bold text-purple-900">{getSuccessRate(campaign.sent, campaign.failed)}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignHistory;