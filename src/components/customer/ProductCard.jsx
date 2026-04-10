import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import useCartStore from '../../store/cartStore';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <Link to={`/products/${product.id}`} className="group relative block">
      {/* Multi-Layer Glow Effects */}
      <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-3xl opacity-0 group-hover:opacity-60 blur-2xl transition-all duration-700 animate-pulse"></div>
      <div className="absolute -inset-1 bg-gradient-to-br from-orange-300 to-pink-300 rounded-3xl opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500"></div>
      
      {/* Card Container */}
      <div className="relative bg-gradient-to-br from-white via-orange-50/30 to-pink-50/30 rounded-3xl shadow-2xl overflow-hidden transform group-hover:scale-[1.03] group-hover:-translate-y-3 transition-all duration-500 border-2 border-orange-100/50 group-hover:border-orange-300 backdrop-blur-sm">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-4 left-4 w-1 h-1 bg-orange-400 rounded-full animate-bounce" style={{ animationDuration: '2s', animationDelay: '0s' }}></div>
          <div className="absolute top-8 right-6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}></div>
          <div className="absolute bottom-8 left-8 w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.6s' }}></div>
        </div>

        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-100/50 via-pink-100/30 to-purple-100/50 aspect-square">
          {/* Rotating Gradient Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-transparent to-pink-400/20 animate-spin" style={{ animationDuration: '8s' }}></div>
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
            <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent transform skew-x-12 group-hover:left-full transition-all duration-1000"></div>
          </div>
          
          {/* Image */}
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/400x400/f97316/ffffff?text=Fruvelle'}
            alt={product.name_ar}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400/f97316/ffffff?text=Fruvelle';
            }}
          />
          
          {/* Vignette Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Corner Glow */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400/40 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        {/* Content Section */}
        <div className="relative p-5 bg-gradient-to-b from-white/80 to-white/95 backdrop-blur-sm">
          {/* Decorative Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Title */}
          <h3 className="text-lg font-black text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-pink-600 transition-all duration-300 line-clamp-1">
            {product.name_ar}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description_ar}
          </p>
          
          {/* Price and Button Container */}
          <div className="flex justify-between items-center pt-4 border-t-2 border-gradient-to-r from-orange-200 via-pink-200 to-purple-200">
            {/* Price with Glow */}
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-orange-400 to-pink-400 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
              <div className="relative">
                <span className="text-2xl font-black bg-gradient-to-r from-orange-600 via-orange-500 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                  {product.price}
                </span>
                <span className="text-sm font-bold text-gray-600 mr-1">جنيه</span>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <Link
              to={`/products/${product.id}`}
              className="relative group/btn"
            >
              {/* Button Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl blur-md opacity-50 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              
              {/* Button */}
              <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 text-white p-3 rounded-xl transition-all duration-300 transform group-hover/btn:scale-110 group-hover/btn:rotate-6 shadow-xl">
                {/* Inner Shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon */}
                <FiShoppingCart className="text-xl relative z-10" />
              </div>
            </Link>
          </div>
        </div>
        
        {/* Corner Sparkles */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
        <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </Link>
  );
};

export default ProductCard;
