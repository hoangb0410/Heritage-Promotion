import React, { useEffect } from "react";
import { Link } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux'

  export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errorLogin = useSelector((state) => state.auth.login.error);

    async function handleLogin(event) {
      event.preventDefault();
      const newUser = {
        username: username,
        password: password
      };
      loginUser(newUser, dispatch, navigate);
    };

    useEffect(() => {
      if (errorLogin) {
        setErrorMessage('Tài khoản hoặc mật khẩu không chính xác.');
      }
      if (accessToken) navigate('/');
    }, [errorLogin]);

    return (
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 className="h1">Xin chào. Hãy đăng nhập để bắt đầu.</h1>
            </div>
            <div className="max-w-sm mx-auto">
              <div className="flex items-center mb-6">
                <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
                <div className="text-gray-400">Đăng nhập với tài khoản</div>
                <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
              </div>
              <div className="text-red-600">
                {errorMessage && <div>{errorMessage}</div>}
              </div>
              <form onSubmit={handleLogin}>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-sm text-gray-800 font-medium mb-1" htmlFor="username">Tên đăng nhập</label>
                    <input id="username" type="text" className="form-input w-full" placeholder="Nhập tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Mật khẩu</label>
                    <input id="password" type="password" className="form-input w-full" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <div className="flex justify-between">
                      <label className="flex items-center">
                        <input id="checkbox" type="checkbox" className="form-checkbox" />
                        <span className="text-gray-400 ml-2">Ghi nhớ tài khoản</span>
                      </label>
                      <Link to="/forgotpassword" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Quên mật khẩu?</Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button className="btn text-white bg-black hover:bg-gray-700 w-full" type="submit">Đăng nhập</button>
                  </div>
                </div>
              </form>
              <div className="text-gray-400 text-center mt-6">
                Bạn chưa có tài khoản <Link to="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Đăng ký</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }