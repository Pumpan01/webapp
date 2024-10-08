import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { removeFromCart } = useCart();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:4000/cart', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // ดึงข้อมูลเพิ่มเติมจากตาราง posts
      const shirtsResponse = await axios.get('http://localhost:4000/shirts');
      const shirts = shirtsResponse.data;

      // นำ cart items มารวมกับข้อมูล shirt
      const cartWithShirts = response.data.map(cartItem => {
        const shirt = shirts.find(shirt => shirt.IDPOST === cartItem.shirtId);
        return {
          ...cartItem,
          image: shirt ? shirt.image : '', // เพิ่มภาพจาก shirt
          namepost: shirt ? shirt.namepost : '', // เพิ่มชื่อจาก shirt
          description: shirt ? shirt.description : '' // เพิ่มคำบรรยายจาก shirt
        };
      });

      setCartItems(cartWithShirts);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleRemoveFromCart = async (shirtId) => {
    try {
      await axios.delete(`http://localhost:4000/cart/${shirtId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      removeFromCart(shirtId);
      fetchCartItems(); // เรียกดูข้อมูลตะกร้าอีกครั้งหลังจากลบ
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">ตะกร้าสินค้า</h1>
        <div className="mt-4 grid grid-cols-1 gap-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="relative p-4 border border-gray-300 rounded flex flex-col items-center">
                <img 
                  src={`http://localhost:4000${item.image}`} 
                  alt={item.namepost} 
                  className="w-32 h-32 object-cover mb-2"
                />
                <h3 className="text-lg font-semibold text-center">{item.namepost}</h3>
                <p className="text-sm text-center">{item.description}</p>
                <button 
                  onClick={() => handleRemoveFromCart(item.shirtId)} 
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  ลบออกจากตะกร้า
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">ตะกร้าว่างเปล่า</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
