import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MobileMenu from '../Minimenu';
import axios from 'axios';
import Logodsvn from '../../../../assets/logodsvn.png';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

function Header() {
    const navigate =useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const idUser = localStorage.getItem('id');
    const apiUrl = process.env.REACT_APP_API_URL;    const [user, setUser] = useState({
      username: '',
      fullname: '',
      email: '',
    });

      // Hàm xử lý đăng xuất
    const handleLogout = async() => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('fullname');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('id');
      navigate('/login');
      // try {
      //   // Lấy refreshToken từ Cookies
      //   const refreshToken = Cookies.get('refreshToken');
  
      //   // Kiểm tra xem refreshToken có tồn tại không
      //   if (!refreshToken) {
      //     throw new Error('Không tìm thấy refreshToken trong Cookies');
      //   }
  
      //   // Gửi yêu cầu đến API để đăng xuất
      //   const response = await axios.post('http://localhost:8000/v1/auth/logout',
      //     {},
      //     {
      //       headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //         Cookie: `${refreshToken}`
      //       }
      //     }
      //   );
  
      //   console.log('Đăng xuất thành công');
      //   localStorage.removeItem('accessToken');
      //   localStorage.removeItem('username');
      //   localStorage.removeItem('isAdmin');
      //   setIsDropdownOpen(false);
      //   Cookies.remove('refreshToken');
  
      // } catch (error) {
      //   console.error('Đã xảy ra lỗi khi đăng xuất:', error);
      // }
    };

    const fetchUsersId = async () => {
      if (accessToken) {
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
      }
    };
  
    useEffect(() => {
      fetchUsersId();
    }, [fetchUsersId]);

    return (
    <header className="absolute top-0 w-full z-40 bg-blue-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 border-b border-gray-300">
        <div className="flex items-center justify-between h-20">
          <div className="shrink-0 mr-4">
            <Link to="/" className="block m-3" aria-label="Cruip">
              <img className="w-12 h-12 fill-current text-green-600" src={ Logodsvn } alt='logo img' />
            </Link>
          </div>
          { accessToken ? (
          <div className="flex items-center ">
            <Link
                to="/history"
                className="font-medium text-purple-500 hover:text-gray-300 py-1 flex items-center transition duration-150 ease-in-out rounded-lg mr-5"
              >
              Lịch sử
            </Link>
            <Link
                to="/formsupport"
                className="font-medium text-purple-500 hover:text-gray-300 py-1 flex items-center transition duration-150 ease-in-out rounded-lg mr-5"
              >
              Phản hồi
            </Link>
            <div className="flex items-center">
                <Menu>
                  <MenuHandler>
                    <Button className="text-black px-2 ml-0 md:ml-3 py-2 bg-transparent hover:bg-none font-[400] shadow-none capitalize flex items-center">
                      <div className="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
                        <svg className="w-12 h-12 text-gray-500 -left-1" fill="currentColor" viewBox="2 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <span className="ml-4 text-sm">{user.fullname}</span>
                    </Button>
                  </MenuHandler>
                  <MenuList>
                  <MenuItem>
                      <Link
                        to='/informationuser'
                        className="button block px-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Thông tin cá nhân
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to='/changepassword'
                        className="button block px-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Đổi mật khẩu
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                     <span className="button block px-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Đăng xuất
                      </span>
                    </MenuItem>
                  </MenuList>
                </Menu>
            </div>
          </div>
        ) : (
          <div>
            <nav className="hidden md:flex md:grow">
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <Link
                    to="/login"
                    className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    Đăng nhập
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="btn-sm text-white bg-black hover:bg-gray-700 ml-3">
                    Đăng ký
                  </Link>
                </li>
              </ul>
            </nav>
            <MobileMenu />
          </div>
        )}
        </div>
      </div>
    </header>
    );
}

export default Header;