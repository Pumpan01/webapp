import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext'; // นำเข้า CartContext
import axios from 'axios';

function SearchShirts() {
  const [shirts, setShirts] = useState([]);
  const { addToCart } = useCart(); // ดึงฟังก์ชัน addToCart จาก Context

  useEffect(() => {
    fetchShirts(); // เรียกดูเสื้อเมื่อโหลดหน้า
  }, []);
  
  const fetchShirts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/shirts');
      setShirts(response.data);
    } catch (error) {
      console.error('Error fetching shirts:', error);
    }
  };

  const handleAddToCart = async (shirt) => {
    try {
      const shirtData = {
        shirtId: shirt.IDPOST, // ใช้ IDPOST ของเสื้อเป็น shirtId
      };

      await axios.post('http://localhost:4000/cart', shirtData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // ส่ง token สำหรับยืนยันตัวตน
        },
      });

      addToCart(shirt); // เพิ่มเสื้อในตะกร้า
      console.log(`Adding to cart: ${shirt.namepost}`);
    } catch (error) {
      console.error('Error adding to cart:', error); // แสดงข้อผิดพลาด
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">เลือกเสื้อทีมที่ใช่ ⚽</h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {shirts.length > 0 ? (
            shirts.map((shirt) => (
              <div key={shirt.IDPOST} className="relative p-4 border border-gray-300 rounded flex flex-col items-center">
                <img 
                  src={`http://localhost:4000${shirt.image}`} 
                  alt={shirt.namepost} 
                  className="w-32 h-32 object-cover mb-2"
                />
                <h3 className="text-lg font-semibold text-center">{shirt.namepost}</h3>
                <p className="text-sm text-center">{shirt.description}</p>
                <div className="mt-2 flex justify-center w-full">
                  <button 
                    onClick={() => handleAddToCart(shirt)} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    ใส่ตะกร้า
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">ยังไม่มีเสื้อที่โพสต์</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchShirts;
