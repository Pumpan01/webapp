// ตัวอย่างการใช้ useEffect ใน CartContext เพื่อโหลดตะกร้าของผู้ใช้เมื่อเข้าสู่ระบบ
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ฟังก์ชันสำหรับโหลดตะกร้าของผู้ใช้
  const fetchCartItems = async (token) => {
    try {
      const response = await axios.get('http://localhost:4000/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCartItems(response.data); // ตั้งค่าตะกร้าสินค้า
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) => prevItems.filter((cartItem) => cartItem.IDPOST !== item.IDPOST));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
