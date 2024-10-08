import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // เชื่อมโยงกับไฟล์ CSS
import App from './App';
import { CartProvider } from './CartContext'; // ตรวจสอบว่าชื่อไฟล์ตรงกับชื่อที่สร้าง

ReactDOM.render(
  <React.StrictMode>
    <CartProvider> {/* ใช้ CartProvider ห่อหุ้ม App */}
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
