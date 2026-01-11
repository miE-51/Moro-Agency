
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import { PRICING_DATA, PORTFOLIO_DATA, PAYMENT_METHODS } from './constants';
import { ServiceType, Order, OrderStatus, PaymentStatus } from './types';
import { generateQuoteAssistance } from './services/geminiService';

// --- Page Components ---

const Home = () => (
  <div className="py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Modern Solutions for your <br/>
          <span className="text-blue-600">Digital Business</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          From AI-powered Telegram bots to high-converting websites and cinematic video ads. We bring your vision to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-6">🤖</div>
          <h3 className="text-xl font-bold mb-3">Bot Development</h3>
          <p className="text-slate-600 mb-4">Custom automation for Telegram, FB, and WhatsApp. AI integrations that work.</p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>• Auto-reply Systems</li>
            <li>• Payment Gateway Bot</li>
            <li>• Database & CRM Bot</li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-2xl mb-6">🌐</div>
          <h3 className="text-xl font-bold mb-3">Web Development</h3>
          <p className="text-slate-600 mb-4">Scalable, responsive, and SEO-friendly websites. E-commerce experts.</p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>• Modern Landing Pages</li>
            <li>• Custom Dashboards</li>
            <li>• E-commerce Stores</li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-2xl mb-6">🎬</div>
          <h3 className="text-xl font-bold mb-3">Video Production</h3>
          <p className="text-slate-600 mb-4">High-impact motion graphics and editing that converts viewers to customers.</p>
          <ul className="text-sm text-slate-500 space-y-2">
            <li>• Social Media Ads</li>
            <li>• YouTube Pro Editing</li>
            <li>• Product Explainer Videos</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const Portfolio = () => (
  <div className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8">Our Work Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PORTFOLIO_DATA.map(item => (
          <div key={item.id} className="group rounded-xl overflow-hidden border border-slate-100 bg-white">
            <div className="relative h-48 bg-slate-200 overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-slate-700">
                {item.category}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{item.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {item.technologies.map(tech => (
                  <span key={tech} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded uppercase font-bold">{tech}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-yellow-400">{'★'.repeat(item.rating)}</div>
                {item.demoLink && (
                  <a href={item.demoLink} className="text-blue-600 text-sm font-semibold hover:underline">View Live</a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Pricing = ({ addOrder }: { addOrder: (o: Order) => void }) => {
  const [requirements, setRequirements] = useState('');
  const [aiAssistant, setAiAssistant] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleAiConsult = async () => {
    if (!requirements.trim()) return;
    setIsGenerating(true);
    const result = await generateQuoteAssistance(requirements);
    setAiAssistant(result || "Could not generate assistance.");
    setIsGenerating(false);
  };

  const handleQuickOrder = (p: typeof PRICING_DATA[0]) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'user1',
      type: p.type,
      requirements: p.name,
      amount: p.basePrice,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.UNPAID,
      createdAt: new Date().toISOString()
    };
    addOrder(newOrder);
    alert(`Order for ${p.name} created! Redirecting to Admin to manage.`);
    navigate('/admin');
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-3xl p-8 sm:p-12 mb-16 text-white overflow-hidden relative shadow-2xl shadow-blue-200">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">AI Quote Assistant</h2>
            <p className="mb-6 opacity-90">Describe your project in a few sentences, and our Gemini AI will analyze your needs.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Ex: I need a Telegram bot that can handle KPay payments for my online pizza store..."
                className="flex-grow bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                onClick={handleAiConsult}
                disabled={isGenerating}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {isGenerating ? 'Analyzing...' : 'Get AI Advice'}
              </button>
            </div>
            {aiAssistant && (
              <div className="mt-8 p-6 bg-white/10 backdrop-blur rounded-2xl border border-white/20 text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-3 text-blue-200 font-bold uppercase tracking-widest text-[10px]">
                  <span className="w-2 h-2 bg-blue-200 rounded-full animate-pulse"></span>
                  Gemini Proposal
                </div>
                {aiAssistant}
              </div>
            )}
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        </div>

        <h3 className="text-2xl font-bold mb-8">Standard Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRICING_DATA.map(p => (
            <div key={p.id} className="bg-white p-8 rounded-2xl border border-slate-100 flex flex-col hover:border-blue-200 transition-colors">
              <div className="mb-6">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">{p.type}</span>
                <h4 className="text-xl font-bold mt-2">{p.name}</h4>
                <div className="flex items-baseline mt-4">
                  <span className="text-3xl font-bold">{p.basePrice.toLocaleString()}</span>
                  <span className="text-slate-500 ml-1 text-sm">MMK / {p.unit}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {p.features.map(f => (
                  <li key={f} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-green-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleQuickOrder(p)}
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Choose Package
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Admin = ({ orders, updateOrder }: { orders: Order[], updateOrder: (id: string, updates: Partial<Order>) => void }) => {
  const [stats, setStats] = useState({ total: 0, revenue: 0, pending: 0 });

  useEffect(() => {
    const total = orders.length;
    const revenue = orders.filter(o => o.paymentStatus === PaymentStatus.PAID).reduce((sum, o) => sum + o.amount, 0);
    const pending = orders.filter(o => o.status === OrderStatus.PENDING).length;
    setStats({ total, revenue, pending });
  }, [orders]);

  return (
    <div className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8">Agency Dashboard</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium mb-1">Total Orders</p>
            <p className="text-4xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium mb-1">Revenue (MMK)</p>
            <p className="text-4xl font-bold">{stats.revenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm font-medium mb-1">Pending Orders</p>
            <p className="text-4xl font-bold text-orange-500">{stats.pending}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{order.id}</td>
                    <td className="px-6 py-4 font-medium">{order.requirements}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        order.status === OrderStatus.COMPLETED ? 'bg-green-100 text-green-700' : 
                        order.status === OrderStatus.PENDING ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.paymentStatus} 
                        onChange={(e) => updateOrder(order.id, { paymentStatus: e.target.value as PaymentStatus })}
                        className="bg-transparent border-none p-0 focus:ring-0 cursor-pointer text-xs font-semibold text-slate-600"
                      >
                        <option value={PaymentStatus.UNPAID}>Unpaid</option>
                        <option value={PaymentStatus.PAID}>Paid</option>
                        <option value={PaymentStatus.PENDING}>Verifying</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">{order.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => updateOrder(order.id, { status: OrderStatus.COMPLETED })}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Complete
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">No orders found. Create one in the Pricing page.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => setOrders(prev => [order, ...prev]);
  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing addOrder={addOrder} />} />
          <Route path="/admin" element={<Admin orders={orders} updateOrder={updateOrder} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
