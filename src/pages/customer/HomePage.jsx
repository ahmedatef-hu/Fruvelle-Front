import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../../config/api';
import ProductCard from '../../components/customer/ProductCard';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    // Scroll Animation Observer - runs after products are loaded
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    setTimeout(() => {
      const animateElements = document.querySelectorAll('.scroll-animate');
      animateElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [featuredProducts, loading]); // Re-run when products change

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products?featured=true');
      setFeaturedProducts(response.data.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-screen w-full">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://mickey-shop.com/cdn/shop/files/71ef0af2-e37b-4a41-aa46-fcdc642bec27.jpg?v=1768105461)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-8">
            {/* Badge */}
            <div className="inline-block">
              <span className="bg-white/20 backdrop-blur-md border-2 border-white/30 text-white px-4 py-1.5 sm:px-8 sm:py-3 rounded-full text-sm sm:text-lg font-bold shadow-2xl">
                ✨ منتجات طبيعية 100%
              </span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-2 sm:space-y-5">
              <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
                مرحباً بك في
              </h1>
              <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-green-400">
                  Fruvelle
                </span>
              </h2>
            </div>
            
            {/* Description */}
            <p className="text-base sm:text-2xl md:text-3xl text-white/95 leading-relaxed font-semibold max-w-4xl mx-auto px-4 sm:px-0">
              اكتشف أجود أنواع الفواكه المجففة، الكاندي، المارشميلو والسناكس الطبيعية
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center pt-4 sm:pt-6">
              <Link 
                to="/products" 
                className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 sm:px-12 sm:py-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-2xl shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  🛍️ تصفح المنتجات
                  <span className="group-hover:translate-x-2 transition-transform">←</span>
                </span>
              </Link>
              <Link 
                to="/products?category=1" 
                className="group bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-6 py-3 sm:px-12 sm:py-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-2xl shadow-2xl hover:bg-white/20 hover:border-white/50 transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  🍇 فواكه مجففة
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Quick Access */}
      <section className="w-full overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 relative z-30">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
            تسوق الآن
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-800 mb-4">
            تسوق حسب الفئة
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            اختر الفئة المفضلة لديك
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link to="/products?category=1" className="scroll-animate from-left group bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl hover:shadow-orange-500/30 transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 border-2 border-orange-200 hover:border-orange-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-orange-500/0 group-hover:from-orange-400/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
            <div className="text-7xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10">🍇</div>
            <h3 className="font-bold text-gray-800 text-lg relative z-10 group-hover:text-orange-600 transition-colors">فواكه مجففة</h3>
          </Link>
          <Link to="/products?category=2" className="scroll-animate from-bottom group bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl hover:shadow-pink-500/30 transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 border-2 border-pink-200 hover:border-pink-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/0 to-pink-500/0 group-hover:from-pink-400/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
            <div className="text-7xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10">🍬</div>
            <h3 className="font-bold text-gray-800 text-lg relative z-10 group-hover:text-pink-600 transition-colors">كاندي مجفف</h3>
          </Link>
          <Link to="/products?category=3" className="scroll-animate from-bottom group bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl hover:shadow-purple-500/30 transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 border-2 border-purple-200 hover:border-purple-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-purple-500/0 group-hover:from-purple-400/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
            <div className="text-7xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10">🍡</div>
            <h3 className="font-bold text-gray-800 text-lg relative z-10 group-hover:text-purple-600 transition-colors">مارشميلو</h3>
          </Link>
          <Link to="/products?category=4" className="scroll-animate from-right group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl hover:shadow-yellow-500/30 transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 border-2 border-yellow-200 hover:border-yellow-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-500/0 group-hover:from-yellow-400/10 group-hover:to-yellow-500/10 transition-all duration-500"></div>
            <div className="text-7xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10">🍿</div>
            <h3 className="font-bold text-gray-800 text-lg relative z-10 group-hover:text-yellow-600 transition-colors">سناكس مجففة</h3>
          </Link>
        </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20">
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
            منتجاتنا المميزة
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-gray-800 mb-4">
            الأكثر مبيعاً
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            اختيارات عملائنا المفضلة
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-16 relative">
          {/* Background Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-r from-orange-400 via-pink-400 to-green-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          </div>
          
          <Link 
            to="/products" 
            className="group relative inline-flex items-center gap-3 overflow-visible"
          >
            {/* Multiple Glow Layers */}
            <div className="absolute -inset-6 bg-gradient-to-r from-orange-400 via-pink-400 to-green-400 rounded-3xl opacity-0 group-hover:opacity-60 blur-3xl transition-all duration-700 animate-pulse"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 via-pink-500 to-green-500 rounded-2xl opacity-0 group-hover:opacity-80 blur-2xl transition-all duration-500"></div>
            
            {/* Button Container */}
            <div className="relative">
              {/* 3D Shadow */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-pink-700 to-green-700 rounded-2xl transform translate-y-2 opacity-50 group-hover:translate-y-3 transition-transform duration-300"></div>
              
              {/* Main Button */}
              <div className="relative bg-gradient-to-r from-orange-500 via-pink-500 to-green-500 text-white px-6 py-3 sm:px-12 sm:py-6 rounded-xl sm:rounded-2xl font-black text-base sm:text-2xl shadow-2xl transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 border-2 sm:border-4 border-white/40 group-hover:border-white/60">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
                
                {/* Shine Sweep Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-2xl">
                  <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform skew-x-12 group-hover:left-full transition-all duration-1000"></div>
                </div>
                
                {/* Content */}
                <span className="relative flex items-center gap-2 sm:gap-4 drop-shadow-lg">
                  <span className="text-xl sm:text-3xl group-hover:rotate-12 transition-transform duration-300">✨</span>
                  عرض جميع المنتجات
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 group-hover:translate-x-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l-5 5 5 5" />
                  </svg>
                </span>
                
                {/* Inner Glow Pulse */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                {/* Corner Highlights */}
                <div className="absolute top-2 right-2 w-4 h-4 bg-white/60 rounded-full blur-sm"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 bg-white/60 rounded-full blur-sm"></div>
              </div>
            </div>
            
            {/* Floating Sparkles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute top-1/2 -right-4 w-3 h-3 bg-pink-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.4s' }}></div>
            <div className="absolute top-1/2 -left-4 w-3 h-3 bg-orange-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.6s' }}></div>
          </Link>
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20 w-full overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <span className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
              مميزاتنا
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-800 mb-4">
              لماذا Fruvelle؟
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              نقدم لك أفضل تجربة تسوق
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 - Quality */}
            <div className="scroll-animate from-left group bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl hover:shadow-green-500/30 transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 border-2 border-green-200 hover:border-green-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-500/0 group-hover:from-green-400/10 group-hover:to-green-500/10 transition-all duration-500"></div>
              <div className="text-7xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10">✓</div>
              <h3 className="font-bold text-gray-800 text-xl mb-3 relative z-10 group-hover:text-green-600 transition-colors">جودة عالية</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">منتجات طبيعية 100% بأعلى معايير الجودة والنظافة</p>
            </div>
            
            {/* Feature 2 - Delivery */}
            <div className="scroll-animate from-bottom group bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl hover:shadow-orange-500/30 transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 border-2 border-orange-200 hover:border-orange-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-orange-500/0 group-hover:from-orange-400/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
              <div className="text-7xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10">🚚</div>
              <h3 className="font-bold text-gray-800 text-xl mb-3 relative z-10 group-hover:text-orange-600 transition-colors">توصيل سريع</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">نوصل طلبك إلى باب منزلك بسرعة وأمان في جميع المحافظات</p>
            </div>
            
            {/* Feature 3 - Price */}
            <div className="scroll-animate from-right group bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl hover:shadow-pink-500/30 transform hover:scale-110 hover:-translate-y-3 transition-all duration-500 border-2 border-pink-200 hover:border-pink-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/0 to-pink-500/0 group-hover:from-pink-400/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
              <div className="text-7xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10">💰</div>
              <h3 className="font-bold text-gray-800 text-xl mb-3 relative z-10 group-hover:text-pink-600 transition-colors">أسعار مناسبة</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">أفضل الأسعار مع عروض وخصومات مستمرة على جميع المنتجات</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
