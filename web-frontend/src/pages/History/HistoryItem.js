// components/HeritageItem.js
import React from 'react';
import { Link } from 'react-router-dom';

function HostoryItem({ contribute, handleAccept, handleOpen }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white">
          {contribute.name}
        </h5>
      </td>
      <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {contribute.address}
        </p>
      </td>
      <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <p className="text-black dark:text-white">
        {new Date(contribute.createdAt).toLocaleString()}        
        </p>
      </td>
      <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
      <p
        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
          contribute.status === 'approved'
            ? 'text-green-600 text-success'
            : contribute.status === 'pending'
            ? 'text-yellow-500 text-danger'
            : 'text-red-600 text-warning'
        }`}
      >
        { contribute.status === 'approved' ? 'Đã duyệt' : contribute.status === 'pending' ? 'Đang chờ' : 'Bị hủy' }
      </p>
    </td>
      <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex items-center space-x-1">
          <button className="hover:text-green-600 border rounded-md bg-green-200 px-1" onClick={() =>handleOpen("md", contribute._id)}>
            <span className="text-sm">Xem</span>
          </button>
          <button className="hover:text-blue-600 border rounded-md bg-blue-200 px-1">
            <Link to={`updatehistory/${contribute._id}`}><span className="text-sm">Sửa</span></Link>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default HostoryItem;
