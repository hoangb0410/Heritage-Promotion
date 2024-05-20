import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormEvent = () => {

    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const apiUrl = process.env.REACT_APP_API_URL;
    const [formData, setFormData] = useState({
        event_name: '',
        event_date: '',
        content: '',
        image_link: '',
        video_link: '',
        heritage: '',
    })


    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
        if (!formData.event_name || !formData.event_date || !formData.image_link || !formData.video_link || !formData.content || !formData.heritage) {
            toast.warn('Vui lòng điền đầy đủ thông tin bắt buộc *',
            {
                position: "top-center",
            }
            ); 
            return;
        }

        const formattedDate = new Date(formData.event_date).toISOString();
        const updatedFormData = {
            ...formData,
            event_date: formattedDate
            };
        await axios.post(`${apiUrl}/v1/event/CreateEvent`, updatedFormData, {
            headers: {
              token: `Bearer ${accessToken}` 
            }
        });
        navigate('/admin/events');
        toast.success('Thêm sự kiện thành công!');
    } catch (error) {
        console.error('Error:', error);
        toast.error('Đã xảy ra lỗi!');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <section className="">
            <div className="px-2 sm:px-6 relative sm:p-10 flex flex-wrap">
                <div className="xl:w-[470px] md:w-[400px] sm-[400px] w-[400px] mx-auto p-6 bg-white border-2 rounded-2xl shadow-2xl ">
                    <h2 className="text-2xl font-bold mb-4 text-center">Thông tin sự kiện</h2>
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="event_name">Tên sự kiện:<span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                id="event_name"
                                name="event_name"
                                placeholder="Nhập tên sự kiện"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                value={formData.event_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="event_date">Ngày diễn ra:<span className="text-red-600">*</span></label>
                            <input
                                type="datetime-local"
                                id="event_date"
                                name="event_date"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                value={formData.event_date}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="image_link">Ảnh:</label>
                            <input
                                type="text"
                                id="image_link"
                                name="image_link"
                                placeholder="Nhập link ảnh sự kiện"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                value={formData.image_link}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="video_link">Video youtube:</label>
                            <input
                                type="text"
                                id="video_link"
                                name="video_link"
                                placeholder="Nhập link video youtube về sự kiện"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                value={formData.video_link}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="heritage">Về di sản:</label>
                            <input
                                type="text"
                                id="heritage"
                                name="heritage"
                                placeholder="Nhập id di sản"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                value={formData.heritage}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="content">Nội dung:<span className="text-red-600">*</span></label>
                            <textarea
                                id="content"
                                name="content"
                                placeholder="Nhập nội dung"
                                rows="4"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                value={formData.content}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex justify-between">
                            <div className="pt-2">
                                <div
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                >
                                    <Link className="px-1 py-2" to="/admin/events">Trở lại</Link>
                                </div>
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                >
                                    Thêm thông tin
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {/* <div className="xl:w-[470px] md:w-[400px] sm-[400px] w-[400px] mx-auto p-6 bg-white border-2 rounded-2xl shadow-2xl">
                    <h1 className="text-2xl h1">{formData.name}</h1>
                    <p className="flex flex-wrap">
                        {formData.address}
                    </p>
                    { formData.image_link && (<img className="w-full mb-4" src={formData.image_link} alt="heritage" />)}
                    <iframe className={`${formData.video_link ? '' : 'hidden'} w-full`} height="315" src={formData.video_link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    { formData.content.map((item, index) => (
                        <div key={index}>
                            <h3 className="h3 text-xl overflow-wrap break-words">
                                {item.name}
                            </h3>
                            <p className="break-words">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div> */}
            </div>
        </section>
    );
};

export default FormEvent;