import { createContext, useState } from "react";

const UserRoleContext = createContext(null);

const UserRoleContextProvider = ({ children }) => {
  const [userRoles, setUserRoles] = useState([]);
  const URL = "http://localhost:8081/userroles";

  return (
    <UserRoleContext.Provider value={[userRoles, setUserRoles, URL]}>
      {children}
    </UserRoleContext.Provider>
  );
};

export { UserRoleContext, UserRoleContextProvider };
