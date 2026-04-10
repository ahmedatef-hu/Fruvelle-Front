import { useEffect, useState } from 'react';
import api from '../../config/api';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data.data);
    } catch (error) {
      toast.error('حدث خطأ في جلب المستخدمين');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">إدارة المستخدمين</h1>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-right p-3">الاسم</th>
              <th className="text-right p-3">الهاتف</th>
              <th className="text-right p-3">البريد الإلكتروني</th>
              <th className="text-right p-3">الدور</th>
              <th className="text-right p-3">تاريخ التسجيل</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.email || '-'}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.role === 'admin' ? 'مسؤول' : 'عميل'}
                  </span>
                </td>
                <td className="p-3">{new Date(user.created_at).toLocaleDateString('ar-SA')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
