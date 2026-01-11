
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MORO
              </span>
              <span className="hidden sm:inline text-slate-400 font-medium">Digital Agency</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-blue-500'
                  } px-1 py-4 text-sm font-medium transition-colors`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link
              to="/pricing"
              className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">MORO AGENCY</h3>
              <p className="text-sm">Building the future of digital automation, web experiences, and visual storytelling.</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
              <p className="text-sm">support@moroagency.com</p>
              <p className="text-sm">+959 759528404</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Hours</h3>
              <p className="text-sm">Mon-Fri: 9AM - 6PM</p>
              <p className="text-sm">Saturday: 9AM - 1PM</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-xs">
            © {new Date().getFullYear()} Moro Digital Agency. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
