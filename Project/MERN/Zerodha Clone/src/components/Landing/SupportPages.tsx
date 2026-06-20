import React from 'react';
import { ArrowLeft, Phone, Mail, Clock, MapPin, AlertCircle, CheckCircle, Code, Activity, Shield, FileText, User, ExternalLink } from 'lucide-react';

interface SupportPageProps {
  page: string;
  onBack: () => void;
}

const SupportPages: React.FC<SupportPageProps> = ({ page, onBack }) => {
  const renderContent = () => {
    switch (page) {
      case 'support':
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">Support Center</h1>
            
            <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <Phone className="w-8 h-8 mb-4 text-blue-600" />
                <h3 className="mb-2 text-lg font-semibold">Phone Support</h3>
                <p className="mb-4 text-gray-600">Get instant help from our support team</p>
                <p className="font-medium text-blue-600">+91 80 4040 2020</p>
                <p className="text-sm text-gray-500">Mon - Fri: 9:00 AM - 6:00 PM</p>
              </div>
              
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <Mail className="w-8 h-8 mb-4 text-blue-600" />
                <h3 className="mb-2 text-lg font-semibold">Email Support</h3>
                <p className="mb-4 text-gray-600">Send us your queries via email</p>
                <p className="font-medium text-blue-600">support@zerodha.com</p>
                <p className="text-sm text-gray-500">Response within 24 hours</p>
              </div>
              
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <Activity className="w-8 h-8 mb-4 text-blue-600" />
                <h3 className="mb-2 text-lg font-semibold">Live Chat</h3>
                <p className="mb-4 text-gray-600">Chat with our support agents</p>
                <button className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700">
                  Start Chat
                </button>
              </div>
            </div>

            <div className="p-6 mb-8 border border-yellow-200 rounded-lg bg-yellow-50">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 mt-1 mr-3 text-yellow-600" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-yellow-800">Important Notice</h3>
                  <p className="text-yellow-700">
                    This is a demo trading platform created for educational purposes. For actual trading support, 
                    please visit the official Zerodha website.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="mb-2 font-semibold text-gray-900">How do I place my first order?</h4>
                    <p className="text-gray-600">Navigate to the Markets section, select a stock, and click on Buy/Sell to place your order.</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="mb-2 font-semibold text-gray-900">What are the brokerage charges?</h4>
                    <p className="text-gray-600">Equity delivery is free. Intraday and F&O trades are charged at ₹20 or 0.03% whichever is lower.</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="mb-2 font-semibold text-gray-900">How do I add funds to my account?</h4>
                    <p className="text-gray-600">You can add funds through net banking, UPI, or bank transfer from your registered bank account.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Quick Links</h2>
                <div className="space-y-3">
                  <a href="https://support.zerodha.com/category/account-opening" target="_blank" rel="noopener noreferrer" className="block p-3 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50">
                    Account Opening Process
                  </a>
                  <a href="https://support.zerodha.com/category/trading-and-markets" target="_blank" rel="noopener noreferrer" className="block p-3 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50">
                    Trading Guidelines
                  </a>
                  <a href="https://kite.trade" target="_blank" rel="noopener noreferrer" className="block p-3 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50">
                    Platform Tutorial
                  </a>
                  <a href="https://support.zerodha.com/category/trading-and-markets/margin-leverage-and-product-and-order-types" target="_blank" rel="noopener noreferrer" className="block p-3 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50">
                    Risk Management
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">Help Center</h1>
            
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <FileText className="w-8 h-8 mb-4 text-blue-600" />
                <h3 className="mb-2 text-lg font-semibold">Getting Started</h3>
                <p className="mb-4 text-gray-600">Learn the basics of trading and investing</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Account setup guide</li>
                  <li>• First trade tutorial</li>
                  <li>• Platform overview</li>
                  <li>• KYC process</li>
                </ul>
              </div>
              
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <Activity className="w-8 h-8 mb-4 text-blue-600" />
                <h3 className="mb-2 text-lg font-semibold">Trading</h3>
                <p className="mb-4 text-gray-600">Everything about placing and managing orders</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Order types explained</li>
                  <li>• Market vs Limit orders</li>
                  <li>• Stop loss strategies</li>
                  <li>• Margin trading</li>
                </ul>
              </div>
              
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <Shield className="w-8 h-8 mb-4 text-blue-600" />
                <h3 className="mb-2 text-lg font-semibold">Account & Security</h3>
                <p className="mb-4 text-gray-600">Manage your account and security settings</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Password management</li>
                  <li>• Two-factor authentication</li>
                  <li>• Account verification</li>
                  <li>• Fund transfers</li>
                </ul>
              </div>
            </div>

            <div className="p-6 border border-blue-200 rounded-lg bg-blue-50">
              <h2 className="mb-4 text-xl font-bold text-blue-900">Popular Articles</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <a href="https://support.zerodha.com/category/trading-and-markets/kite-web-and-mobile/articles/how-do-i-place-an-order" target="_blank" rel="noopener noreferrer" className="block text-blue-700 transition-colors hover:text-blue-900">
                    📈 How to place your first order on Kite?
                  </a>
                  <a href="https://support.zerodha.com/category/account-opening-and-getting-started/getting-started/articles/zerodha-brokerage-charges" target="_blank" rel="noopener noreferrer" className="block text-blue-700 transition-colors hover:text-blue-900">
                    💰 Understanding Zerodha's brokerage charges
                  </a>
                  <a href="https://support.zerodha.com/category/trading-and-markets/kite-web-and-mobile/articles/how-do-i-add-instruments-to-my-watchlist" target="_blank" rel="noopener noreferrer" className="block text-blue-700 transition-colors hover:text-blue-900">
                    ⭐ Setting up and managing watchlists
                  </a>
                  <a href="https://support.zerodha.com/category/funds/adding-funds/articles/how-do-i-add-funds-to-my-trading-account" target="_blank" rel="noopener noreferrer" className="block text-blue-700 transition-colors hover:text-blue-900">
                    💳 How to add funds to your trading account?
                  </a>
                  <a href="https://support.zerodha.com/category/trading-and-markets/margin-leverage-and-product-and-order-types/articles/what-is-the-difference-between-mis-cnc-nrml-and-co-orders" target="_blank" rel="noopener noreferrer" className="block text-blue-700 transition-colors hover:text-blue-900">
                    📊 Understanding order types (MIS, CNC, NRML)
                  </a>
                </div>
                <div className="space-y-3">
                  <a href="https://support.zerodha.com/category/console/portfolio/articles/how-do-i-view-my-profit-and-loss-statement" target="_blank" rel="noopener noreferrer" className="block text-blue-700 transition-colors hover:text-blue-900">
                    📈 Portfolio analysis and P&L statements
                  </a>
                  <a href="https://support.zerodha.com/category/console/reports/articles/how-do-i-get-my-contract-notes" target="_blank" rel="noopener noreferrer" className="block text-blue-700 transition-colors hover:text-blue-900">
                    📄 Tax implications and contract notes
                  </a>
                  <a href="https://support.zerodha.com/category/trading-and-markets/kite-web-and-mobile" target="_blank" rel="noopener noreferrer" className="block text-blue-700 transition-colors hover:text-blue-900">
                    📱 Kite mobile app complete guide
                  </a>
                  <a href="https://support.zerodha.com/category/trading-and-markets/margin-leverage-and-product-and-order-types/articles/what-is-a-stop-loss-order-sl-sl-m" target="_blank" rel="noopener noreferrer" className="block text-blue-700 transition-colors hover:text-blue-900">
                    🛡️ Stop loss and risk management strategies
                  </a>
                  <a href="https://support.zerodha.com/category/trading-and-markets/kite-features/articles/what-is-gtt-good-till-triggered-orders" target="_blank" rel="noopener noreferrer" className="block text-blue-700 transition-colors hover:text-blue-900">
                    ⏰ GTT (Good Till Triggered) orders explained
                  </a>
                </div>
              </div>
              <div className="pt-4 mt-6 border-t border-blue-200">
                <h3 className="mb-3 font-semibold text-blue-900">Advanced Trading Topics</h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <a href="https://support.zerodha.com/category/trading-and-markets/margin-leverage-and-product-and-order-types" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-700 transition-colors hover:text-blue-900">
                    🔄 Margin trading and leverage explained
                  </a>
                  <a href="https://support.zerodha.com/category/trading-and-markets/kite-features/articles/what-are-basket-orders" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-700 transition-colors hover:text-blue-900">
                    🧺 Basket orders and bulk trading
                  </a>
                  <a href="https://support.zerodha.com/category/trading-and-markets/kite-features/articles/what-is-bracket-order-bo" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-700 transition-colors hover:text-blue-900">
                    📐 Bracket orders for automated trading
                  </a>
                  <a href="https://support.zerodha.com/category/trading-and-markets/kite-features/articles/what-is-cover-order-co" target="_blank" rel="noopener noreferrer" className="block text-sm text-blue-700 transition-colors hover:text-blue-900">
                    🛡️ Cover orders for risk management
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">API Documentation</h1>
            
            <div className="p-6 mb-8 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-start">
                <Code className="w-6 h-6 mt-1 mr-3 text-blue-600" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Kite Connect API</h3>
                  <p className="text-gray-600">
                    Build powerful trading applications with our comprehensive REST API. Access real-time market data, 
                    place orders, and manage portfolios programmatically.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Getting Started</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="mb-2 font-semibold text-gray-900">1. Authentication</h4>
                    <p className="text-sm text-gray-600">Set up API credentials and authentication flow</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="mb-2 font-semibold text-gray-900">2. Market Data</h4>
                    <p className="text-sm text-gray-600">Access live quotes, historical data, and market depth</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="mb-2 font-semibold text-gray-900">3. Order Management</h4>
                    <p className="text-sm text-gray-600">Place, modify, and cancel orders programmatically</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Code Examples</h2>
                <div className="p-4 text-sm text-white bg-gray-900 rounded-lg">
                  <pre>{`// Initialize Kite Connect
const KiteConnect = require("kiteconnect").KiteConnect;
const kc = new KiteConnect({
  api_key: "your_api_key"
});

// Get live quotes
kc.getQuote(["NSE:INFY", "BSE:SENSEX"])
  .then(function(response) {
    console.log(response);
  });

// Place an order
kc.placeOrder("regular", {
  exchange: "NSE",
  tradingsymbol: "INFY",
  transaction_type: "BUY",
  quantity: 1,
  product: "CNC",
  order_type: "MARKET"
});`}</pre>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">REST API</h3>
                <p className="mb-4 text-sm text-gray-600">Complete HTTP API for all trading operations</p>
                <a href="https://kite.trade/docs/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  View Documentation →
                </a>
              </div>
              
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">WebSocket</h3>
                <p className="mb-4 text-sm text-gray-600">Real-time streaming market data</p>
                <a href="https://kite.trade/docs/connect/v3/websocket/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  View Documentation →
                </a>
              </div>
              
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">SDKs</h3>
                <p className="mb-4 text-sm text-gray-600">Official libraries for Python, Node.js, Java, and more</p>
                <a href="https://kite.trade/docs/connect/v3/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Download SDKs →
                </a>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">Contact Support</h1>
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 mt-1 mr-4 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone Support</h3>
                      <p className="text-gray-600">+91 80 4040 2020</p>
                      <p className="text-sm text-gray-500">Monday to Friday, 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 mt-1 mr-4 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email Support</h3>
                      <p className="text-gray-600">support@zerodha.com</p>
                      <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 mt-1 mr-4 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Office Address</h3>
                      <p className="text-gray-600">
                        #153/154, 4th Cross, Dollars Colony,<br />
                        Opp. Clarence Public School,<br />
                        J.P Nagar 4th Phase,<br />
                        Bangalore - 560078, India
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 mt-1 mr-4 text-blue-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Send us a Message</h2>
                
                <form className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Subject</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Account Issues</option>
                      <option>Trading Questions</option>
                      <option>API Support</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your issue or question..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        );

      case 'status':
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">System Status</h1>
            
            <div className="p-6 mb-8 border border-green-200 rounded-lg bg-green-50">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800">All Systems Operational</h3>
                  <p className="text-green-700">All services are running normally</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Trading Platform</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Kite Web</span>
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Kite Mobile</span>
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Console</span>
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Operational
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">Market Data</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">NSE Feed</span>
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">BSE Feed</span>
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Operational
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">MCX Feed</span>
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Operational
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Recent Incidents</h3>
              </div>
              <div className="p-6">
                <div className="py-8 text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h4 className="mb-2 text-lg font-medium text-gray-900">No Recent Incidents</h4>
                  <p className="text-gray-600">All systems have been running smoothly</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">Privacy Policy</h1>
            
            <div className="prose max-w-none">
              <div className="p-6 mb-8 border border-blue-200 rounded-lg bg-blue-50">
                <p className="text-blue-800">
                  <strong>Last updated:</strong> January 2025
                </p>
              </div>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Information We Collect</h2>
                <div className="space-y-4 text-gray-600">
                  <p>We collect information you provide directly to us, such as when you create an account, make a transaction, or contact us for support.</p>
                  <ul className="pl-6 space-y-2 list-disc">
                    <li>Personal identification information (name, email, phone number)</li>
                    <li>Financial information (bank account details, trading history)</li>
                    <li>Technical information (IP address, browser type, device information)</li>
                    <li>Usage data (how you interact with our platform)</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">How We Use Your Information</h2>
                <div className="space-y-4 text-gray-600">
                  <p>We use the information we collect to:</p>
                  <ul className="pl-6 space-y-2 list-disc">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices and support messages</li>
                    <li>Comply with legal and regulatory requirements</li>
                    <li>Protect against fraud and unauthorized access</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Information Sharing</h2>
                <div className="space-y-4 text-gray-600">
                  <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
                  <ul className="pl-6 space-y-2 list-disc">
                    <li>With your consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and safety</li>
                    <li>With service providers who assist our operations</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Data Security</h2>
                <div className="space-y-4 text-gray-600">
                  <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                </div>
              </section>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-8 text-4xl font-bold text-gray-900">Terms of Service</h1>
            
            <div className="prose max-w-none">
              <div className="p-6 mb-8 border border-blue-200 rounded-lg bg-blue-50">
                <p className="text-blue-800">
                  <strong>Last updated:</strong> January 2025
                </p>
              </div>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
                <div className="space-y-4 text-gray-600">
                  <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Use License</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>
                  <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="pl-6 space-y-2 list-disc">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose</li>
                    <li>Attempt to reverse engineer any software</li>
                    <li>Remove any copyright or proprietary notations</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Trading Risks</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Trading in financial instruments involves substantial risk and may not be suitable for all investors. You should carefully consider your investment objectives, level of experience, and risk appetite.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Limitation of Liability</h2>
                <div className="space-y-4 text-gray-600">
                  <p>In no event shall the company or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>
                </div>
              </section>
            </div>
          </div>
        );

      case 'creator':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="mb-2 text-4xl font-bold text-gray-900">⚠️ Disclaimer & Acknowledgement 💻🌐</h1>
            </div>
            
            <div className="p-8 mb-8 border border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="mb-6 text-center">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">👨‍💻 Website Creator: Abhisek Panda</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <a 
                    href="https://abhisekpanda072.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
                  >
                    <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-medium text-gray-900">🌍 Portfolio</span>
                  </a>
                  <a 
                    href="https://github.com/abhisek2004" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
                  >
                    <ExternalLink className="w-5 h-5 mr-2 text-gray-900" />
                    <span className="font-medium text-gray-900">🐙 GitHub</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/abhisekpanda2004/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
                  >
                    <ExternalLink className="w-5 h-5 mr-2 text-blue-700" />
                    <span className="font-medium text-gray-900">💼 LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <section className="p-6 border border-yellow-200 rounded-lg bg-yellow-50">
                <h3 className="flex items-center mb-4 text-xl font-bold text-yellow-800">
                  <AlertCircle className="w-6 h-6 mr-2" />
                  🚧 Important Note
                </h3>
                <p className="leading-relaxed text-yellow-700">
                  This website has been developed as a personal learning project to sharpen my skills in full-stack web development — specifically using the <strong>MERN stack</strong>:
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
                  <div className="p-3 text-center bg-white rounded-lg">
                    <div className="font-bold text-green-600">🧠 MongoDB</div>
                    <div className="text-sm text-gray-600">Database</div>
                  </div>
                  <div className="p-3 text-center bg-white rounded-lg">
                    <div className="font-bold text-yellow-600">🚀 Express.js</div>
                    <div className="text-sm text-gray-600">Backend</div>
                  </div>
                  <div className="p-3 text-center bg-white rounded-lg">
                    <div className="font-bold text-blue-600">⚛️ React.js</div>
                    <div className="text-sm text-gray-600">Frontend</div>
                  </div>
                  <div className="p-3 text-center bg-white rounded-lg">
                    <div className="font-bold text-green-500">🛠️ Node.js</div>
                    <div className="text-sm text-gray-600">Runtime</div>
                  </div>
                </div>
              </section>

              <section className="p-6 border border-blue-200 rounded-lg bg-blue-50">
                <h3 className="mb-4 text-xl font-bold text-blue-800">🎯 Purpose of this Project</h3>
                <p className="mb-4 text-blue-700">
                  This is <strong>not an official website</strong> of any organization. I built this clone/project purely for <strong>educational and practice purposes</strong>. The main goals were:
                </p>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-start">
                    <span className="mr-2">🕷️</span>
                    <span>To explore real-world data scraping and API usage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🧩</span>
                    <span>To practice routing, dynamic UI rendering, and component design</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">📱💻</span>
                    <span>To experiment with responsive and clean UI/UX</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🏗️</span>
                    <span>To build something from scratch as a challenge</span>
                  </li>
                </ul>
              </section>

              <section className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="mb-4 text-xl font-bold text-gray-800">📊 About the Content</h3>
                <div className="space-y-3 text-gray-700">
                  <p>Any data, media, or design inspiration used in this project is solely for demonstration and learning.</p>
                  <p>❌ I <strong>do not claim any ownership</strong> over external assets, nor is the content used commercially.</p>
                  <p>🔗 All third-party references belong to their respective owners.</p>
                </div>
              </section>

              <section className="p-6 border border-red-200 rounded-lg bg-red-50">
                <h3 className="mb-4 text-xl font-bold text-red-800">🚫 No Affiliation Notice</h3>
                <p className="text-red-700">
                  This site is <strong>not affiliated with, endorsed by, or officially connected to any company or organization</strong>. 
                  It is a <strong>fan-made or personal demo</strong> and a <strong>portfolio piece</strong> meant to showcase my skills.
                </p>
              </section>

              <section className="p-6 border border-purple-200 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                <h3 className="mb-4 text-xl font-bold text-purple-800">🧠 Calling Developers, Learners & Recruiters!</h3>
                <p className="mb-4 text-purple-700">If you're into:</p>
                <div className="grid grid-cols-1 gap-3 mb-4 md:grid-cols-2">
                  <div className="flex items-center text-purple-700">
                    <span className="mr-2">✨</span>
                    <span>Learning MERN stack</span>
                  </div>
                  <div className="flex items-center text-purple-700">
                    <span className="mr-2">🧪</span>
                    <span>Working with real-time data & APIs</span>
                  </div>
                  <div className="flex items-center text-purple-700">
                    <span className="mr-2">📦</span>
                    <span>Exploring frontend/backend architecture</span>
                  </div>
                  <div className="flex items-center text-purple-700">
                    <span className="mr-2">🤝</span>
                    <span>Collaborating on open-source projects</span>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="font-medium text-purple-800">
                    📬 <strong>Let's connect!</strong> Check out more on my GitHub or message me on LinkedIn. 
                    Always up for feedback, collaboration, or just geeking out on tech!
                  </p>
                </div>
              </section>

              <div className="p-6 text-center text-white rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                <p className="text-xl font-bold">☕💡💻 <em>This project = Code + Coffee + Curiosity</em></p>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center text-blue-600 transition-colors hover:text-blue-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </button>
            <div className="flex items-center">
              <img 
                src="https://zerodha.com/static/images/logo.svg" 
                alt="Zerodha" 
                className="w-auto h-8"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default SupportPages;