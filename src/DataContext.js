 import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
  const [data, setData] = useState({});
  const setValues = (values) => {
    setData((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  return (
    <DataContext.Provider value={{ data, setValues }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);

export default DataProvider;
