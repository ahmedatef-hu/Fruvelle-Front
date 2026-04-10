import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../config/api';
import ProductCard from '../../components/customer/ProductCard';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortOrder, setSortOrder] = useState('default');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    sortProducts();
  }, [sortOrder, allProducts]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = '/products?';
      if (selectedCategory) url += `category=${selectedCategory}`;
      
      const response = await api.get(url);
      setAllProducts(response.data.data);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortProducts = () => {
    let sorted = [...allProducts];
    
    switch(sortOrder) {
      case 'highToLow':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'lowToHigh':
        sorted.sort((a, b) => a.price - b.price);
        break;
      default:
        sorted = allProducts;
    }
    
    setProducts(sorted);
  };

  const getCategoryInfo = () => {
    const categoryId = parseInt(selectedCategory);
    const categoryMap = {
      1: { 
        name: 'فواكه مجففة', 
        emoji: '🍇',
        color: 'from-orange-500 to-orange-600', 
        description: 'أجود أنواع الفواكه المجففة الطبيعية' 
      },
      2: { 
        name: 'كاندي مجفف', 
        emoji: '🍬',
        color: 'from-pink-500 to-pink-600', 
        description: 'كاندي مجفف لذيذ ومميز' 
      },
      3: { 
        name: 'مارشميلو', 
        emoji: '🍡',
        color: 'from-purple-500 to-purple-600', 
        description: 'مارشميلو طري ولذيذ' 
      },
      4: { 
        name: 'سناكس مجففة', 
        emoji: '🍿',
        color: 'from-yellow-500 to-yellow-600', 
        description: 'سناكس مجففة صحية ولذيذة' 
      }
    };
    
    return categoryMap[categoryId] || { 
      name: 'جميع المنتجات', 
      emoji: '🛍️',
      color: 'from-orange-500 to-orange-600', 
      description: 'اكتشف مجموعتنا الكاملة من المنتجات الطبيعية' 
    };
  };

  const categoryInfo = getCategoryInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Floating Orbs */}
        <div className="absolute top-20 right-[10%] w-96 h-96 bg-gradient-to-br from-orange-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 left-[15%] w-[500px] h-[500px] bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute top-[10%] left-[20%] w-3 h-3 bg-orange-300/60 rounded-full animate-bounce" style={{ animationDuration: '3s', animationDelay: '0s' }}></div>
        <div className="absolute top-[30%] right-[25%] w-2 h-2 bg-pink-300/60 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
        <div className="absolute top-[60%] left-[30%] w-2.5 h-2.5 bg-purple-300/60 rounded-full animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}></div>
        <div className="absolute top-[80%] right-[40%] w-2 h-2 bg-orange-300/60 rounded-full animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}></div>
        <div className="absolute top-[40%] right-[15%] w-3 h-3 bg-pink-300/60 rounded-full animate-bounce" style={{ animationDuration: '3.8s', animationDelay: '0.8s' }}></div>
        
        {/* Decorative Patterns */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Gradient Waves */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-300/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-300/50 to-transparent"></div>
      </div>
      {/* Hero Section */}
      <div className={`relative bg-gradient-to-br ${categoryInfo.color} text-white py-12 overflow-hidden`}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-10 right-[10%] w-48 h-48 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-[15%] w-64 h-64 bg-white/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Icon Container */}
            <div className="relative inline-flex items-center justify-center mb-4 w-52 h-52">
              {/* Outer Rotating Ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-[3px] border-white/50 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
              </div>
              
              {/* Middle Rotating Ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 border-[3px] border-white/40 border-t-transparent border-r-transparent rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
              </div>
              
              {/* Inner Rotating Ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-[2px] border-white/30 border-b-transparent rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 bg-white/10 rounded-full blur-xl animate-pulse"></div>
              </div>
              
              {/* Icon Background */}
              <div className="relative w-28 h-28 bg-white/25 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-300 border border-white/30">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl"></div>
                <div className="text-6xl relative z-10 drop-shadow-lg">
                  {categoryInfo.emoji}
                </div>
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
              <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                {categoryInfo.name}
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-base md:text-lg text-white/90 font-medium max-w-xl mx-auto leading-relaxed">
              {categoryInfo.description}
            </p>

            {/* Decorative Elements */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-8 fill-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 relative z-10">
        {/* Filter Section */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          {/* Products Count */}
          {!loading && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400 rounded-xl blur-md opacity-30 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">عدد المنتجات</p>
                <p className="text-xl font-black text-gray-800">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">{products.length}</span> منتج
                </p>
              </div>
            </div>
          )}

          {/* Sort Dropdown */}
          <div className="relative group">
            {/* Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse"></div>
            
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-pink-300 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
            </div>
            
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="relative appearance-none bg-white/95 backdrop-blur-sm border-2 border-orange-200/50 rounded-2xl pl-12 pr-5 py-3.5 text-sm font-bold text-gray-800 hover:border-orange-300 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-0.5"
            >
              <option value="default">الترتيب الافتراضي</option>
              <option value="lowToHigh">السعر: من الأقل للأعلى</option>
              <option value="highToLow">السعر: من الأعلى للأقل</option>
            </select>
            
            {/* Arrow Icon with Glow */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400 rounded-full blur-sm opacity-50"></div>
                <svg className="relative w-5 h-5 text-orange-500 group-hover:text-orange-600 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">جاري التحميل...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">لا توجد منتجات</h3>
            <p className="text-gray-600">جرب تغيير الفلاتر أو البحث عن شيء آخر</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
