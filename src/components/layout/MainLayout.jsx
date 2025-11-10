import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between bg-gray-100/70">
      <Header />
      <main className="item-center flex flex-col justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
