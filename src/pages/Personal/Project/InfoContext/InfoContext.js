import React, { createContext, useContext, useState } from 'react';
const InfoContext = createContext();
export const InfoProvider = ({ children }) => {
  const [infoList, setInfoList] = useState([
    { projectName: 'ZJ校大创', applicantName: '申请人A', startDate: '2024-09-01' },
    { projectName: 'ZJ校大创', applicantName: '申请人B', startDate: '2024-09-02' },
    // Initial data
  ]);

  const addInfo = (newInfo) => {
    setInfoList((prevInfoList) => [...prevInfoList, newInfo]);
  };

  return (
    <InfoContext.Provider value={{ infoList, addInfo }}>
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = () => useContext(InfoContext);
