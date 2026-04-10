import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useState } from 'react';
import useCartStore from '../../store/cartStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const itemsCount = useCartStore((state) => state.getItemsCount());
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname + location.search === path;
  };

  const categories = [
    { id: 1, name: 'فواكه مجففة', emoji: '🍇', path: '/products?category=1' },
    { id: 2, name: 'كاندي مجفف', emoji: '🍬', path: '/products?category=2' },
    { id: 3, name: 'مارشميلو', emoji: '🍡', path: '/products?category=3' },
    { id: 4, name: 'سناكس مجففة', emoji: '🍿', path: '/products?category=4' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Right Side */}
          <Link 
            to="/" 
            className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300"
          >
            <img 
              src="/Fruvelle Logo.png" 
              alt="Fruvelle" 
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-primary-500 text-white shadow-md' 
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              الرئيسية
            </Link>
            {categories.map((cat) => (
              <Link 
                key={cat.id}
                to={cat.path}
                className={`px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive(cat.path)
                    ? 'bg-primary-500 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>

          {/* Account & Cart - Left Side */}
          <div className="hidden lg:flex items-center gap-3">
            <Link 
              to="/account" 
              className="relative group"
            >
              <div className="bg-gradient-to-br from-gray-600 to-gray-700 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
                <FiUser className="text-xl text-white" />
              </div>
            </Link>
            <Link 
              to="/cart" 
              className="relative group"
            >
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
                <FiShoppingCart className="text-xl text-white" />
              </div>
              {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                  {itemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-fadeIn">
            <div className="bg-gray-50 rounded-xl shadow-inner p-3 space-y-1">
              <Link
                to="/"
                className={`block py-3 px-4 rounded-lg transition font-semibold ${
                  isActive('/') 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-700 hover:bg-white hover:text-primary-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                🏠 الرئيسية
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={cat.path}
                  className={`block py-3 px-4 rounded-lg transition font-semibold ${
                    isActive(cat.path)
                      ? 'bg-primary-500 text-white' 
                      : 'text-gray-700 hover:bg-white hover:text-primary-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 mt-2 pt-2 space-y-1">
                <Link
                  to="/account"
                  className="block py-3 px-4 text-gray-700 hover:bg-white hover:text-primary-600 rounded-lg transition font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  👤 حسابي
                </Link>
                <Link
                  to="/cart"
                  className="block py-3 px-4 text-gray-700 hover:bg-white hover:text-primary-600 rounded-lg transition font-semibold flex items-center justify-between"
                  onClick={() => setIsOpen(false)}
                >
                  <span>🛒 السلة</span>
                  {itemsCount > 0 && (
                    <span className="bg-orange-500 text-white text-xs font-bold rounded-full px-3 py-1">
                      {itemsCount}
                        </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
