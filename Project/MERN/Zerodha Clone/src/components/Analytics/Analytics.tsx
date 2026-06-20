import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';

const Analytics: React.FC = () => {
  const { holdings, transactions } = useTrading();

  const totalPortfolioValue = holdings.reduce((sum, holding) => sum + holding.totalValue, 0);
  const totalInvestment = holdings.reduce((sum, holding) => sum + (holding.quantity * holding.averagePrice), 0);
  const totalGainLoss = totalPortfolioValue - totalInvestment;

  const buyTransactions = transactions.filter(t => t.type === 'BUY');
  const sellTransactions = transactions.filter(t => t.type === 'SELL');

  const sectorAllocation = holdings.reduce((acc, holding) => {
    // Mock sector data - in real app, this would come from stock data
    const sector = holding.symbol.includes('BANK') ? 'Banking' : 
                   holding.symbol.includes('IT') || holding.symbol === 'TCS' || holding.symbol === 'INFY' ? 'IT' : 
                   'Other';
    
    acc[sector] = (acc[sector] || 0) + holding.totalValue;
    return acc;
  }, {} as Record<string, number>);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Analyze your trading performance and portfolio</p>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Portfolio Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPortfolioValue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total P&L</p>
              <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totalGainLoss)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Activity className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Trades</p>
              <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <PieChart className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Holdings</p>
              <p className="text-2xl font-bold text-gray-900">{holdings.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trading Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Trading Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Buy Orders</span>
                <span className="text-sm font-bold text-green-600">{buyTransactions.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Sell Orders</span>
                <span className="text-sm font-bold text-red-600">{sellTransactions.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Success Rate</span>
                <span className="text-sm font-bold text-gray-900">
                  {transactions.length > 0 ? '100%' : '0%'}
                </span>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-sm font-medium text-gray-500">Total Volume</span>
                <span className="text-sm font-bold text-gray-900">
                  {formatCurrency(transactions.reduce((sum, t) => sum + t.total, 0))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sector Allocation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Sector Allocation</h3>
          </div>
          <div className="p-6">
            {Object.keys(sectorAllocation).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(sectorAllocation).map(([sector, value]) => {
                  const percentage = totalPortfolioValue > 0 ? (value / totalPortfolioValue) * 100 : 0;
                  return (
                    <div key={sector}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{sector}</span>
                        <span className="text-sm text-gray-500">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatCurrency(value)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <PieChart className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">No holdings to analyze</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Performing Stocks */}
      {holdings.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Performing Holdings</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {holdings
                .sort((a, b) => b.gainLossPercent - a.gainLossPercent)
                .slice(0, 5)
                .map((holding) => (
                  <div key={holding.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{holding.symbol}</p>
                      <p className="text-sm text-gray-600">{holding.name}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {holding.gainLoss >= 0 ? '+' : ''}{holding.gainLossPercent.toFixed(2)}%
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(holding.gainLoss)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;