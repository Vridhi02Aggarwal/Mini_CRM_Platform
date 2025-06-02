import React from 'react';
import { Plus, Eye, X } from 'lucide-react';

const RuleBuilder = ({ rules, onChange, customers }) => {
  const addRule = () => {
    onChange([...rules, { field: 'totalSpend', operator: '>', value: '', logic: 'AND' }]);
  };

  const updateRule = (index, field, value) => {
    const newRules = [...rules];
    newRules[index][field] = value;
    onChange(newRules);
  };

  const removeRule = (index) => {
    onChange(rules.filter((_, i) => i !== index));
  };

  const evaluateRules = () => {
    if (rules.length === 0) return customers.length;
    
    return customers.filter(customer => {
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
    }).length;
  };

  const audienceSize = evaluateRules();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Audience Rules</h3>
        <button
          onClick={addRule}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Rule
        </button>
      </div>

      {rules.map((rule, index) => (
        <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          {index > 0 && (
            <select
              value={rules[index - 1].logic}
              onChange={(e) => updateRule(index - 1, 'logic', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          )}
          
          <select
            value={rule.field}
            onChange={(e) => updateRule(index, 'field', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="totalSpend">Total Spend</option>
            <option value="visits">Visits</option>
            <option value="status">Status</option>
            <option value="name">Name</option>
          </select>

          <select
            value={rule.operator}
            onChange={(e) => updateRule(index, 'operator', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value=">">Greater than</option>
            <option value="<">Less than</option>
            <option value="=">=Equals</option>
            <option value="contains">Contains</option>
          </select>

          <input
            type={rule.field === 'totalSpend' || rule.field === 'visits' ? 'number' : 'text'}
            value={rule.value}
            onChange={(e) => updateRule(index, 'value', e.target.value)}
            placeholder="Value"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => removeRule(index)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      {rules.length > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <Eye className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-semibold">
              Estimated Audience Size: {audienceSize} customers
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RuleBuilder;