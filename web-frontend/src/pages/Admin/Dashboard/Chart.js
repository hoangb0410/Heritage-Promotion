import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const Charts = () => {
  const [data, setData] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      const [usersResponse, contributionsResponse] = await Promise.all([
        axios.get(`${apiUrl}/v1/user/`, {
          headers: {
            token: `Bearer ${accessToken}` 
          }
        }),
        axios.get(`${apiUrl}/v1/heritage/`)
      ]);

      const usersData = usersResponse.data;
      const contributionsData = contributionsResponse.data;

      const processedData = processData(usersData, contributionsData);
      setData(processedData);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const processData = (usersData, contributionsData) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    // Khởi tạo đối tượng chứa dữ liệu cho mỗi tháng từ đầu năm đến hiện tại
    const monthlyData = {};
    for (let month = 1; month <= currentMonth; month++) {
      const key = `${currentYear}-${month}`;
      monthlyData[key] = { name: `Tháng ${month}/${currentYear}`, nguoidung: 0, donggop: 0 };
    }

    // Xử lý dữ liệu người dùng từ API
    usersData.forEach(item => {
      const date = new Date(item.createdAt);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      if (year === currentYear) {
        const key = `${year}-${month}`;
        if (!monthlyData[key]) {
          monthlyData[key] = { name: `Tháng ${month}/${year}`, nguoidung: 0, donggop: 0 };
        }
        monthlyData[key].nguoidung += 1;
      }
    });

    // Xử lý dữ liệu đóng góp từ API
    contributionsData.forEach(item => {
      const date = new Date(item.createdAt);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      if (year === currentYear) {
        const key = `${year}-${month}`;
        if (!monthlyData[key]) {
          monthlyData[key] = { name: `Tháng ${month}/${year}`, nguoidung: 0, donggop: 0 };
        }
        monthlyData[key].donggop += 1;
      }
    });

    // Chuyển đổi object thành mảng
    return Object.values(monthlyData);
  };

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="nguoidung" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="donggop" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Charts;
