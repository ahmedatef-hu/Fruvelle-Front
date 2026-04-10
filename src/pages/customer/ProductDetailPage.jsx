import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi';
import api from '../../config/api';
import useCartStore from '../../store/cartStore';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('حدث خطأ في تحميل المنتج');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success('تمت الإضافة إلى السلة');
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
          </div>
          <p className="mt-4 text-gray-600 font-semibold">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-800">المنتج غير موجود</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-[10%] w-96 h-96 bg-gradient-to-br from-orange-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 left-[15%] w-[500px] h-[500px] bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative group mb-6">
              {/* Glow Effects */}
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-3xl opacity-0 group-hover:opacity-50 blur-2xl transition-all duration-700"></div>
              
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white via-orange-50/50 to-pink-50/50 shadow-2xl border-2 border-orange-200/50">
                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent transform skew-x-12 group-hover:left-full transition-all duration-1000"></div>
                </div>
                
                <img
                  src={product.images?.[selectedImage] || 'https://via.placeholder.com/600x400/f97316/ffffff?text=Fruvelle'}
                  alt={product.name_ar}
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400/f97316/ffffff?text=Fruvelle';
                  }}
                />
                
                {/* Corner Sparkles */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 justify-center">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative group/thumb w-24 h-24 rounded-2xl overflow-hidden transition-all duration-300 ${
                      selectedImage === index 
                        ? 'ring-4 ring-orange-500 scale-110' 
                        : 'ring-2 ring-gray-300 hover:ring-orange-300'
                    }`}
                  >
                    {selectedImage === index && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl blur-md opacity-75"></div>
                    )}
                    <img 
                      src={image} 
                      alt="" 
                      className="relative w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100/f97316/ffffff?text=Fruvelle';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="relative">
            {/* Card Container */}
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-orange-100/50">
              {/* Decorative Top Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-t-3xl"></div>
              
              {/* Floating Orbs Inside Card */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-pink-200/20 rounded-full blur-2xl"></div>
              
              {/* Title */}
              <h1 className="relative text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                {product.name_ar}
              </h1>
              
              {/* Price */}
              <div className="relative inline-block mb-6">
                <div className="absolute -inset-3 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-2xl shadow-xl">
                  <span className="text-3xl font-black">{product.price}</span>
                  <span className="text-lg font-bold mr-2">جنيه</span>
                </div>
              </div>

              {/* Info Row */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {/* Category Badge */}
                {product.category_name && (
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold border border-orange-200">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                    {product.category_name}
                  </span>
                )}

                {/* Weight Badge */}
                {product.weight && (
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold border border-purple-200">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    {product.weight}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="relative mb-6 p-5 bg-gradient-to-br from-orange-50/80 to-pink-50/80 rounded-2xl border border-orange-100/50 backdrop-blur-sm">
                <p className="relative text-gray-700 leading-relaxed text-base">{product.description_ar}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-gray-700 font-bold">الكمية:</span>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-pink-400 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative flex items-center bg-white border-2 border-orange-200 rounded-xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-orange-50 transition-colors text-orange-600"
                    >
                      <FiMinus className="text-lg" />
                    </button>
                    <span className="px-6 py-2 text-xl font-black text-gray-800 border-x-2 border-orange-200 bg-gradient-to-r from-orange-50/50 to-pink-50/50 min-w-[60px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-orange-50 transition-colors text-orange-600"
                    >
                      <FiPlus className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart} 
                className="relative w-full group/btn overflow-hidden"
              >
                {/* Multi-layer Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-2xl blur-xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-300"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-pink-300 rounded-2xl blur opacity-50 group-hover/btn:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                
                {/* Button */}
                <div className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white px-6 py-4 rounded-2xl transition-all duration-300 transform group-hover/btn:scale-[1.02] shadow-2xl flex items-center justify-center gap-3">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/btn:opacity-100 transform -translate-x-full group-hover/btn:translate-x-full transition-all duration-700"></div>
                  
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                  
                  <FiShoppingCart className="text-xl relative z-10" />
                  <span className="text-lg font-black relative z-10">أضف إلى السلة</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
