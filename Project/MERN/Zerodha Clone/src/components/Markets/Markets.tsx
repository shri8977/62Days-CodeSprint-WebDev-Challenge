import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Search, Filter, Star } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';

const Markets: React.FC = () => {
  const { stocks, addToWatchlist, removeFromWatchlist, watchlist, setSelectedStock } = useTrading();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('changePercent');
  const [filterBy, setFilterBy] = useState('all');

  const filteredStocks = stocks
    .filter(stock => {
      const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterBy === 'all') return matchesSearch;
      if (filterBy === 'gainers') return matchesSearch && stock.changePercent > 0;
      if (filterBy === 'losers') return matchesSearch && stock.changePercent < 0;
      return matchesSearch && stock.sector === filterBy;
    })
    .sort((a, b) => {
      if (sortBy === 'changePercent') return b.changePercent - a.changePercent;
      if (sortBy === 'volume') return b.volume - a.volume;
      if (sortBy === 'marketCap') return b.marketCap - a.marketCap;
      return a.symbol.localeCompare(b.symbol);
    });

  const isInWatchlist = (symbol: string) => watchlist.some(w => w.symbol === symbol);

  const handleWatchlistToggle = (stock: any) => {
    if (isInWatchlist(stock.symbol)) {
      removeFromWatchlist(stock.symbol);
    } else {
      addToWatchlist(stock.symbol);
    }
  };

  const sectors = ['all', 'gainers', 'losers', 'IT', 'Financial Services', 'Oil & Gas', 'Automobile', 'Pharmaceuticals'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Markets</h1>
        <p className="text-gray-600 mt-2">Track live stock prices and market movements</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sectors.map(sector => (
                <option key={sector} value={sector}>
                  {sector === 'all' ? 'All Sectors' : 
                   sector === 'gainers' ? 'Top Gainers' :
                   sector === 'losers' ? 'Top Losers' : sector}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="changePercent">% Change</option>
              <option value="volume">Volume</option>
              <option value="marketCap">Market Cap</option>
              <option value="symbol">Symbol</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stocks Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Cap
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStocks.map((stock) => (
                <tr key={stock.symbol} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                      <div className="text-sm text-gray-500">{stock.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₹{stock.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center text-sm ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.changePercent >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      <span>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <div className={`text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '+' : ''}₹{stock.change.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {stock.volume.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{stock.marketCap.toLocaleString()}Cr
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleWatchlistToggle(stock)}
                        className={`p-2 rounded-md ${isInWatchlist(stock.symbol) ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        <Star className={`h-4 w-4 ${isInWatchlist(stock.symbol) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => setSelectedStock(stock)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Markets;