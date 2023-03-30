const { createContext, useState, useEffect } = require("react");

const LoginContext = createContext(null);

const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(true);
    }
  }, []);
  console.log("user is logged in", login);
  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };
