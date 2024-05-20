import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateUser() {
    const navigate = useNavigate();
    const params = useParams();
    const accessToken = localStorage.getItem('accessToken');
    const apiUrl = process.env.REACT_APP_API_URL;
    const [user, setUser] = useState({
        username: '',
        fullname: '',
        email: '',
        password: '',
        isAdmin: false,
      });
    console.log(params);
    console.log(user);

    useEffect(() => {
        const fetchUsersId = async () => {
          try {
            const response = await axios.get(`${apiUrl}/v1/user/${params.id}`, {
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
        try {
          await axios.put(`${apiUrl}/v1/user/update/${params.id}`, user, {
            headers: {
              token: `Bearer ${accessToken}` 
            }
          });
        navigate('/admin/users');
        toast.success('Cập nhật thành công!');
        } catch (error) {
          console.error('Error updating user:', error);
        }
    };
      
    return ( 
        <>
            <div className="mb-2 mx-auto md:w-2/3 bg-white m-10 rounded-lg border-none p-5 shadow-xl">
                <h1 className="font-bold text-[35px] uppercase pl-10">
                    CẬP NHẬT NGƯỜI DÙNG
                </h1>
                <div>
                    <form className="px-10 py-3" onSubmit={handleSubmit}>
                        <div className="mb-3 ">
                        <label className="text-sm mt-2 font-medium text-black" htmlFor="username">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={user.username}
                            onChange={handleChange}
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
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={user.fullname}
                            onChange={handleChange}
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
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={user.email}
                            onChange={handleChange}
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
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            value={user.password}
                            onChange={handleChange}
                        />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="mb-3">
                                <label
                                className="text-sm mt-2 font-medium text-black"
                                htmlFor="isAdmin"
                                >
                                Chức vụ
                                </label>
                                <select
                                id="isAdmin"
                                name="isAdmin"
                                className="form-select appearance-none
                                                block
                                                w-full
                                                px-4
                                                py-3
                                                mt-3
                                                text-sm 
                                                text-black
                                                bg-transparent bg-clip-padding bg-no-repeat
                                                border border-solid border-gray-300
                                                rounded
                                                transition
                                                ease-in-out
                                                m-0
                                                focus:text-black bg-white focus:outline-none"
                                aria-label="Default select example"
                                value={user.isAdmin}
                                onChange={handleChange}
                                >
                                <option value="" disabled>
                                    Chọn chức vụ
                                </option>
                                <option value={false}>Khách hàng</option>
                                <option value={true}>Quản trị viên</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex justify-between mt-5">
                            <div
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                <Link className="px-1 py-2" to="/admin/users">Trở lại</Link>
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

export default UpdateUser;