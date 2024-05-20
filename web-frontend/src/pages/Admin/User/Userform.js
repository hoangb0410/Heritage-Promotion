import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Userform() {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
      if (!username || !password || !fullname || !email) {
        setError('Vui lòng điền đầy đủ thông tin.');
        return;
      }

      await axios.post(`${apiUrl}/v1/user/register`, {
        username: username,
        fullname: fullname,
        password: password,
        email: email
      });
      navigate('/admin/users');
      toast.success('Đăng ký thành công!');
      setUsername('');
      setFullname('')
      setPassword('');
      setEmail('');
      setError('')
      } catch (error) {
        if (error.response && error.response.status === 500) {
          setError('Tên đăng nhập hoặc email đã có người đăng kí');
        } else {
          setError('Đã xảy ra lỗi');
        }
      }
    };

    return ( 
        <div>
            <form className="px-10 py-3" onSubmit={handleSubmit}>
                <div className="mb-3 ">
                <label className="text-sm mt-2 font-medium text-black" htmlFor="name">
                    Tên đăng nhập
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nhập tên đăng nhập"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} required
                />
                </div>
                <div className="mb-3 ">
                <label className="text-sm mt-2 font-medium text-black" htmlFor="fullname">
                    Họ và tên người dùng
                </label>
                <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    placeholder="Nhập họ và tên"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={fullname} 
                    onChange={(e) => setFullname(e.target.value)} required
                />
                </div>
                <div className="mb-3 ">
                <label
                    className="text-sm mt-2 font-medium text-black"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Nhập email"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required
                />
                </div>
                <div className="mb-3 ">
                <label
                    className="text-sm mt-2 font-medium text-black"
                    htmlFor="password"
                >
                    Mật khẩu
                </label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="Nhập mật khẩu"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} required
                />
                </div>
                {error && <p className="text-red-600">{error}</p>}
                <div className="flex justify-between mt-5">
                <div>
                    <div
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        <Link className="px-1 py-2" to="/admin/users">Trở lại</Link>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Khởi tạo
                </button>
                </div>
            </form>
        </div>
    );
}

export default Userform;