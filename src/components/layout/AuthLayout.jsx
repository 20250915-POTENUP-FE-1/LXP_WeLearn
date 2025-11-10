import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between bg-gray-50">
      <Header />
      <main className="item-center flex justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
