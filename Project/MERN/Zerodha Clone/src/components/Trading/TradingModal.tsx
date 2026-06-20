import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Star } from 'lucide-react';
import { useTrading } from '../../context/TradingContext';
import { Stock } from '../../types';

interface TradingModalProps {
  stock: Stock;
  onClose: () => void;
}

const TradingModal: React.FC<TradingModalProps> = ({ stock, onClose }) => {
  const { buyStock, sellStock, addToWatchlist, removeFromWatchlist, watchlist, holdings } = useTrading();
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const isInWatchlist = watchlist.some(w => w.symbol === stock.symbol);
  const holding = holdings.find(h => h.symbol === stock.symbol);
  const availableQuantity = holding ? holding.quantity : 0;

  const totalAmount = stock.price * quantity;

  const handleTrade = async () => {
    if (quantity <= 0) return;
    
    setIsProcessing(true);
    
    try {
      if (orderType === 'BUY') {
        await buyStock(stock.symbol, quantity);
      } else {
        if (quantity > availableQuantity) {
          alert('Insufficient holdings');
          return;
        }
        await sellStock(stock.symbol, quantity);
      }
      
      alert(`${orderType} order placed successfully!`);
      onClose();
    } catch (error) {
      alert('Trade failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      removeFromWatchlist(stock.symbol);
    } else {
      addToWatchlist(stock.symbol);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{stock.symbol}</h2>
            <p className="text-sm text-gray-600">{stock.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stock Info */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">₹{stock.price.toFixed(2)}</p>
              <div className={`flex items-center text-sm ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stock.changePercent >= 0 ? 
                  <TrendingUp className="h-4 w-4 mr-1" /> : 
                  <TrendingDown className="h-4 w-4 mr-1" />
                }
                <span>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
            <button
              onClick={handleWatchlistToggle}
              className={`p-2 rounded-md ${isInWatchlist ? 'text-yellow-600 hover:text-yellow-700' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Star className={`h-5 w-5 ${isInWatchlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">High</p>
              <p className="font-medium">₹{stock.high.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-500">Low</p>
              <p className="font-medium">₹{stock.low.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-500">Volume</p>
              <p className="font-medium">{stock.volume.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500">P/E</p>
              <p className="font-medium">{stock.pe.toFixed(2)}</p>
            </div>
          </div>

          {holding && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Holdings:</strong> {holding.quantity} shares • 
                Avg: ₹{holding.averagePrice.toFixed(2)} • 
                P&L: <span className={holding.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {holding.gainLoss >= 0 ? '+' : ''}₹{holding.gainLoss.toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Trading Section */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={() => setOrderType('BUY')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-md border ${
                  orderType === 'BUY'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                BUY
              </button>
              <button
                onClick={() => setOrderType('SELL')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-md border-l-0 border ${
                  orderType === 'SELL'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                SELL
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              max={orderType === 'SELL' ? availableQuantity : undefined}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {orderType === 'SELL' && (
              <p className="text-sm text-gray-500 mt-1">
                Available: {availableQuantity} shares
              </p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Price per share:</span>
              <span className="font-medium">₹{stock.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-900">Total Amount:</span>
              <span className="font-bold text-lg">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleTrade}
            disabled={isProcessing || (orderType === 'SELL' && quantity > availableQuantity)}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
              orderType === 'BUY'
                ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-300'
                : 'bg-red-600 hover:bg-red-700 disabled:bg-red-300'
            } disabled:cursor-not-allowed transition-colors`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              `${orderType} ${quantity} ${quantity === 1 ? 'share' : 'shares'}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradingModal;