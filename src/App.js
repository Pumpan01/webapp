import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home'; 
import Header from './pages/Header';
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import EditProfile from './pages/EditProfile'; 
import Profile from './pages/Profile'; 
import PostPage from './pages/PostPage'; // นำเข้า PostPage ที่นี่

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserProfile(token);
    }
  }, []);

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

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    fetchUserProfile(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserName('');
  };

  return (
    <Router>
      <div className="flex">
        {isAuthenticated ? (
          <>
            <Header handleLogout={handleLogout} userName={userName} /> 
            <div className="flex-1 min-h-screen">
              <div className="p-4 mt-16">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/posts" element={<PostPage />} /> {/* เส้นทางสำหรับหน้าโพสต์ */}
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/profile" element={<Profile />} /> 
                  <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
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
  );
}

export default App;
