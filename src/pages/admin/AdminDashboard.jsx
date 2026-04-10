import { useEffect, useState } from 'react';
import { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp } from 'react-icons/fi';
import api from '../../config/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    topProducts: [],
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-4 rounded-full ${color}`}>
          <Icon className="text-2xl text-white" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FiDollarSign}
          title="إجمالي المبيعات"
          value={`${stats.totalSales.toFixed(2)} جنيه`}
          color="bg-green-500"
        />
        <StatCard
          icon={FiShoppingBag}
          title="إجمالي الطلبات"
          value={stats.totalOrders}
          color="bg-blue-500"
        />
        <StatCard
          icon={FiUsers}
          title="إجمالي العملاء"
          value={stats.totalUsers}
          color="bg-purple-500"
        />
        <StatCard
          icon={FiTrendingUp}
          title="المنتجات الأكثر مبيعاً"
          value={stats.topProducts.length}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">المنتجات الأكثر مبيعاً</h2>
          <div className="space-y-3">
            {stats.topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={product.images?.[0] || '/placeholder.jpg'}
                  alt={product.name_ar}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{product.name_ar}</p>
                  <p className="text-sm text-gray-600">مبيعات: {product.total_sold}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">أحدث الطلبات</h2>
          <div className="space-y-3">
            {stats.recentOrders.map((order) => (
              <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">طلب #{order.id}</span>
                  <span className="text-primary-600 font-bold">{order.total_price} جنيه</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{order.customer_name}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {order.status === 'pending' ? 'قيد الانتظار' :
                     order.status === 'confirmed' ? 'مؤكد' :
                     order.status === 'shipped' ? 'تم الشحن' : 'تم التوصيل'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
