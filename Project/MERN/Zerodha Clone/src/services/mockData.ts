import { Stock, MarketIndex } from '../types';

export const generateMockStocks = (): Stock[] => {
  const companies = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', sector: 'Oil & Gas', exchange: 'NSE' as const },
    { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', exchange: 'NSE' as const },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', sector: 'Financial Services', exchange: 'NSE' as const },
    { symbol: 'INFY', name: 'Infosys Ltd', sector: 'IT', exchange: 'NSE' as const },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', sector: 'FMCG', exchange: 'NSE' as const },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', sector: 'Financial Services', exchange: 'NSE' as const },
    { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', sector: 'Financial Services', exchange: 'NSE' as const },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', sector: 'Telecom', exchange: 'NSE' as const },
    { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', sector: 'Paints', exchange: 'NSE' as const },
    { symbol: 'MARUTI', name: 'Maruti Suzuki India Ltd', sector: 'Automobile', exchange: 'NSE' as const },
    { symbol: 'AXISBANK', name: 'Axis Bank Ltd', sector: 'Financial Services', exchange: 'NSE' as const },
    { symbol: 'LT', name: 'Larsen & Toubro Ltd', sector: 'Construction', exchange: 'NSE' as const },
    { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries', sector: 'Pharmaceuticals', exchange: 'NSE' as const },
    { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Ltd', sector: 'Cement', exchange: 'NSE' as const },
    { symbol: 'TITAN', name: 'Titan Company Ltd', sector: 'Consumer Goods', exchange: 'NSE' as const },
    { symbol: 'WIPRO', name: 'Wipro Ltd', sector: 'IT', exchange: 'NSE' as const },
    { symbol: 'NESTLEIND', name: 'Nestle India Ltd', sector: 'FMCG', exchange: 'NSE' as const },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd', sector: 'Financial Services', exchange: 'NSE' as const },
    { symbol: 'HCLTECH', name: 'HCL Technologies Ltd', sector: 'IT', exchange: 'NSE' as const },
    { symbol: 'POWERGRID', name: 'Power Grid Corporation', sector: 'Power', exchange: 'NSE' as const }
  ];

  return companies.map(company => {
    const basePrice = Math.random() * 3000 + 100;
    const change = (Math.random() - 0.5) * 100;
    const changePercent = (change / basePrice) * 100;
    
    return {
      symbol: company.symbol,
      name: company.name,
      price: basePrice,
      change,
      changePercent,
      volume: Math.floor(Math.random() * 1000000) + 100000,
      marketCap: Math.floor(Math.random() * 500000) + 50000,
      pe: Math.random() * 50 + 5,
      eps: Math.random() * 100 + 10,
      high: basePrice + Math.random() * 50,
      low: basePrice - Math.random() * 50,
      open: basePrice + (Math.random() - 0.5) * 20,
      close: basePrice,
      sector: company.sector,
      exchange: company.exchange,
      lastUpdated: new Date()
    };
  });
};

export const generateMockIndices = (): MarketIndex[] => {
  return [
    {
      name: 'NIFTY 50',
      value: 19500 + (Math.random() - 0.5) * 1000,
      change: (Math.random() - 0.5) * 200,
      changePercent: (Math.random() - 0.5) * 2
    },
    {
      name: 'SENSEX',
      value: 65000 + (Math.random() - 0.5) * 3000,
      change: (Math.random() - 0.5) * 600,
      changePercent: (Math.random() - 0.5) * 2
    },
    {
      name: 'NIFTY BANK',
      value: 43000 + (Math.random() - 0.5) * 2000,
      change: (Math.random() - 0.5) * 400,
      changePercent: (Math.random() - 0.5) * 2
    },
    {
      name: 'NIFTY IT',
      value: 30000 + (Math.random() - 0.5) * 1500,
      change: (Math.random() - 0.5) * 300,
      changePercent: (Math.random() - 0.5) * 2
    }
  ];
};