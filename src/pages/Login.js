import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });

      handleLogin(response.data.token);
      navigate('/home');

    } catch (error) {
      setError(error.response?.data?.message || 'เกิดข้อผิดพลาดในการล็อกอิน');
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Page</h2>
        <h3 className="text-lg text-center text-gray-600 mb-4">Hello! Good Morning</h3>

        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกอีเมลของคุณ"
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
              placeholder="กรอกรหัสผ่านของคุณ"
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2 leading-tight"
            />
            <span className="text-sm">Remember Me</span>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md"
          >
            Submit
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Not a member?{' '}
            <button
              onClick={navigateToRegister}
              className="text-blue-500 hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
