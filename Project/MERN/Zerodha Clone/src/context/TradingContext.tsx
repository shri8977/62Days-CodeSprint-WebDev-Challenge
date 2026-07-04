import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Stock, Holding, Transaction, WatchlistItem, MarketIndex } from '../types';
import { generateMockStocks, generateMockIndices } from '../services/mockData';

interface TradingContextType {
  stocks: Stock[];
  holdings: Holding[];
  transactions: Transaction[];
  watchlist: WatchlistItem[];
  marketIndices: MarketIndex[];
  selectedStock: Stock | null;
  
  // Actions
  buyStock: (symbol: string, quantity: number) => Promise<boolean>;
  sellStock: (symbol: string, quantity: number) => Promise<boolean>;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  setSelectedStock: (stock: Stock | null) => void;
  searchStocks: (query: string) => Stock[];
  updateStockPrices: () => void;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error('useTrading must be used within a TradingProvider');
  }
  return context;
};

interface TradingProviderProps {
  children: ReactNode;
}

export const TradingProvider: React.FC<TradingProviderProps> = ({ children }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [marketIndices, setMarketIndices] = useState<MarketIndex[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  useEffect(() => {
    // Initialize mock data
    const mockStocks = generateMockStocks();
    const mockIndices = generateMockIndices();
    
    setStocks(mockStocks);
    setMarketIndices(mockIndices);
    
    // Load persisted data
    const savedHoldings = localStorage.getItem('holdings');
    const savedTransactions = localStorage.getItem('transactions');
    const savedWatchlist = localStorage.getItem('watchlist');
    
    if (savedHoldings) setHoldings(JSON.parse(savedHoldings));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedWatchlist) setWatchlist(JSON.parse(savedWatchlist));
    
    // Start real-time updates
    const interval = setInterval(updateStockPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateStockPrices = () => {
    setStocks(prevStocks => 
      prevStocks.map(stock => ({
        ...stock,
        price: stock.price * (1 + (Math.random() - 0.5) * 0.02), // ±1% random change
        change: stock.price * (Math.random() - 0.5) * 0.02,
        changePercent: (Math.random() - 0.5) * 2,
        lastUpdated: new Date()
      }))
    );
    
    setMarketIndices(prevIndices =>
      prevIndices.map(index => ({
        ...index,
        value: index.value * (1 + (Math.random() - 0.5) * 0.01),
        change: index.value * (Math.random() - 0.5) * 0.01,
        changePercent: (Math.random() - 0.5) * 1
      }))
    );
  };

  const buyStock = async (symbol: string, quantity: number): Promise<boolean> => {
    if (!Number.isFinite(quantity) || quantity <= 0) return false;
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return false;
    
    const total = stock.price * quantity;
    
    // Check if user has enough balance (would check with AuthContext in real app)
    const transaction: Transaction = {
      id: Date.now().toString(),
      symbol,
      name: stock.name,
      type: 'BUY',
      quantity,
      price: stock.price,
      total,
      status: 'COMPLETED',
      timestamp: new Date()
    };
    
    const newTransactions = [...transactions, transaction];
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
    
    // Update holdings
    const existingHolding = holdings.find(h => h.symbol === symbol);
    let newHoldings;
    
    if (existingHolding) {
      const newQuantity = existingHolding.quantity + quantity;
      const newAveragePrice = (existingHolding.averagePrice * existingHolding.quantity + total) / newQuantity;
      
      newHoldings = holdings.map(h => 
        h.symbol === symbol 
          ? { 
              ...h, 
              quantity: newQuantity, 
              averagePrice: newAveragePrice,
              currentPrice: stock.price,
              totalValue: newQuantity * stock.price,
              gainLoss: (stock.price - newAveragePrice) * newQuantity,
              gainLossPercent: ((stock.price - newAveragePrice) / newAveragePrice) * 100
            }
          : h
      );
    } else {
      const newHolding: Holding = {
        id: Date.now().toString(),
        symbol,
        name: stock.name,
        quantity,
        averagePrice: stock.price,
        currentPrice: stock.price,
        totalValue: total,
        gainLoss: 0,
        gainLossPercent: 0,
        purchaseDate: new Date()
      };
      newHoldings = [...holdings, newHolding];
    }
    
    setHoldings(newHoldings);
    localStorage.setItem('holdings', JSON.stringify(newHoldings));
    
    return true;
  };

  const sellStock = async (symbol: string, quantity: number): Promise<boolean> => {
    if (!Number.isFinite(quantity) || quantity <= 0) return false;
    const stock = stocks.find(s => s.symbol === symbol);
    const holding = holdings.find(h => h.symbol === symbol);
    
    if (!stock || !holding || holding.quantity < quantity) return false;
    
    const total = stock.price * quantity;
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      symbol,
      name: stock.name,
      type: 'SELL',
      quantity,
      price: stock.price,
      total,
      status: 'COMPLETED',
      timestamp: new Date()
    };
    
    const newTransactions = [...transactions, transaction];
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
    
    // Update holdings
    const newQuantity = holding.quantity - quantity;
    let newHoldings;
    
    if (newQuantity === 0) {
      newHoldings = holdings.filter(h => h.symbol !== symbol);
    } else {
      newHoldings = holdings.map(h => 
        h.symbol === symbol 
          ? { 
              ...h, 
              quantity: newQuantity,
              currentPrice: stock.price,
              totalValue: newQuantity * stock.price,
              gainLoss: (stock.price - h.averagePrice) * newQuantity,
              gainLossPercent: ((stock.price - h.averagePrice) / h.averagePrice) * 100
            }
          : h
      );
    }
    
    setHoldings(newHoldings);
    localStorage.setItem('holdings', JSON.stringify(newHoldings));
    
    return true;
  };

  const addToWatchlist = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock || watchlist.some(w => w.symbol === symbol)) return;
    
    const watchlistItem: WatchlistItem = {
      symbol,
      name: stock.name,
      price: stock.price,
      change: stock.change,
      changePercent: stock.changePercent,
      addedAt: new Date()
    };
    
    const newWatchlist = [...watchlist, watchlistItem];
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  const removeFromWatchlist = (symbol: string) => {
    const newWatchlist = watchlist.filter(w => w.symbol !== symbol);
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  };

  const searchStocks = (query: string): Stock[] => {
    if (!query.trim()) return [];
    
    const lowercaseQuery = query.toLowerCase();
    return stocks.filter(stock => 
      stock.symbol.toLowerCase().includes(lowercaseQuery) ||
      stock.name.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 10);
  };

  return (
    <TradingContext.Provider value={{
      stocks,
      holdings,
      transactions,
      watchlist,
      marketIndices,
      selectedStock,
      buyStock,
      sellStock,
      addToWatchlist,
      removeFromWatchlist,
      setSelectedStock,
      searchStocks,
      updateStockPrices
    }}>
      {children}
    </TradingContext.Provider>
  );
};