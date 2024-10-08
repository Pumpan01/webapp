import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home'; 
import Cart from './pages/Cart'; 
import Post from './pages/Post'; 
import Header from './pages/Header';
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import EditProfile from './pages/EditProfile'; 
import Profile from './pages/Profile'; 
import SearchShirts from './pages/SearchShirts';
import { CartProvider, useCart } from './CartContext'; // นำเข้า CartProvider

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  const { setCartItems } = useCart(); // ใช้เฉพาะ setCartItems

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:4000/account', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUserName(response.data.name); 
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setIsAuthenticated(false);
    }
  };

  const fetchCartItems = useCallback(async (token) => {
    try {
      const response = await axios.get('http://localhost:4000/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setCartItems(response.data); // เก็บข้อมูลตะกร้าลงใน context
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }, [setCartItems]); // เพิ่ม setCartItems เป็น dependency

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserProfile(token);
      fetchCartItems(token); // โหลดตะกร้าของผู้ใช้ที่ล็อกอินอยู่
    }
  }, [fetchCartItems]); // เพิ่ม fetchCartItems ที่นี่

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    fetchUserProfile(token);
    fetchCartItems(token); // เรียกใช้เพื่อโหลดข้อมูลตะกร้าสำหรับผู้ใช้ที่ล็อกอินอยู่
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserName('');
    // ไม่ต้องรีเซ็ต cart ที่นี่
  };

  return (
    <CartProvider> {/* ใช้ CartProvider รอบ App */}
      <Router>
        <div className="flex flex-col min-h-screen">
          {isAuthenticated ? ( // ถ้าเข้าสู่ระบบแล้ว
            <>
              <Header handleLogout={handleLogout} userName={userName} /> 
              <div className="flex-1 mt-16"> {/* พื้นที่เนื้อหาหลัก */}
                <div className="p-4">
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/search-shirts" element={<SearchShirts />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                  </Routes>
                </div>
              </div>
            </>
          ) : ( // ถ้ายังไม่ได้เข้าสู่ระบบ
            <div className="flex-1 min-h-screen">
              <Routes>
                <Route path="/login" element={<Login handleLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
          )}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
