import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const AuthLayout = () => {
  return (
    <div className="h-full">
      <Header />
      <main className="item-center flex h-[calc(100%-3.5rem)] justify-center pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
