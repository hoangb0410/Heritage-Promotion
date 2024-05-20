import { Link, useLocation } from "react-router-dom";
import Logodsvn from "../../../assets/logodsvn.png";
import { useState } from "react";

function Sidebar() {
    const location = useLocation();
    const currentPage = location.pathname;

    return (
      // fixed top-0 left-0 transition-transform sm:translate-x-0
        <div className="h-screen fixed top-0 left-0 w-[270px]">
          <div className="px-6 overflow-y-auto bg-white h-screen border-2">
            <div className="shrink-0 mr-4 p-5 flex items-center mb-10">
              <Link to="/admin" className="block mr-4" aria-label="Cruip">
                <img className="w-10 h-10 fill-current text-green-600" src={ Logodsvn } alt='logo img' />
              </Link>
              <span className="text-sm">Di sản Việt Nam</span>
            </div>
            <div className="mt-3">
              <h2 className="font-medium text-base text-gray-600">TRANG CHỦ</h2>
              <div className={`${currentPage === '/admin/dashboard' ? 'bg-blue-400' : ''} flex flex-col items-start`}>
                <button className="py-1 md:pl-8 hover:bg-gray-800 hover:text-white w-full">
                  <Link className="flex items-center" to="/admin/dashboard">
                    <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                    </svg>
                    &emsp; Dashboard
                  </Link>
                </button>
              </div>
            </div>
            <div className="mt-3">
              <h2 className="font-medium text-base text-gray-600">DI SẢN</h2>
              <div className="flex flex-col items-start">
                <button className={`${currentPage === '/admin/heritage' ? 'bg-blue-400' : ''} py-1 md:pl-8 hover:bg-gray-800 hover:text-white w-full`}>
                  <Link className="flex items-center" to="/admin/heritage">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                    </svg>
                    &emsp; Quản lý di sản
                  </Link>
                </button>
                <button className={`${currentPage === '/admin/events' ? 'bg-blue-400' : ''} py-1 md:pl-8 hover:bg-gray-800 hover:text-white w-full`}>
                  <Link className="flex items-center" to="/admin/events">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1v3m5-3v3m5-3v3M1 7h7m1.506 3.429 2.065 2.065M19 7h-2M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 13H6v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L8 16Z"/>
                  </svg>
                    &emsp; Quản lý sự kiện
                  </Link>
                </button>
              </div>
            </div>
            <div className="mt-3">
              <h2 className="font-medium text-base text-gray-600">ĐÓNG GÓP</h2>
              <div className={`${currentPage === '/admin/contributemanagement' ? 'bg-blue-400' : ''} flex flex-col items-start`}>
                <button className="py-1 md:pl-8 hover:bg-gray-800 hover:text-white w-full">
                  <Link className="flex items-center" to="/admin/contributemanagement">
                    <svg className="w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                    </svg>
                    &ensp; Quản lý đóng góp
                  </Link>
                </button>
              </div>
            </div>
            <div className="mt-3">
              <h2 className="font-medium text-base text-gray-600">NGƯỜI DÙNG</h2>
              <div className="flex flex-col items-start">
                <button className={`${currentPage === '/admin/users' ? 'bg-blue-400' : ''} py-1 md:pl-8 hover:bg-gray-800 hover:text-white w-full`}>
                  <Link className="flex items-center" to="/admin/users">
                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                    </svg>
                    &ensp; Quản lý tài khoản
                  </Link>
                </button>
                <button className={`${currentPage === '/admin/feedback' ? 'bg-blue-400' : ''} py-1 md:pl-8 hover:bg-gray-800 hover:text-white w-full`}>
                  <Link className="flex items-center" to="/admin/feedback">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                    </svg>
                    &ensp; Phản hồi
                  </Link>
                </button>
              </div>
            </div>
                </div>
        </div>
    );
  }
  
  export default Sidebar;
