import React from 'react';
import ContributeItem from './ContributeItem';
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

function ContributionManagement() {

  const [contributes, setContributes] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const totalContribute = contributes.length;
  const [searchTerm, setSearchTerm] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const [size, setSize] = useState(null);
  const [id, setId] = useState("");
  const [dia, setDia] = useState(false);


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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/heritage/`, {
          headers: {
            token: `Bearer ${accessToken}` 
          }
        });
        const contributionData = response.data.filter(contribution  => contribution.status === 'pending');
        setContributes(contributionData);
        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  const handleAccept = async (id) => {
    try {
      await axios.put(`${apiUrl}/v1/heritage/update/${id}`, 
      {
        status: "approved"
      },
      {
        headers: {
          token: `Bearer ${accessToken}` 
        }
      }
    );
    setSize(null);
    toast.success('Duyệt thành công!');
    setContributes(contributes.filter(contribute  => contribute._id !== id));
   } catch (error) {
      console.error('Error deleting item: ', error);
      toast.success('Đã xảy ra lỗi!');
    }
  }

  const handleCancel = async (id) => {
    try {
      await axios.put(`${apiUrl}/v1/heritage/update/${id}`, 
      {
        status: "rejected"
      },
      {
        headers: {
          token: `Bearer ${accessToken}` 
        }
      }
    );
    setSize(null);
    toast.success('Từ chối đóng góp thành công!');
    setContributes(contributes.filter(contribute  => contribute._id !== id));
   } catch (error) {
      console.error('Error deleting item: ', error);
      toast.success('Đã xảy ra lỗi!');
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filtereHeritages = contributes.filter(contribute =>
    contribute.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto p-5">
      <h1 className="text-3xl font-semibold mb-4">
        Thông tin
      </h1>
        <div className="">
          <div className="flex flex-wrap lg:space-x-10 mb-10">
            <div className="bg-white rounded-lg border-none p-5 shadow-xl max-w-xs flex items-center flex-col">
              <h2 className="text-xl font-semibold mb-2">Đóng góp đang chờ</h2>
              <span className="text-3xl font-bold mb-1">{totalContribute}</span>
            </div>
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow-xl border p-5">
            <div className="flex justify-between m-4">
            <h2 className="text-xl font-semibold mb-4">Danh sách đóng góp</h2>
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
                    Địa điểm
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Ngày đóng góp
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Thiết lập
                  </th>
                </tr>
              </thead>
              <tbody>
              { contributes.length > 0 ? (
                  filtereHeritages.map(contribute => (
                    <ContributeItem 
                      key={contribute._id} 
                      contribute={contribute} 
                      handleOpen={handleOpen} 
                      handleOpenDelete={handleOpenDelete}
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
            <h2 className="text-sm lg:text-[17px] text-blue-500 font-bold">
              Duyệt đóng góp
            </h2>
            </DialogHeader>
            <DialogBody divider>
              <div className="mb-5 w-full">
                <p className="my-2 text-[#000000]">
                  Bạn có muốn duyệt đóng góp này không?
                  </p>
                </div>
            </DialogBody>
            <DialogFooter>
              <button
                className="px-6 py-2 mr-1 text-sm text-red-500 border-none hover:bg-red-300 rounded-lg"
                onClick={() => handleOpen(null)}
              >
                Hủy
              </button>
              <button
                className="px-6 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 border rounded-lg"
                onClick={() => handleAccept(id)}
              >
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
              Hủy đóng góp
            </h2>
            </DialogHeader>
            <DialogBody divider>
              <div className="mb-5 w-full">
                <p className="my-2 text-[#000000]">
                  Bạn có muốn hủy đóng góp này không?
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
                onClick={() => handleCancel(id)}
              >
                Tiếp tục
              </button>
            </DialogFooter>
        </Dialog>
      }
    </div>
  );
}

export default ContributionManagement;
