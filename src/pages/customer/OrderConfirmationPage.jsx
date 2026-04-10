import { Link, useParams } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <FiCheckCircle className="text-6xl text-green-500 mx-auto" />
        </div>

        <h1 className="text-3xl font-bold mb-4">تم استلام طلبك بنجاح!</h1>
        
        <p className="text-gray-600 mb-2">رقم الطلب: #{orderId}</p>
        
        <p className="text-lg text-gray-700 mb-8">
          شكراً لك! سنتواصل معك قريباً لتأكيد الطلب وترتيب التوصيل.
        </p>

        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary">
            العودة للرئيسية
          </Link>
          <Link to="/products" className="btn-outline">
            تصفح المزيد
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
