import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="flex justify-between border-t border-gray-300 bg-white px-3 py-2 text-xs text-gray-500">
      <div>© 2025 LXP. All rights reserved.</div>
      <nav className="flex gap-3">
        <Link>이용약관</Link>
        <Link>개인정보처리방침</Link>
      </nav>
    </footer>
  );
}

export default Footer;
