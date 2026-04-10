import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import useCartStore from '../../store/cartStore';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">السلة فارغة</h2>
        <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات بعد</p>
        <Link to="/products" className="btn-primary inline-block">
          تصفح المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 py-8">
      <h1 className="text-3xl font-bold mb-8">سلة التسوق</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card flex gap-4">
                <img
                  src={item.images?.[0] || '/placeholder.jpg'}
                  alt={item.name_ar}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{item.name_ar}</h3>
                  <p className="text-primary-600 font-bold mb-2">{item.price} جنيه</p>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <FiMinus />
                    </button>
                    <span className="px-4 py-1 border border-gray-300 rounded">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                  <p className="text-lg font-bold">
                    {(item.price * item.quantity).toFixed(2)} جنيه
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="card sticky top-20">
            <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي</span>
                <span className="font-semibold">{getTotal().toFixed(2)} جنيه</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">التوصيل</span>
                <span className="font-semibold">مجاني</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>الإجمالي</span>
                <span className="text-primary-600">{getTotal().toFixed(2)} جنيه</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full"
            >
              إتمام الطلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
