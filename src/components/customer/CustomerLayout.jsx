import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-grow pt-20 w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
