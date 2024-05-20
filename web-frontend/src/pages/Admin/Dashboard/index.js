import React from 'react';
import HeritageItem from './HeritageItem';
import Charts from './Chart';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [sites, setSites] = useState([]);
  const [users, setUses] = useState([]);
  const totalUsers = users.length;
  const totalHeritages = sites.length;  
  const accessToken = localStorage.getItem('accessToken');
  const [size, setSize] = useState(null);
  const [id, setId] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const [dia, setDia] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/heritage/`);
        setSites(response.data);
      } catch (error) {
        console.error('Error fetching sites:', error);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/user/`, {
          headers: {
            token: `Bearer ${accessToken}` 
          }
        });
        setUses(response.data);
        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchSites();
    fetchUsers();
  }, []); 

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/v1/heritage/${id}`, 
      {
        headers: {
          token: `Bearer ${accessToken}` 
        }
      }
    );
    setSize(null);
    toast.success('Xóa thành công!');
    setSites(sites.filter(site => site._id !== id));
   } catch (error) {
      console.error('Error deleting item: ', error);
      toast.success('Đã xảy ra lỗi!');
    }
  }

  const handleOpen = useCallback((value, id) => {
    setSize(value);
    setId(id);
    setDia(true);
  }, []);

  const handleOpenDelete = useCallback((value, id) => {
    setSize(value);
    setId(id);
    setDia(false);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filtereHeritages = sites.filter(site =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto p-5 h-full">
      <h1 className="text-3xl font-semibold mb-4">
        Thông tin
      </h1>
        <div className="">
          <div className="flex lg:space-x-10 mb-10">
            <div className="shrink pr-5">
              <div className="bg-white rounded-lg border-none p-6 shadow-xl w-33 h:15 md:w-33 md:h-25 mb-5">
                <h2 className="text:sm md:text-xl font-semibold mb-2 flex justify-center">Người dùng đăng ký</h2>
                <div className="flex justify-center">
                  <span className="h3 text:xl md:text-3xl">{totalUsers}</span>
                </div>
              </div>
              <div className="bg-white rounded-lg border-none p-6 shadow-xl w-33 h:15 md:w-72 md:h-25">
                <h2 className="text:sm md:text-xl font-semibold mb-2 flex justify-center">Tổng số đóng góp</h2>
                <div className="flex justify-center">
                  <span className="h3 text:xl md:text-3xl">{totalHeritages}</span>
                </div>
              </div>
            </div>
            <div className="flex-auto bg-white rounded-lg border-none shadow-xl">
              <Charts />
            </div>
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow-xl border p-5">
            <div className="flex justify-between m-4">
            <h2 className="text-xl font-semibold mb-4">Đóng góp gần đây</h2>
              <input
                  className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Tìm kiếm đóng góp..."
                  value={searchTerm}
                  onChange={handleSearch}
              />
            </div>
              <table className="w-full table-auto">
              <thead>
                <tr className="bg-blue-200 text-left dark:bg-meta-4">
                  <th className="py-4 px-2 font-medium text-black dark:text-white xl:pl-11">
                    Tên
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Tỉnh
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Ngày đóng góp
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Trạng Thái
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Thiết lập
                  </th>
                </tr>
              </thead>
              <tbody>
              { sites.length > 0 ? (
                  filtereHeritages.map(site => (
                    <HeritageItem 
                      key={site._id} 
                      heritage={site} 
                      handleOpenDelete={handleOpenDelete} 
                      handleOpen={handleOpen}
                    />
                  ))
                ) : (
                  <tr><td className="p-5">Chưa có đóng góp</td></tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
        { dia ? <Dialog
          open={size === "sm"}
          size={size || "sm"}
          handler={handleOpen}
          style={{ borderRadius: "0px" }}
        >
          <DialogHeader>
            <h2 className="text-sm lg:text-[17px] text-blue-600 font-bold">
            {sites.map(site => (
              site._id === id ? (
                <div key={site._id}>
                  <p className="text-black">{site.name}</p>
                  <p className="text-sm text-grey-600">{site.address}</p>
                </div>
              ) : (
                <div key={site._id}></div>
              )
            ))}
            </h2>
          </DialogHeader>
          <DialogBody divider className="2xl:max-h-[32rem] xl:max-h-[28rem] lg:max-h-[25rem] max-h-[22rem] overflow-scroll">
            {sites.map(site =>(
              site._id === id ? 
              <div key={site._id}>
                <img src={site.image_link} alt="ảnh" />
                <iframe className={`${site.video_link ? '' : 'hidden'} w-full`} height="315" src={site.video_link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                { site.content.map((item, index) => (
                    <div key={index}>
                      <h3 className="h3 text-xl overflow-wrap break-words">
                        {item.name}
                      </h3>
                      <p className="break-words">
                        {item.description}
                      </p>
                    </div>
                  ))}
              </div> : <div key={site._id}></div>
            ))}
          </DialogBody>
          <DialogFooter>
            <button className="px-6 py-2 text-sm text-white border rounded-md bg-blue-600" onClick={() => handleOpen(null)}>
              Tiếp tục
            </button>
          </DialogFooter>
        </Dialog>
        :
        <Dialog
          open={
            size === "xs" ||
            size === "sm" ||
            size === "md" ||
            size === "lg" ||
            size === "xl" ||
            size === "xxl"
          }
          size={size || "sm"}
          handler={handleOpenDelete}
          style={{ borderRadius: "5px" }}
        >
          <DialogHeader>
            <h2 className="text-sm lg:text-[17px] text-[#c40404] font-bold">
              Xóa đóng góp
            </h2>
            </DialogHeader>
            <DialogBody divider>
              <div className="mb-5 w-full">
                <p className="my-2 text-[#000000]">
                  Bạn có chắc là muốn xóa đóng góp này không?
                  </p>
                </div>
            </DialogBody>
            <DialogFooter>
              <button
                className="px-6 py-2 mr-1 text-sm text-blue-500 border-none hover:bg-blue-300 rounded-lg"
                onClick={() => handleOpenDelete(null)}
              >
                Hủy
              </button>
              <button
                className="px-6 py-2 text-sm text-white bg-red-500 hover:bg-red-600 border rounded-lg"
                onClick={() => handleDelete(id)}
              >
                Tiếp tục
              </button>
            </DialogFooter>
        </Dialog> 
        }
    </div>
  );
}

export default Dashboard;
