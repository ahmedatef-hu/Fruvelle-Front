import { useEffect, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import api from '../../config/api';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = async () => {
    try {
      let url = '/orders';
      if (filterStatus) url += `?status=${filterStatus}`;
      
      const response = await api.get(url);
      setOrders(response.data.data);
    } catch (error) {
      toast.error('حدث خطأ في جلب الطلبات');
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      setSelectedOrder(response.data.data);
      setShowModal(true);
    } catch (error) {
      toast.error('حدث خطأ في جلب تفاصيل الطلب');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      toast.success('تم تحديث حالة الطلب');
      fetchOrders();
      if (selectedOrder?.id === orderId) {
        fetchOrderDetails(orderId);
      }
    } catch (error) {
      toast.error('حدث خطأ في تحديث حالة الطلب');
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: 'قيد الانتظار', color: 'bg-yellow-100 text-yellow-700' },
      confirmed: { label: 'مؤكد', color: 'bg-blue-100 text-blue-700' },
      shipped: { label: 'تم الشحن', color: 'bg-purple-100 text-purple-700' },
      delivered: { label: 'تم التوصيل', color: 'bg-green-100 text-green-700' },
      cancelled: { label: 'ملغي', color: 'bg-red-100 text-red-700' },
    };

    const statusInfo = statusMap[status] || statusMap.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">إدارة الطلبات</h1>

      {/* Filter */}
      <div className="card mb-6">
        <select
          className="input-field"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">جميع الطلبات</option>
          <option value="pending">قيد الانتظار</option>
          <option value="confirmed">مؤكد</option>
          <option value="shipped">تم الشحن</option>
          <option value="delivered">تم التوصيل</option>
          <option value="cancelled">ملغي</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-right p-3">رقم الطلب</th>
              <th className="text-right p-3">اسم العميل</th>
              <th className="text-right p-3">الهاتف</th>
              <th className="text-right p-3">المبلغ</th>
              <th className="text-right p-3">الحالة</th>
              <th className="text-right p-3">التاريخ</th>
              <th className="text-right p-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3">#{order.id}</td>
                <td className="p-3">{order.customer_name}</td>
                <td className="p-3">{order.customer_phone}</td>
                <td className="p-3">{order.total_price} جنيه</td>
                <td className="p-3">{getStatusBadge(order.status)}</td>
                <td className="p-3">{new Date(order.created_at).toLocaleDateString('ar-SA')}</td>
                <td className="p-3">
                  <button
                    onClick={() => fetchOrderDetails(order.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEye className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">تفاصيل الطلب #{selectedOrder.id}</h2>

            {/* Customer Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">معلومات العميل</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><span className="font-semibold">الاسم:</span> {selectedOrder.customer_name}</p>
                <p><span className="font-semibold">الهاتف:</span> {selectedOrder.customer_phone}</p>
                <p><span className="font-semibold">العنوان:</span> {selectedOrder.customer_address}</p>
                {selectedOrder.notes && (
                  <p><span className="font-semibold">ملاحظات:</span> {selectedOrder.notes}</p>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">المنتجات</h3>
              <div className="space-y-2">
                {selectedOrder.items?.map((item) => (
                  <div key={item.id} className="flex justify-between bg-gray-50 p-3 rounded-lg">
                    <span>{item.product_name} × {item.quantity}</span>
                    <span className="font-semibold">{(item.price * item.quantity).toFixed(2)} جنيه</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between text-lg font-bold">
                <span>الإجمالي</span>
                <span className="text-primary-600">{selectedOrder.total_price} جنيه</span>
              </div>
            </div>

            {/* Status Update */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">تحديث الحالة</h3>
              <select
                className="input-field"
                value={selectedOrder.status}
                onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
              >
                <option value="pending">قيد الانتظار</option>
                <option value="confirmed">مؤكد</option>
                <option value="shipped">تم الشحن</option>
                <option value="delivered">تم التوصيل</option>
                <option value="cancelled">ملغي</option>
              </select>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="btn-primary w-full"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
