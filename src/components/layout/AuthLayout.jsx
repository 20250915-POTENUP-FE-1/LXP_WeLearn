import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="item-center bg- flex h-[calc(100%-3.5rem)] justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
