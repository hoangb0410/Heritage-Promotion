import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormSupport = () => {
    const initialValues = {
        name: "",
        email: "",
        subject: "",
        content: "",
      };
    const apiUrl = process.env.REACT_APP_API_URL;

    const validate = (values) => {
        let errors = {};
        // const regex =
        //   /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!regex_email.test(values.email)){
          errors.email = "! Vui lòng nhập Email";
        } else if (values.email.length > 30) {
          errors.email = "! Email không vượt quá 30 ký tự";
        }
        if (!values.name) {
          errors.name = "! Vui lòng nhập Họ và tên";
        } else if (values.name.length > 30) {
          errors.name = "! Họ và tên không vượt quá 30 ký tự";
        }
        if (!values.subject) {
            errors.subject = "! Vui lòng nhập tiêu đề cần giúp đỡ";
          } else if (values.subject.length > 100) {
            errors.subject = "! Tiêu đề không vượt quá 100 ký tự";
          }
        if (!values.content) {
          errors.content = "! Vui lòng nhập nội dung";
        } else if (values.content.length > 200) {
          errors.content = "! Nội dung không vượt quá 200 ký tự";
        }
        return errors;
      };

    const handleSubmit = async(values, {resetForm}) => {
        try {
            await axios.post(`${apiUrl}/v1/inquiry/createInquiry`, values);
            resetForm({
                name: "",
                email: "",
                subject: "",
                content: "",
            })
            toast.success('Gửi phản hồi thành công!',
            {
                position: "top-center",
            }
            );
        } catch (error) {
            console.error('There was a problem with your axios request:', error);
            toast.success('Đã xảy ra lỗi!',
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
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
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
                <section>
                <div className="px-4 sm:px-6 relative pt-20 sm:p-32">
                <div className="max-w-3xl mx-auto p-6 bg-white border-2 rounded-2xl shadow-2xl ">
                    <div className="text-center leading-6">
                        <h1 className="text-2xl font-bold mb-4">Hãy đóng góp ý kiến về hệ thống của chúng tôi</h1>
                        <p className="text-xl font-thin text-[12px] lg:text-[13px]">Email: supports@dsvn.vn</p>
                        <p className="text-xl font-thin text-[12px] lg:text-[13px]">Đường dây nóng: 19000000</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4" >
                        <div className="grid grid-cols-2 gap-x-2 mb-5ex">
                            <div>
                                <label className="block text-gray-700 mb-2" htmlFor="name">Tên:</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Họ và tên"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name && (
                                    <span className="text-red-500 text-[13px]">
                                        {errors.name}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2" htmlFor="name">Email:</label>
                                    <input
                                        type="text"
                                        id="email"
                                        placeholder="Email"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                />
                                {errors.email && touched.email && (
                                <span className="text-red-500 text-[13px]">
                                    {errors.email}
                                </span>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="subject">Tiêu đề:</label>
                                <input
                                    type="text"
                                    id="subject"
                                    placeholder="Tiêu đề"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    value={values.subject}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.subject && touched.subject && (
                                <span className="text-red-500 text-[13px]">
                                    {errors.subject}
                                </span>
                                )}
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="content">Nội dung:</label>
                            <textarea
                                id="content"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                rows="4"
                                placeholder="Nội dung"
                                value={values.content}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            ></textarea>
                            {errors.content && touched.content && (
                                <span className="text-red-500 text-[13px]">
                                    {errors.content}
                                </span>
                            )}
                        </div>
                            <div className="flex justify-between">
                                <div>
                                    <div
                                        onClick={handleGoBack}
                                        className="hover:cursor-pointer px-4 py-2 rounded-md hover:bg-blue-400 focus:outline-none border focus:bg-blue-600"
                                    >
                                        <span>Trở lại</span>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                    >
                                        Gửi phản hồi
                                    </button>
                                </div>
                            </div>
                    </form>
                    
                </div>
                </div>
                </section>
                );
            }}
            </Formik>
    );
};

export default FormSupport;