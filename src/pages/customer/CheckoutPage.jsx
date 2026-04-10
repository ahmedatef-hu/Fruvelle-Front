import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import api from '../../config/api';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customer_name || !formData.customer_phone || !formData.customer_address) {
      toast.error('يرجى إدخال جميع البيانات المطلوبة');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        ...formData,
        items: items.map((item) => ({
          product_id: item.id,
          product_name: item.name_ar,
          quantity: item.quantity,
          price: item.price,
        })),
        total_price: getTotal(),
      };

      const response = await api.post('/orders', orderData);
      
      if (response.data.success) {
        clearCart();
        toast.success('تم إرسال طلبك بنجاح!');
        navigate(`/order-confirmation/${response.data.data.id}`);
      }
    } catch (error) {
      toast.error('حدث خطأ في إرسال الطلب');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 py-8">
      <h1 className="text-3xl font-bold mb-8">إتمام الطلب</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="card">
            <h2 className="text-xl font-bold mb-6">معلومات التوصيل</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">الاسم الكامل *</label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">رقم الهاتف *</label>
                <input
                  type="tel"
                  name="customer_phone"
                  value={formData.customer_phone}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">العنوان الكامل *</label>
                <textarea
                  name="customer_address"
                  value={formData.customer_address}
                  onChange={handleChange}
                  className="input-field"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">ملاحظات (اختياري)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="input-field"
                  rows="2"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6"
            >
              {loading ? 'جاري الإرسال...' : 'تأكيد الطلب'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card">
            <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>

            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name_ar} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    {(item.price * item.quantity).toFixed(2)} جنيه
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>الإجمالي</span>
              <span className="text-primary-600">{getTotal().toFixed(2)} جنيه</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
