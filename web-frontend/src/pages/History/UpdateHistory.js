import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormHistory = () => {

    const params = useParams();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    const apiUrl = process.env.REACT_APP_API_URL;
    const [formData, setFormData] = useState({
        name: '',
        region: '',
        province_name: '',
        category: '',
        type: '',
        address: '',
        image_link: '',
        video_link: '',
        map_diagram: '',
        source: '',
        content: [{ name: '', description: '' }]
    })
    const regions = [
        {
            name: 'Bắc',
            provinces: ['Lào Cai', 'Yên Bái', 'Điện Biên', 'Hòa Bình', 'Lai Châu', 'Sơn La', 'Hà Giang', 'Cao Bằng', 'Bắc Kạn', 'Lạng Sơn', 'Tuyên Quang', 'Thái Nguyên', 'Phú Thọ', 'Bắc Giang', 'Quảng Ninh', 'Bắc Ninh', 'Hà Nam', 'Hà Nội', 'Hải Dương', 'Hưng Yên', 'Hải Phòng', 'Nam Định', 'Ninh Bình', 'Thái Bình', 'Vĩnh Phúc']
        },
        {
            name: 'Trung',
            provinces: ['Thanh Hoá', 'Nghệ An', 'Hà Tĩnh', 'Quảng Bình', 'Quảng Trị', 'Thừa Thiên-Huế', 'Kon Tum', 'Gia Lai', 'Đắc Lắc', 'Đắc Nông', 'Lâm Đồng', 'Đà Nẵng', 'Quảng Nam', 'Quảng Ngãi', 'Bình Định', 'Phú Yên', 'Khánh Hoà', 'Ninh Thuận']
        },
        {
            name: 'Nam',
            provinces: ['An Giang', 'Bạc Liêu', 'Bà Rịa - Vũng Tàu', 'Bến Tre', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau', 'Cần Thơ', 'Đồng Tháp', 'Đồng Nai', 'Hậu Giang', 'Kiên Giang', 'Long An', 'Sóc Trăng', 'Tây Ninh', 'Thành phố Hồ Chí Minh', 'Tiền Giang', 'Trà Vinh', 'Vĩnh Long']
        }
      ];

      const categorys = [
        {
            name: 'tangible',
            types: ['scenic spots', 'historical sites']
        },
        {
            name: 'intangible',
            types: ['arts', 'festivals', 'customs and beliefs', 'spoken and written language', 'crafts', 'folk knowledge']
        }
      ];
      useEffect(() => {
        const fetchSiteId = async () => {
          try {
            const response = await axios.get(`${apiUrl}/v1/heritage/${params.id}`, {
              headers: {
                token: `Bearer ${accessToken}` 
              }
            });
            setFormData(response.data);
          } catch (error) {
            console.error('Error fetching heritage:', error);
          }
        };
    
        fetchSiteId();
    }, []);

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
        if (!formData.name || !formData.province_name || !formData.image_link || !formData.category || !formData.type || !formData.content) {
            toast.warn('Vui lòng điền đầy đủ thông tin bắt buộc *',
            {
                position: "top-center",
            }
            ); 
            return;
        }
        const filteredContent = formData.content.filter(item => item.description.trim() !== '');

        const updatedFormData = {
        ...formData,
        content: filteredContent
        };

        await axios.put(`${apiUrl}/v1/heritage/update/${params.id}`, updatedFormData, {
            headers: {
              token: `Bearer ${accessToken}` 
            }
        });
        navigate('/history');
        toast.success('Cập nhật đóng góp thành công!');
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

    const handleAddContents = () => {
        if (formData.content.some(item => item.description.trim() === '')) {
            toast.warn('Vui lòng điền đầy đủ thông tin cho các phần tử nội dung trước khi thêm mới.',
            {
                position: "top-center",
            }
            );
            return;
        }
        setFormData({
            ...formData,
            content: [...formData.content, { name: '', description: '' }]
        });
    };

    const handleAddNewContents = (index) => {
        if (formData.content.some(item => item.description.trim() === '')) {
            toast.warn('Vui lòng điền đầy đủ thông tin cho các phần tử nội dung trước khi thêm mới.',
            {
                position: "top-center",
            }
            );
            return;
        }
        const newContent = [...formData.content];
        newContent.splice(index, 0, { name: '', description: '' });
        setFormData(prevState => ({
            ...prevState,
            content: newContent
        }));
    }
    
    const handleContentChange = (e, index, field) => {
        const newContents = [...formData.content];
        newContents[index][field] = e.target.value;
        setFormData({
            ...formData,
            content: newContents
        });
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <section className="pt-10">
            <h1 className="font-bold text-[35px] uppercase pt-20 pl-20">
                CẬP NHẬT ĐÓNG GÓP
            </h1>
            <div className="px-2 sm:px-6 relative sm:p-10 flex flex-wrap">
                <div className="xl:w-[600px] md:w-[450px] sm-[400px] w-[400px] mx-auto p-6 bg-white border-2 rounded-2xl shadow-2xl ">
                    <h2 className="text-2xl font-bold mb-4 text-center">Thông tin di sản văn hóa</h2>
                    <form onSubmit={handleSubmit} className="space-y-2">
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="name">Tên di sản:<span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Nhập tên di sản"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="province">Miền:<span className="text-red-600">*</span></label>
                            <select
                                id="region"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                value={formData.region}
                                name="region"
                                onChange={handleChange}
                            >
                                <option value="">Chọn miền</option>
                                {regions.map((region, index) => (
                                <option key={index} value={region.name}>
                                    {region.name}
                                </option>
                                ))}
                            </select>
                            <div>
                                <label className="block text-gray-700 my-1" htmlFor="province_name">Tỉnh/Thành phố:<span className="text-red-600">*</span></label>
                                <select
                                    id="province_name"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    value={formData.province_name}
                                    name="province_name"
                                    onChange={handleChange}
                                >
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    { formData.region && (
                                        regions.find(region => region.name === formData.region).provinces.map((province, index) => (
                                        <option key={index} value={province}>
                                            {province}
                                        </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="category">Danh mục:<span className="text-red-600">*</span></label>
                            <select
                                id="category"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                value={formData.category}
                                name="category"
                                onChange={handleChange}
                            >
                                <option value="">Chọn danh mục</option>
                                {categorys.map((category, index) => (
                                <option key={index} value={category.name}>
                                    {category.name  === 'tangible' ? 'Di sản vật thể' : 'Di sản phi vật thể'}
                                </option>
                                ))}
                            </select>
                            <div>
                                <label className="block text-gray-700 my-1" htmlFor="type">Loại hình di sản:<span className="text-red-600">*</span></label>
                                <select
                                    id="type"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    value={formData.type}
                                    name="type"
                                    onChange={handleChange}
                                >
                                    <option value="">Chọn loại hình</option>
                                    { formData.category && (
                                        categorys.find(category => category.name === formData.category).types.map((type, index) => (
                                        <option key={index} value={type}>
                                            {type === 'scenic spots' ? 'Danh lam thắng cảnh' : type === 'historical sites' ? 'Di tích lịch sử' : type === 'arts' ? 'Nghệ thuật' : type === 'festivals' ? 'Lễ hội' : type === 'customs and beliefs' ? 'Tập quán và tín ngưỡng' : type === 'spoken and written language' ? 'Tiếng nói - chữ viết' : type === 'crafts' ? 'Nghề thủ công' : 'Tri thức dân gian'}
                                        </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="address">Địa chỉ:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Nhập địa chỉ"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="image_link">Ảnh:<span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                id="image_link"
                                name="image_link"
                                placeholder="Nhập link ảnh"
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
                                placeholder="Nhập link video youtube về di sản"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                value={formData.video_link}
                                onChange={handleChange}
                            />
                        </div>
                        {formData.category === 'tangible' ? (<div>
                            <label className="block text-gray-700 mb-1" htmlFor="map_diagram">Bản đồ:</label>
                            <input
                                type="text"
                                id="map_diagram"
                                name="map_diagram"
                                placeholder="Nhập link ảnh bản đồ"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                value={formData.map_diagram}
                                onChange={handleChange}
                            />
                        </div>) : <div></div>}
                        <div>
                            <label className="block text-gray-700 mb-1" htmlFor="source">Nguồn tham khảo:</label>
                            <input
                                type="text"
                                id="source"
                                name="source"
                                placeholder="Nhập link tham khảo"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                value={formData.source}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700" htmlFor="content">Giới thiệu:<span className="text-red-600">*</span></label>
                            { formData.content.map((item, index) => (
                                <div key={index}>
                                    <div className="relative flex justify-center opacity-0 hover:opacity-100 transition duration-300">
                                        <button type="button" onClick={() => handleAddNewContents(index)}>
                                            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        id={`name${index}`}
                                        name={`name${index}`}
                                        placeholder="Nhập tiêu đề"
                                        className="mb-3 w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        value={item.name}
                                        onChange={(e) => handleContentChange(e, index, 'name')}
                                    />
                                    <textarea
                                        id={`description${index}`}
                                        name={`description${index}`}
                                        placeholder="Nhập nội dung"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        rows="4"
                                        value={item.description}
                                        onChange={(e) => handleContentChange(e, index, 'description')}
                                    ></textarea>
                                </div>
                            ))}
                            <div className="relative flex justify-center opacity-0 hover:opacity-100 transition duration-300">
                                <button type="button" onClick={handleAddContents}>
                                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div
                                onClick={handleGoBack}
                                    className="hover:cursor-pointer px-4 py-2 rounded-md hover:bg-blue-400 focus:outline-none border focus:bg-blue-600"
                                >
                                <span>Trở lại</span>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                >
                                    Đóng góp thông tin
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="xl:w-[600px] md:w-[450px] sm-[400px] w-[400px] mx-auto p-6 bg-white border-2 rounded-2xl shadow-2xl">
                    <h1 className="text-2xl h1">{formData.name}</h1>
                    <p className="flex flex-wrap">
                        {formData.address}
                    </p>
                    { formData.image_link && (<img className="w-full mb-4" src={formData.image_link} alt="heritage" />)}
                    <iframe className={`${formData.video_link ? '' : 'hidden'} w-full`} height="315" src={formData.video_link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
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
                </div>
            </div>
        </section>
    );
};

export default FormHistory;