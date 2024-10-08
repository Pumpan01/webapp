import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">ยินดีต้อนรับสู่ Football Fun Zone ⚽</h1>
        <p className="text-gray-700 text-lg leading-relaxed text-center mb-6">
          เว็บไซต์นี้เป็นที่รวบรวมข้อมูลเกี่ยวกับฟุตบอล เสื้อทีม เสื้อผู้เล่น และข่าวสารต่าง ๆ เกี่ยวกับกีฬา
        </p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/search-shirts" className="bg-blue-500 text-white p-4 rounded-lg shadow hover:bg-blue-600 transition">
            <h2 className="text-xl font-semibold">ค้นหาเสื้อทีม</h2>
            <p className="text-sm">เลือกซื้อเสื้อทีมโปรดของคุณได้ที่นี่!</p>
          </Link>
          <div className="bg-orange-500 text-white p-4 rounded-lg shadow hover:bg-orange-600 transition">
            <h2 className="text-xl font-semibold">ข้อมูลผู้เล่น</h2>
            <p className="text-sm">ดูสถิติและข้อมูลเกี่ยวกับผู้เล่นที่คุณชื่นชอบ</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg shadow hover:bg-red-600 transition">
            <h2 className="text-xl font-semibold">ข่าวสารทีม</h2>
            <p className="text-sm">ติดตามข่าวสารล่าสุดเกี่ยวกับทีมฟุตบอลต่าง ๆ</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow hover:bg-green-600 transition">
            <h2 className="text-xl font-semibold">อันดับลีก</h2>
            <p className="text-sm">ตรวจสอบอันดับลีกของทีมโปรดของคุณ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
