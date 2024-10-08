import React from 'react';
import { Link } from 'react-router-dom';

function Header({ handleLogout, userName }) {
  return (
    <header className="bg-gray-800 shadow p-4 flex justify-between items-center text-white fixed w-full z-10">
      <div className="flex items-center">
        <Link to="/" className="text-lg font-bold cursor-pointer">
          ⚽ Football Fun Zone!
        </Link>
      </div>
      <nav className="flex-1 flex justify-center space-x-6">
        <Link to="/post" className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition">Post</Link>
        <Link to="/search-shirts" className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition">Shirts</Link>
        <Link to="/cart" className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition">Cart</Link>
        <Link to="/profile" className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition">Profile</Link>
      </nav>
      <div className="flex items-center">
        <div className="bg-gray-700 text-white px-3 py-1 rounded-lg mr-4">
          {userName}
        </div>
        <button 
          onClick={handleLogout} 
          className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-500 transition"
          aria-label="Logout" // เพิ่ม aria-label สำหรับการเข้าถึง
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
