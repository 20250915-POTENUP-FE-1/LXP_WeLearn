import React from 'react';

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 mb-8 flex items-center justify-between border-b border-gray-300 bg-white px-3 py-2 font-bold shadow-xs">
      <div className="logo">WeLearn</div>
      <div>
        <button className="rounded-md border border-gray-300 px-3 py-1">회원가입</button>
      </div>
    </header>
  );
}

export default Header;
