import React, { useState } from 'react';
import { Send } from 'lucide-react';
import RuleBuilder from './RuleBuilder';

const CampaignForm = ({ onSave, onCancel, customers }) => {
  const [campaignName, setCampaignName] = useState('');
  const [rules, setRules] = useState([]);
  const [message, setMessage] = useState('');

  const handleSave = () => {
    if (!campaignName.trim()) return;
    
    const audienceSize = rules.length > 0 ? 
      customers.filter(customer => {
        let result = true;
        let currentLogic = 'AND';
        
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];
          let ruleResult = false;
          
          const customerValue = customer[rule.field];
          const ruleValue = parseFloat(rule.value) || rule.value;
          
          switch (rule.operator) {
            case '>':
              ruleResult = parseFloat(customerValue) > parseFloat(ruleValue);
              break;
            case '<':
              ruleResult = parseFloat(customerValue) < parseFloat(ruleValue);
              break;
            case '=':
              ruleResult = customerValue === ruleValue;
              break;
            case 'contains':
              ruleResult = customerValue.toString().toLowerCase().includes(ruleValue.toString().toLowerCase());
              break;
            default:
              ruleResult = false;
          }
          
          if (i === 0) {
            result = ruleResult;
          } else {
            if (currentLogic === 'AND') {
              result = result && ruleResult;
            } else {
              result = result || ruleResult;
            }
          }
          
          currentLogic = rule.logic;
        }
        
        return result;
      }).length : customers.length;

    const campaign = {
      name: campaignName,
      audienceSize,
      sent: Math.max(0, audienceSize - Math.floor(Math.random() * 3)),
      failed: Math.floor(Math.random() * 3),
      rules,
      message
    };

    onSave(campaign);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Campaign</h2>
          <p className="text-gray-600">Define your audience and create targeted campaigns</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Name
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Enter campaign name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <RuleBuilder 
            rules={rules} 
            onChange={setRules} 
            customers={customers}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your campaign message"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              onClick={handleSave}
              disabled={!campaignName.trim()}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4 mr-2" />
              Launch Campaign
            </button>
            <button
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;