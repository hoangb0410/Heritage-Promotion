import React from 'react';
import HistoryItem from './HistoryItem';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
function History() {
  const [size, setSize] = useState(null);
  const [id, setId] = useState("");
  const [contributes, setContributes] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const idUser = localStorage.getItem('id');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/heritage/`, {
          headers: {
            token: `Bearer ${accessToken}` 
          }
        });
        const contributionData = response.data.filter(contribution  => contribution.author === idUser);
        setContributes(contributionData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleOpen = useCallback((value, id) => {
    setSize(value);
    setId(id);
  }, []);

  return (
    <div className="mx-auto p-10">
        <div className="pt-20">
          <div className="overflow-x-auto bg-white rounded-lg shadow-xl border p-5">
            <h2 className="text-xl font-semibold mb-4">Lịch sử đóng góp</h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-blue-200 text-left dark:bg-meta-4">
                  <th className="py-4 px-2 font-medium text-black dark:text-white xl:pl-11">
                    Tên
                  </th>
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Địa điểm
                  </th>
                  
                  <th className="py-4 px-2 font-medium text-black dark:text-white">
                    Ngày đóng góp
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
              { contributes.length > 0 ? (
                  contributes.map(contribute => (
                    <HistoryItem 
                      key={contribute._id} 
                      contribute={contribute} 
                      handleOpen={handleOpen}
                    />
                  ))
                ) : (
                  <tr><td className="m-5">Chưa có đóng góp</td></tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
        <Dialog
          open={size === "md"}
          size={size || "sm"|| "md" || "lg" || "xl" || "xxl"}
          handler={handleOpen}
          style={{ borderRadius: "10px" }}
        >
          <DialogHeader>
            <h2 className="text-sm lg:text-[17px] text-blue-600 font-bold">
            {contributes.map(contribute =>(
              contribute._id === id ? <div key={contribute._id}>
                <p className="text-black">{contribute.name}</p>
                <p className="text-sm text-grey-600">{contribute.address}</p>
              </div>  : <div key={contribute._id}></div>
            ))}
            </h2>
          </DialogHeader>
          <DialogBody divider className="2xl:max-h-[32rem] xl:max-h-[28rem] lg:max-h-[25rem] max-h-[22rem] overflow-scroll">
            {contributes.map(contribute =>(
              contribute._id === id ? 
              <div key={contribute._id}>
                <img className="w-full mb-2" src={contribute.image_link} alt='ảnh'/>
                <iframe className={`${contribute.video_link ? '' : 'hidden'} w-full`} height="315" src={contribute.video_link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                { contribute.content.map((item) => (
                    <div key={item._id}>
                      <h3 className="h3 text-xl overflow-wrap break-words">
                        {item.name}
                      </h3>
                      <p className="break-words">
                        {item.description}
                      </p>
                    </div>
                  ))}
              </div> : <div key={contribute._id}></div>
            ))}
          </DialogBody>
          <DialogFooter>
            <button className="px-6 py-2 text-sm text-white border rounded-md bg-blue-600" onClick={() => handleOpen(null)}>
              Tiếp tục
            </button>
          </DialogFooter>
        </Dialog>
    </div>
  );
}

export default History;
