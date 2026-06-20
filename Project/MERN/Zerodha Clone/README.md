# Zerodha-Clone
Zerodha Clone is a fully functional web-based stock trading and portfolio management platform

# 📈 Zerodha Clone – Complete Stock Trading Platform

Welcome to **Zerodha Clone**, a fully functional simulation of India's largest stock brokerage platform. This project is built to replicate key features of [Zerodha’s Kite](https://kite.zerodha.com/) app including live market tracking, watchlists, stock details, a mock trading system, and portfolio management – all designed using modern architecture and performance optimizations.

---

## 🌐 Live Demo

**🔗 Website:** [https://kite-trade.vercel.app/](https://kite-trade.vercel.app/)  
**📁 Repository:** [https://github.com/abhisek2004/Zerodha-Clone](https://github.com/abhisek2004/Zerodha-Clone)

---

## 🛠️ Project Description

This is a **full-featured stock trading simulation platform** designed for educational and portfolio use. It mimics the user experience of Zerodha’s Kite app, allowing users to:

- Browse live stock market data
- Analyze charts and prices
- Add stocks to their watchlist
- Simulate buying/selling with virtual money
- Track their portfolio with profit/loss
- Use an admin dashboard for analytics

---

## 📌 Key Features

### 👤 Authentication
- Secure login & signup
- User session stored in global state
- Protected routes for portfolio & dashboard access

### 📊 Dashboard (Home)
- View market indices: Nifty, Sensex, Bank Nifty
- Real-time stock data with status (Open/Closed)
- Summary of portfolio holdings
- Highlights of top gainers/losers

### 🔍 Stock Market Listing
- Live stock cards with:
  - Price
  - Change (%)
  - Volume
- Sort & filter stocks
- Click to view stock details

### 📈 Stock Detail Page
- Live price chart (mock or real data)
- Technical info: P/E ratio, volume, etc.
- Buy/Sell form with quantity & price
- Add/remove to watchlist

### 💼 Portfolio Page
- Track holdings with:
  - Buy price
  - Current price
  - P&L
- Pie chart of asset distribution
- Value trend over time

### 📜 Order History
- Complete transaction log:
  - Order Type (Buy/Sell)
  - Quantity
  - Price
  - Time
- Cancellable pending orders

### ⭐ Watchlist
- Add stocks to favorites
- Real-time status indicators
- Quick navigation to detailed view

### 🧠 In-Memory Caching & Global State
- Live data cached for performance
- User session, holdings, watchlist stored in global memory
- Uses memory to reduce API calls and load times

### ⚙️ Admin Panel (Optional)
- Manage users
- Broadcast market alerts
- View most traded stocks
- Monitor portfolio activity (simulation only)

---

## 🧪 Demo Workflow

1. Sign up or log in
2. Search & explore stock data
3. Add items to watchlist
4. Simulate trades (buy/sell)
5. Track portfolio performance
6. Review trade history
7. Admin: manage users and send updates

---

## 📁 Folder Structure Overview

```

zerodha-clone/
├── client/
│   ├── components/         # Navbar, StockCard, Chart, etc.
│   ├── pages/              # Home, Login, StockDetail, Portfolio
│   ├── context/            # Global state using Context API
│   └── utils/              # Formatters, caching functions
├── server/
│   ├── routes/             # Auth, stocks, orders, user
│   ├── controllers/
│   ├── models/             # User, Stock, Trade, Portfolio
│   └── middleware/
├── public/
├── .env
└── README.md

```

---

## 🔐 Roles

### 👤 User
- Search and simulate stock trades
- Manage their portfolio
- View charts and trade history
- Build watchlist

### 👑 Admin (optional route)
- View top stocks
- Broadcast market alerts
- Manage fake or test accounts
- Analyze trade simulations

---

## 🧠 Data Management (In-Depth)

| Type               | Usage |
|--------------------|-------|
| Global State       | Auth session, watchlist, holdings |
| LocalStorage       | Persist watchlist between reloads |
| In-Memory Caching  | Store live stock data, API responses |
| Backend Database   | Save user data, trades, portfolio |
| Session Timeout    | Auto logout after inactivity (optional) |

---

## 📈 Future Enhancements

- ✅ Dark mode toggle  
- ✅ Stock charting using real APIs (e.g., Alpha Vantage or TradingView Widget)  
- ⏳ Notification alerts on stock movement  
- ⏳ Price alert system  
- ⏳ Real admin control panel with user monitoring  
- ⏳ Add IPO & Mutual Funds module  
- ⏳ Mobile-optimized PWA  

---

## 📜 License

This project is for **educational/demo purposes only**. It does **not use real money**, and no financial services are offered.

---

## 🙋‍♂️ Author

**👨‍💻 Abhisek Panda**  
- 🌐 [Portfolio](https://abhisekpanda072.vercel.app/)  
- 🐙 [GitHub](https://github.com/abhisek2004)  
- 🔗 [LinkedIn](https://www.linkedin.com/in/abhisekpanda2004/)

---

## 💬 Contributions & Feedback

If you'd like to suggest features, contribute enhancements, or report bugs, feel free to open an issue or pull request.
