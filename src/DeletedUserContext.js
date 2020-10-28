import React, { createContext, useState, useContext } from "react";

const DeletedUserContext = createContext();

function DeletedUserProvider({ children }) {
  const [DeletedUser, setDeletedUser] = useState({});

  return (
    <DeletedUserContext.Provider value={{ DeletedUser, setDeletedUser }}>
      {children}
    </DeletedUserContext.Provider>
  );
}

export const useDeletedUser = () => useContext(DeletedUserContext);

export default DeletedUserProvider;
