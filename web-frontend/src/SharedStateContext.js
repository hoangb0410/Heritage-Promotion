// SharedStateContext.js
import React, { createContext, useState } from 'react';

// Tạo một context mới
const SharedStateContext = createContext();
// Tạo một Provider cho Context
export const SharedStateProvider = ({ children }) => {
  // Khởi tạo state và setter
  const [loggedIn, setLoggedIn] = useState(false);

  // Trả về Provider với giá trị Context được cung cấp
  return (
    <SharedStateContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </SharedStateContext.Provider>
  );
};
// Xuất Context để sử dụng ở bất kỳ đâu
export default SharedStateContext;
