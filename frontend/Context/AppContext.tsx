"use client";
import React from "react";
import { createContext } from "react";

interface AppContextProps {
  isLogin: boolean;
  Login: () => void;
}
export const AppContext = createContext<AppContextProps>({
  isLogin: false,
  Login: () => {},
});
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    Login();
  });

  const [isLogin, setIsLogin] = React.useState(false);
  const Login = () => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
  };

  return (
    <>
      <AppContext.Provider value={{ Login, isLogin }}>
        {children}
      </AppContext.Provider>
    </>
  );
};

export default AppProvider;

// export default AppContext
