import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState([]); // State สำหรับเก็บโพสต์
    const [isEditing, setIsEditing] = useState(false); // State สำหรับตรวจสอบการแก้ไข
    const [editPostId, setEditPostId] = useState(null); // State สำหรับเก็บ ID ของโพสต์ที่จะแก้ไข

    // ฟังก์ชันดึงโพสต์จาก API
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/posts', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // เพิ่ม token ใน Header
                },
            });
            setPosts(response.data); // ตั้งค่าข้อมูลโพสต์
        } catch (error) {
            console.error('Error fetching posts:', error);
            setMessage('เกิดข้อผิดพลาดในการดึงโพสต์'); // แสดงข้อความผิดพลาด
        }
    };

    useEffect(() => {
        fetchPosts(); // ดึงโพสต์เมื่อคอมโพเนนต์ถูกเรนเดอร์
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            title,
            content,
        };

        // ดึง token จาก localStorage
        const token = localStorage.getItem('token');

        try {
            if (isEditing) {
                // หากอยู่ในโหมดแก้ไข
                await axios.put(`http://localhost:4000/api/posts/${editPostId}`, postData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // เพิ่ม token ใน Header
                    },
                });
                setMessage('แก้ไขโพสต์สำเร็จ!'); // แสดงข้อความสำเร็จ
            } else {
                // หากอยู่ในโหมดสร้างโพสต์ใหม่
                await axios.post('http://localhost:4000/api/posts', postData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // เพิ่ม token ใน Header
                    },
                });
                setMessage('เพิ่มโพสต์สำเร็จ!'); // แสดงข้อความสำเร็จ
            }
            fetchPosts(); // รีเฟรชโพสต์
            // ทำการรีเซ็ตฟอร์ม
            setTitle('');
            setContent('');
            setIsEditing(false);
            setEditPostId(null);
        } catch (error) {
            console.error('Error creating/updating post:', error);
            setMessage('เกิดข้อผิดพลาดในการเพิ่มหรือแก้ไขโพสต์'); // แสดงข้อความผิดพลาด
        }
    };

    const handleEdit = (post) => {
        setTitle(post.title);
        setContent(post.content);
        setEditPostId(post.id); // ตั้งค่า ID ของโพสต์ที่จะแก้ไข
        setIsEditing(true); // เปลี่ยนสถานะเป็นแก้ไข
    };

    const handleDelete = async (id) => {
        // ดึง token จาก localStorage
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://localhost:4000/api/posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // เพิ่ม token ใน Header
                },
            });
            setMessage('ลบโพสต์สำเร็จ!'); // แสดงข้อความสำเร็จ
            fetchPosts(); // รีเฟรชโพสต์
        } catch (error) {
            console.error('Error deleting post:', error);
            setMessage('เกิดข้อผิดพลาดในการลบโพสต์'); // แสดงข้อความผิดพลาด
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">สร้างโพสต์ใหม่</h1>
            <form onSubmit={handleSubmit} className="mb-4 border p-4 rounded shadow">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="หัวข้อ"
                    className="border p-2 mb-2 w-full"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="รายละเอียด"
                    className="border p-2 mb-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {isEditing ? 'อัปเดตโพสต์' : 'ส่งโพสต์'}
                </button>
            </form>
            {message && <p className="text-green-500">{message}</p>} {/* แสดงข้อความหลังการส่ง */}


            <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">โพสต์ทั้งหมด</h2>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="border p-4 mb-4 rounded shadow">
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <p className="text-gray-700">{post.content}</p>
                            <div className="mt-2">
                                <button onClick={() => handleEdit(post)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                                    แก้ไข
                                </button>
                                <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                    ลบ
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">ยังไม่มีโพสต์</p> // แสดงข้อความถ้ายังไม่มีโพสต์
                )}
            </div>
        </div>
    );
};

export default PostPage;
