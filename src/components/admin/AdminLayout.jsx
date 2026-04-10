import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiPackage, FiShoppingBag, FiUsers, FiLogOut } from 'react-icons/fi';
import useAuthStore from '../../store/authStore';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', icon: FiHome, label: 'لوحة التحكم' },
    { path: '/admin/products', icon: FiPackage, label: 'المنتجات' },
    { path: '/admin/orders', icon: FiShoppingBag, label: 'الطلبات' },
    { path: '/admin/users', icon: FiUsers, label: 'المستخدمين' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-primary-600">Fruvelle</h1>
          <p className="text-sm text-gray-600 mt-1">لوحة التحكم</p>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="text-xl" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t">
          <div className="mb-3">
            <p className="text-sm text-gray-600">مرحباً،</p>
            <p className="font-semibold">{user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full"
          >
            <FiLogOut />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
