import React from 'react';
import { Link } from 'react-router-dom';
import EventItem from './EventIterm';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Events() {

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const totalHeritage = events.length;
  const apiUrl = process.env.REACT_APP_API_URL;
  const [size, setSize] = useState(null);
  const [id, setId] = useState("");

  const handleOpen = useCallback((value, id) => {
    setSize(value);
    setId(id);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/event/`, {
          headers: {
            token: `Bearer ${accessToken}` 
          }
        });
        setEvents(response.data);
        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/v1/event/${id}`, 
      {
        headers: {
          token: `Bearer ${accessToken}` 
        }
      }
    );
    setSize(null);
    toast.success('Xóa thành công!');
    setEvents(events.filter(event => event._id !== id));
   } catch (error) {
      console.error('Error deleting item: ', error);
      toast.success('Đã xảy ra lỗi!');
    }
  }
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filtereEvents = events.filter(event =>
    event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto p-5">
      <h1 className="text-3xl font-semibold mb-4">
        Thông tin
      </h1>
        <div className="">
          <div className="flex flex-wrap lg:space-x-10 mb-10">
            <div className="bg-white rounded-lg border-none p-5 shadow-xl max-w-72">
              <h2 className="text-xl font-semibold mb-2 flex justify-center">Tổng số sự kiện</h2>
              <div className="flex justify-center">
                <span className="h3 text-3xl">{totalHeritage}</span>
              </div>
              <Link to="create-event">
                <button className="p-2 text-green-500">
                  <i className="fas fa-plusn text-xl"></i>&ensp;+&ensp;Thêm mới
                </button>
              </Link>
            </div>
          </div>
          {/* Heritage List */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-xl border p-5">
            <div className="flex justify-between m-4">
            <h2 className="text-xl font-semibold mb-4">Danh sách sự kiện</h2>
              <input
                  className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="Tìm kiếm sự kiện..."
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
                    Giới thiệu
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Ngày diễn ra
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Thiết lập
                  </th>
                </tr>
              </thead>
              <tbody>
              { events.length > 0 ? (
                  filtereEvents.map(event => (
                    <EventItem 
                      key={event._id} 
                      event={event} 
                      handleOpen={handleOpen}
                    />
                  ))
                ) : (
                  <tr><td className="m-5">Chưa có sự kiện</td></tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
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
          handler={handleOpen}
          style={{ borderRadius: "5px" }}
        >
          <DialogHeader>
            <h2 className="text-sm lg:text-[17px] text-[#c40404] font-bold">
              Xóa sự kiên
            </h2>
            </DialogHeader>
            <DialogBody divider>
              <div className="mb-5 w-full">
                <p className="my-2 text-[#000000]">
                  Bạn có chắc là muốn xóa sự kiện này không?
                  </p>
                </div>
            </DialogBody>
            <DialogFooter>
              <button
                className="px-6 py-2 mr-1 text-sm text-blue-500 border-none hover:bg-blue-300 rounded-lg"
                onClick={() => handleOpen(null)}
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
    </div>
  );
}

export default Events;
