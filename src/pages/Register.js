import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(''); // เพิ่ม field อายุ
  const [gender, setGender] = useState(''); // เพิ่ม field เพศ
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // ตรวจสอบว่าข้อมูล email, password, name ถูกส่งไปที่ API
      const response = await axios.post('http://localhost:4000/register', {
        email,
        password,
        name,
        age, // ส่งข้อมูลอายุ
        gender // ส่งข้อมูลเพศ
      });

      if (response.status === 201) {
        setSuccess('ลงทะเบียนสำเร็จ! คุณสามารถเข้าสู่ระบบได้แล้ว');
        setTimeout(() => navigate('/login'), 2000); // นำผู้ใช้ไปที่หน้า login หลังจาก 2 วินาที
      } else {
        setError('เกิดข้อผิดพลาดในการลงทะเบียน');
      }
    } catch (error) {
      // จัดการข้อผิดพลาดที่เกิดขึ้นระหว่างการส่งข้อมูล
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // แสดงข้อความจากเซิร์ฟเวอร์
      } else {
        setError('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* ฟิลด์ใหม่สำหรับอายุ */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your age"
            />
          </div>

          {/* ฟิลด์ใหม่สำหรับเพศ */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
          </p>
        </div>

        {/* ปุ่มย้อนกลับไปหน้า Login */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-600 hover:text-gray-900 underline"
          >
            ย้อนกลับไปหน้า Login
          </button>
        </div>
      </div>
    </div>
  );
}
