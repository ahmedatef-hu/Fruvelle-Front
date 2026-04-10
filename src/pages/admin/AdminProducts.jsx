import { useEffect, useState } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import api from '../../config/api';
import { toast } from 'react-toastify';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name_ar: '',
    description_ar: '',
    price: '',
    category_id: '',
    weight: '',
    stock: '',
    is_featured: false,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.data);
    } catch (error) {
      toast.error('حدث خطأ في جلب المنتجات');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('تم تحديث المنتج بنجاح');
      } else {
        await api.post('/products', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('تم إضافة المنتج بنجاح');
      }

      setShowModal(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error('حدث خطأ في حفظ المنتج');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;

    try {
      await api.delete(`/products/${id}`);
      toast.success('تم حذف المنتج بنجاح');
      fetchProducts();
    } catch (error) {
      toast.error('حدث خطأ في حذف المنتج');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name_ar: product.name_ar,
      description_ar: product.description_ar || '',
      price: product.price,
      category_id: product.category_id || '',
      weight: product.weight || '',
      stock: product.stock || '',
      is_featured: product.is_featured || false,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name_ar: '',
      description_ar: '',
      price: '',
      category_id: '',
      weight: '',
      stock: '',
      is_featured: false,
    });
  };

  const filteredProducts = products.filter(product =>
    product.name_ar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">إدارة المنتجات</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            resetForm();
            setShowModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <FiPlus />
          <span>إضافة منتج</span>
        </button>
      </div>

      {/* Search */}
      <div className="card mb-6">
        <div className="relative">
          <FiSearch className="absolute right-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            className="input-field pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-right p-3">الصورة</th>
              <th className="text-right p-3">الاسم</th>
              <th className="text-right p-3">السعر</th>
              <th className="text-right p-3">الفئة</th>
              <th className="text-right p-3">المخزون</th>
              <th className="text-right p-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name_ar}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3">{product.name_ar}</td>
                <td className="p-3">{product.price} جنيه</td>
                <td className="p-3">{product.category_name || '-'}</td>
                <td className="p-3">{product.stock || 0}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">اسم المنتج *</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.name_ar}
                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">الوصف</label>
                  <textarea
                    className="input-field"
                    rows="3"
                    value={formData.description_ar}
                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">السعر *</label>
                    <input
                      type="number"
                      step="0.01"
                      className="input-field"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">الفئة</label>
                    <select
                      className="input-field"
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    >
                      <option value="">اختر الفئة</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name_ar}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">الوزن</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">المخزون</label>
                    <input
                      type="number"
                      className="input-field"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  />
                  <label htmlFor="is_featured" className="text-gray-700">منتج مميز</label>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? 'جاري الحفظ...' : 'حفظ'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                    resetForm();
                  }}
                  className="btn-outline flex-1"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
