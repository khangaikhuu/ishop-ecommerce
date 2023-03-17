import { createContext, useState } from "react";

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState(0);
  const [users, setUsers] = useState([]);
  const URL = "http://localhost:8181/users";

  return (
    <UserContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        users,
        setUsers,
        URL,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
