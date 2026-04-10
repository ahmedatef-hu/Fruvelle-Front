import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import api from '../../config/api';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      
      if (response.data.success) {
        login(response.data.user, response.data.token);
        toast.success('تم تسجيل الدخول بنجاح');
        navigate('/admin');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'فشل تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">Fruvelle</h1>
          <p className="text-gray-600">تسجيل دخول المسؤول</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">رقم الهاتف</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">كلمة المرور</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>البيانات الافتراضية:</p>
          <p>الهاتف: 0500000000</p>
          <p>كلمة المرور: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
