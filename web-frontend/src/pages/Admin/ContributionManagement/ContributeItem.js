import React from 'react';
import { Link } from 'react-router-dom';

function ContributeItem({ contribute, handleOpen, handleOpenDelete }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="border-b border-[#eee] py-5 px-2 pl-9 dark:border-strokedark xl:pl-11">
        <h5 className="font-medium text-black dark:text-white">
          {contribute.name}
        </h5>
      </td>
      <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {contribute.province_name}
        </p>
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
        <div className="flex items-center space-x-1">
          <button className="hover:text-green-600 border rounded-md bg-green-200 px-1">
            <Link to={`update-contribute/${contribute._id}`}>
              <span className="text-sm">Sửa</span>
            </Link>
          </button>
          <button className="hover:text-blue-600 border rounded-md bg-blue-200 px-1" onClick={() => handleOpen("xs" ,contribute._id)}>
            <span className="text-sm">Duyệt</span>
          </button>
          <button className="hover:text-red-600 border rounded-md bg-red-200 px-1" onClick={() => handleOpenDelete("xs" ,contribute._id)}>
            <span className="text-sm">Hủy</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ContributeItem;
