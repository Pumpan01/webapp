import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProfile({ onProfileUpdate }) {
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userGender, setUserGender] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:4000/account', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const { email, name, picture, number, age, gender } = response.data;
                setUserName(name);
                setUserEmail(email);
                setProfilePicture(picture);
                setUserPhone(number !== '0' ? number : '');
                setUserAge(age);
                setUserGender(gender);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                navigate('/login');
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        if (event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePicture(reader.result); // Update preview
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const formData = new FormData();
            formData.append('name', userName);
            formData.append('email', userEmail);
            formData.append('number', userPhone);
            formData.append('age', userAge);
            formData.append('gender', userGender);

            if (selectedFile) {
                formData.append('profilePicture', selectedFile);
            }

            const response = await axios.post('http://localhost:4000/updateProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.success('Profile updated successfully', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
                setTimeout(() => {
                    if (onProfileUpdate) {
                        onProfileUpdate();
                    }
                    navigate('/profile');
                }, 1000);
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Profile</h1>
                <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                        {profilePicture ? (
                            <img
                                src={profilePicture} // Display preview
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover shadow-md"
                            />
                        ) : (
                            <div className="bg-gray-300 w-32 h-32 rounded-full flex items-center justify-center shadow-md">
                                <span className="text-gray-700">No Image</span>
                            </div>
                        )}
                    </div>
                    <input type="file" onChange={handleFileChange} className="mt-2 text-sm text-gray-600" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Full Name:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone Number:</label>
                    <input
                        type="text"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Age:</label>
                    <input
                        type="number"
                        value={userAge}
                        onChange={(e) => setUserAge(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Gender:</label>
                    <select
                        value={userGender}
                        onChange={(e) => setUserGender(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button
                    onClick={handleUpdateProfile}
                    className="w-full px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-md"
                >
                    Save Changes
                </button>
                <ToastContainer />
            </div>
        </div>
    );
}

export default EditProfile;
