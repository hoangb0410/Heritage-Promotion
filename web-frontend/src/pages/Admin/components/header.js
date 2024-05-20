import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";  

function HeaderAdmin({ toggleSidebar, styles }) {
    const fullname = localStorage.getItem('fullname');
    const navigate = useNavigate();

      // Hàm xử lý đăng xuất
      const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('fullname');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('id');
        navigate('/')
      };

    return ( 
        <header className={`z-30 px-4 sm:px-6 fixed ${styles}`}>
            <div className="mx-auto border-b border-gray-600">
                <div className="absolute mt-8">
                    <button className="text-black focus:outline-none" onClick={toggleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                         </svg>
                    </button>
                </div>
                <div className="flex justify-end h-20 items-center">
                    <div className="absolute">
                        <div className="flex items-center mr-10">
                            <Menu>
                                <MenuHandler>
                                    <Button className="text-black px-2 ml-0 md:ml-3 py-2 bg-transparent hover:bg-none font-[400] shadow-none capitalize flex items-center">
                                    <div className="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
                                        <svg className="w-12 h-12 text-gray-500 -left-1" fill="currentColor" viewBox="2 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="ml-4 text-sm">{fullname}</span>
                                    </Button>
                                </MenuHandler>
                                <MenuList>
                                <MenuItem>
                                    <Link
                                        to='/'
                                        className="button block px-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                        Trang chủ
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
                </div>
            </div>
        </header>
        );
}

export default HeaderAdmin;