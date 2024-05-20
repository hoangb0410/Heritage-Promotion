import React from 'react';
import FeedBackItem from './FeedBackItem';
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

function Feedback() {
  const [feedbacks, setFeedBacks] = useState([]);
  const totalFeedbacks = feedbacks.length;
  const accessToken = localStorage.getItem('accessToken');
  const [size, setSize] = useState(null);
  const [id, setId] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const [dia, setDia] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/v1/inquiry/`, {
        headers: {
          token: `Bearer ${accessToken}` 
        }
      });
      setFeedBacks(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/v1/inquiry/${id}`, 
      {
        headers: {
          token: `Bearer ${accessToken}` 
        }
      }
    );
    setSize(null);
    toast.success('Xóa thành công!');
    // setFeedBacks(feedbacks.filter(feedback => feedback._id !== id));
   } catch (error) {
      console.error('Error deleting item: ', error);
      toast.error('Đã xảy ra lỗi!');
    }
  }

  const handleOpen = useCallback(async(value, id) => {
    setSize(value);
    setId(id);
    setDia(true);
    if (id) { 
      try {
      await axios.put(`${apiUrl}/v1/inquiry/update/${id}`,
      {
        status: "viewed"
      },
      {
        headers: {
          token: `Bearer ${accessToken}` 
        }
      }
    );
     } catch (error) {
      console.error('Error deleting item: ', error);
      toast.error('Đã xảy ra lỗi!');
    }
  }
  }, []);
  const handleOpenDelete = useCallback((value, id) => {
    setSize(value);
    setId(id);
    setDia(false);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filtereFeedbacks = feedbacks.filter(feedback =>
    feedback.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <h1 className="text-3xl font-semibold mb-4">
        Thông tin
      </h1>
        <div className="">
          <div className="flex flex-wrap lg:space-x-10 mb-10">
            <div className="bg-white rounded-lg border-none p-5 shadow-xl">
              <h2 className="text-xl font-semibold mb-2 flex justify-center">Số phản hồi</h2>
              <div className="flex justify-center">
                <span className="h3 text-3xl">{totalFeedbacks}</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto bg-white rounded-lg shadow-xl border p-5">
            <div className="flex justify-between m-4">
            <h2 className="text-xl font-semibold mb-4">Danh sách phản hồi từ người dùng</h2>
              <input
                  className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Tìm kiếm phản hồi..."
                  value={searchTerm}
                  onChange={handleSearch}
              />
            </div>
              <table className="w-full table-auto">
              <thead>
                <tr className="bg-blue-200 text-left dark:bg-meta-4">
                  <th className="py-4 px-2 font-medium text-black dark:text-white xl:pl-11">
                    Tên người dùng
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Email
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Tiêu đề
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Ngày gửi
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Trạng thái
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Thiết lập
                  </th>
                </tr>
              </thead>
              <tbody>
              { feedbacks.length > 0 ? (
                  filtereFeedbacks.map(feedback => (
                    <FeedBackItem 
                      key={feedback._id} 
                      feedback={feedback}
                      handleOpen={handleOpen}
                      handleOpenDelete={handleOpenDelete} 
                    />
                  ))
                ) : (
                  <tr><td className="m-5">Chưa có phản hồi từ người dùng</td></tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
        { dia ? <Dialog
          open={size === "sm"}
          size={size || "sm"}
          handler={handleOpen}
          style={{ borderRadius: "5px" }}
        >
          <DialogHeader>
            <h2 className="text-sm lg:text-[17px] text-blue-600 font-bold">
              NỘI DUNG TỪ NGƯỜI DÙNG
            </h2>
          </DialogHeader>
          <DialogBody divider>
            {feedbacks.map(fb =>(
              fb._id === id ? <p key={fb._id} className="text-sm text-black">{fb.content}</p> : <div key={fb._id}></div>
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
              Xóa phản hồi
            </h2>
            </DialogHeader>
            <DialogBody divider>
              <div className="mb-5 w-full">
                <p className="my-2 text-[#000000]">
                  Bạn có chắc là muốn xóa phản hồi này không?
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

export default Feedback;
