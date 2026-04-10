import { useState, useEffect } from 'react';
import { FiUser, FiPhone, FiMail, FiMapPin, FiPackage, FiEdit2, FiSave, FiX } from 'react-icons/fi';

const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: 'أحمد محمد',
    phone: '01234567890',
    email: 'ahmed@example.com',
    address: 'القاهرة، مصر'
  });
  const [editedInfo, setEditedInfo] = useState({ ...userInfo });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo({ ...userInfo });
  };

  const handleSave = () => {
    setUserInfo({ ...editedInfo });
    setIsEditing(false);
    // TODO: Save to backend
  };

  const handleCancel = () => {
    setEditedInfo({ ...userInfo });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">حسابي</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">المعلومات الشخصية</h2>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"
                >
                  <FiEdit2 className="text-xl" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                  >
                    <FiSave className="text-xl" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div className="flex items-start gap-3">
                <FiUser className="text-2xl text-primary-500 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">الاسم</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedInfo.name}
                      onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800 font-semibold">{userInfo.name}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <FiPhone className="text-2xl text-primary-500 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">رقم الهاتف</p>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedInfo.phone}
                      onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800 font-semibold">{userInfo.phone}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <FiMail className="text-2xl text-primary-500 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">البريد الإلكتروني</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedInfo.email}
                      onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-800 font-semibold">{userInfo.email}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <FiMapPin className="text-2xl text-primary-500 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">العنوان</p>
                  {isEditing ? (
                    <textarea
                      value={editedInfo.address}
                      onChange={(e) => setEditedInfo({ ...editedInfo, address: e.target.value })}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    />
                  ) : (
                    <p className="text-gray-800 font-semibold">{userInfo.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FiPackage className="text-2xl text-primary-500" />
              <h2 className="text-xl font-bold text-gray-800">طلباتي</h2>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <FiPackage className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">لا توجد طلبات حتى الآن</p>
                <p className="text-gray-400 text-sm mt-2">ابدأ التسوق الآن واستمتع بمنتجاتنا!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-gray-800">طلب #{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.statusText}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600">{order.itemsCount} منتج</p>
                      <p className="text-lg font-bold text-primary-600">{order.total} جنيه</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
