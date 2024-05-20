import React from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
    
  export default function SignUp() {
    const initialValues = {
      username: "",
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const validate = (values) => {
      let errors = {};
      const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!regex_email.test(values.email)){
        errors.email = "! Vui lòng nhập Email";
      } else if (values.email.length > 30) {
        errors.email = "! Email không vượt quá 30 ký tự";
      }
      if (!values.fullname) {
        errors.fullname = "! Vui lòng nhập Họ và tên";
      } else if (values.fullname.length > 40) {
        errors.fullname = "! Họ và tên không vượt quá 40 ký tự";
      }
      if (!values.username) {
          errors.username = "! Vui lòng nhập tên đăng nhập";
        } else if (values.username.length > 100) {
          errors.username = "! Tên đăng nhập không vượt quá 30 ký tự";
        }
      if (!values.password) {
        errors.password = "! Vui lòng nhập mật khẩu";
      } else if (values.password.length < 8) {
        errors.password = "! Mật khẩu cần ít nhất 8 kí tự";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "! Vui lòng nhập lại mật khẩu";
      } else if (values.confirmPassword.length < 8) {
        errors.confirmPassword = "! Mật khẩu cần ít nhất 8 kí tự";
      }else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "! Mật khẩu nhập lại không khớp với mật khẩu đăng ký";
      }
      return errors;
    };

    const handleSignup = async (values) => {
      try {
      await axios.post(`${apiUrl}/v1/user/register`, values);
      navigate('/login');
      toast.success('Đăng ký thành công!');
      } catch (error) {
        if (error.response && error.response.status === 500) {
          toast.error('Tên đăng nhập hoặc email đã có người đăng kí');
        } else {
          toast.error('Đã xảy ra lỗi');
        }
      }
    };

    return (
      <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSignup}
            enableReinitialize
      >
        {(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
        } = formik;
        return (
          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h1">Bạn chưa có tài khoản? Hãy đăng ký.</h1>
                </div>
                <div className="max-w-sm mx-auto">
                  <div className="flex items-center mb-6">
                    <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
                    <div className="text-gray-400">Đăng ký tài khoản</div>
                    <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="username">Tên đăng nhập <span className="text-red-600">*</span></label>
                        <input id="username" type="text" className="form-input w-full" placeholder="Nhập tên đăng nhập" value={values.username} onChange={handleChange} onBlur={handleBlur} required />
                        {errors.username && touched.username && (
                          <span className="text-red-500 text-[13px]">
                            {errors.username}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="fullname">Họ và tên<span className="text-red-600">*</span></label>
                        <input id="fullname" type="text" className="form-input w-full" placeholder="Nhập họ và tên" value={values.fullname} onChange={handleChange} onBlur={handleBlur} required />
                        {errors.fullname && touched.fullname && (
                          <span className="text-red-500 text-[13px]">
                            {errors.fullname}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                        <input id="email" type="email" className="form-input w-full text-gray-7" placeholder="you@yourcompany.com" value={values.email} onChange={handleChange} onBlur={handleBlur} required />
                        {errors.email && touched.email && (
                          <span className="text-red-500 text-[13px]">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">Mật khẩu <span className="text-red-600">*</span></label>
                        <input id="password" type="password" className="form-input w-full" placeholder="Mật khẩu (ít nhất 8 kí tự)" value={values.password} onChange={handleChange} onBlur={handleBlur} required />
                        {errors.password && touched.password && (
                          <span className="text-red-500 text-[13px]">
                            {errors.password}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="confirmPassword">Nhập lại mật khẩu <span className="text-red-600">*</span></label>
                        <input id="confirmPassword" type="password" className="form-input w-full" placeholder="Nhập lại mật khẩu" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} required />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <span className="text-red-500 text-[13px]">
                            {errors.confirmPassword}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 text-center">
                      Tôi đồng ý với chính sách <Link href="#" className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out">Privacy Policy</Link>.
                    </div>
                    <div className="flex flex-wrap -mx-3 mt-6">
                      <div className="w-full px-3">
                        <button className="btn text-white bg-black hover:bg-gray-700 w-full">Đăng ký</button>
                      </div>
                    </div>
                  </form>
                  <div className="text-gray-400 text-center mt-6">
                    Bạn đã có tài khoản? <Link to="/login" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Đăng nhập</Link>
                  </div>
                </div>
      
              </div>
            </div>
          </section>
      );
    }}
      </Formik>
    )
  }
  