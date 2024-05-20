import { Link } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
    
  export default function ChangePassword() {
    const [password, setPassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const idUser = localStorage.getItem('id');
    const accessToken = localStorage.getItem('accessToken');
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        if (!password || !newpassword || !confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        } else if (password === newpassword) {
            setError('Mật khẩu cũ và mật khẩu mới giống nhau.');
            return;
        } else if (newpassword !== confirmPassword) {
            setError('Mật khẩu mới và mật khẩu nhập lại không khớp.');
            return;
        }

        await axios.put(`${apiUrl}/v1/user/update/${idUser}`, 
            {
            password: newpassword,
            }, 
            {
            headers: {
              token: `Bearer ${accessToken}` 
            }
        });
        setPassword('');
        setConfirmPassword('');
        setNewpassword('');
        setError('');
        toast.success('Cập nhật mật khẩu thành công!',
        {
            position: "top-center",
        }
        );
        } catch (error) {
          console.error('Error updating user:', error);
          toast.error('Đã xảy ra lỗi!');
        }
    };

    return (
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
  
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-5 md:pb-5">
              <h1 className="h1 mb-4">Đổi mật khẩu</h1>
            </div>
  
            {/* Form */}
            <div className="max-w-sm mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">Mật khẩu hiện tại:</label>
                    <input id="password" type="password" className="form-input w-full " placeholder="Nhập mật khẩu hiện tại" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="newpassword">Mật khẩu mới:</label>
                    <input id="newpassword" type="password" className="form-input w-full " placeholder="Nhập mật khẩu mới" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="newpassword">Nhập lại mật khẩu mới:</label>
                    <input id="newpassword2" type="password" className="form-input w-full " placeholder="Nhập mật khẩu mới" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  </div>
                </div>
                {error && <p className="flex justìy-center text-red-600">{error}</p>}
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button className="btn text-white bg-black hover:bg-purple-500 w-full">Đổi mật khẩu</button>
                  </div>
                </div>
              </form>
              <div className="text-gray-400 text-center mt-6">
                <Link to="/" className="button text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Trở lại</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  