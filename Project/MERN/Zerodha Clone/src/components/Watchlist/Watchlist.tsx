import React from 'react';
import { Star, TrendingUp, TrendingDown, X } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';

const Watchlist: React.FC = () => {
  const { watchlist, removeFromWatchlist, setSelectedStock, stocks } = useTrading();

  const getStockPrice = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    return stock ? stock.price : 0;
  };

  const getStockChange = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    return stock ? { change: stock.change, changePercent: stock.changePercent } : { change: 0, changePercent: 0 };
  };

  const handleStockClick = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock) {
      setSelectedStock(stock);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Watchlist</h1>
        <p className="text-gray-600 mt-2">Keep track of your favorite stocks</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Star className="h-5 w-5 text-yellow-600 mr-2" />
            My Watchlist ({watchlist.length})
          </h3>
        </div>
        
        {watchlist.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Star className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No stocks in watchlist</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add stocks to your watchlist from the Markets page to track them here
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {watchlist.map((item) => {
              const currentPrice = getStockPrice(item.symbol);
              const { change, changePercent } = getStockChange(item.symbol);
              
              return (
                <div
                  key={item.symbol}
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleStockClick(item.symbol)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{item.symbol}</h4>
                          <p className="text-sm text-gray-500">{item.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">₹{currentPrice.toFixed(2)}</p>
                          <div className={`flex items-center justify-end text-sm ${changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {changePercent >= 0 ? 
                              <TrendingUp className="h-4 w-4 mr-1" /> : 
                              <TrendingDown className="h-4 w-4 mr-1" />
                            }
                            <span>
                              {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWatchlist(item.symbol);
                      }}
                      className="ml-4 p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;