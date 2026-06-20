export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  role: 'admin' | 'trader';
  avatar?: string;
  createdAt: Date;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  pe: number;
  eps: number;
  high: number;
  low: number;
  open: number;
  close: number;
  sector: string;
  exchange: 'NSE' | 'BSE';
  lastUpdated: Date;
}

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercent: number;
  purchaseDate: Date;
}

export interface Transaction {
  id: string;
  symbol: string;
  name: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  total: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  timestamp: Date;
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  addedAt: Date;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface ChartData {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface SearchResult {
  symbol: string;
  name: string;
  sector: string;
  exchange: string;
}