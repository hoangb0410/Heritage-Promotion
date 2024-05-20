import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InfoUser() {
    const accessToken = localStorage.getItem('accessToken');
    const idUser = localStorage.getItem('id');
    const apiUrl = process.env.REACT_APP_API_URL;
    const [user, setUser] = useState({
        username: '',
        fullname: '',
        email: '',
      });
    useEffect(() => {
        const fetchUsersId = async () => {
          try {
            const response = await axios.get(`${apiUrl}/v1/user/${idUser}`, {
              headers: {
                token: `Bearer ${accessToken}` 
              }
            });
            setUser(response.data);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchUsersId();
    }, []);

    const handleChange = (event) => {
        setUser({
          ...user,
          [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newInfo = {
            fullname: user.fullname,
            email: user.email
          };
        try {
          await axios.put(`${apiUrl}/v1/user/update/${idUser}`, newInfo, {
            headers: {
              token: `Bearer ${accessToken}` 
            }
          });
        toast.success('Cập nhật thành công!',
        {
            position: "top-center",
        }
        );
        } catch (error) {
          console.error('Error updating user:', error);
          toast.error('Đã xảy ra lỗi!',
        {
            position: "top-center",
        }
        );
        }
    };

    const handleGoBack = () => {
        window.history.back();
    };
      
    return ( 
        <>
            <div className="mb-2 max-w-2xl mx-auto bg-white mt-32 rounded-lg border-none p-5 shadow-xl">
                <h1 className="font-bold text-[35px] pl-10 mt-10">
                    Thông tin cá nhân
                </h1>
                <div>
                    <form className="px-10 py-3" onSubmit={handleSubmit}>
                        <div className="mb-3 ">
                        <label className="text-sm mt-2 font-medium text-gray-700" htmlFor="username">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            disabled
                            name="username"
                            id="username"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none text-gray-300 focus:border-blue-500"
                            value={user.username}
                        />
                        </div>
                        <div className="mb-3 ">
                        <label className="text-sm mt-2 font-medium text-gray-700" htmlFor="fullname">
                            Họ và tên người dùng
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            id="fullname"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                            value={user.fullname}
                            onChange={handleChange}
                        />
                        </div>
                        <div className="mb-3 ">
                        <label
                            className="text-sm mt-2 font-medium text-gray-700"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                            value={user.email}
                            onChange={handleChange}
                        />
                        </div>
                        
                        <div className="flex justify-between mt-5">
                            <div
                                onClick={handleGoBack}
                                    className="hover:cursor-pointer px-4 py-2 rounded-md hover:bg-blue-400 focus:outline-none border focus:bg-blue-600"
                                >
                                    <span>Trở lại</span>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
     );
}

export default InfoUser;