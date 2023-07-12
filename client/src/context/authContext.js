import { createContext, useEffect, useState } from "react";
import axios from axios;
import {Global} from "../Global/Global"

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null,
  );

  const login = async (inputs) => {
    const response = await axios.post(`${Global.baseURL}/api/v1/users/login`, inputs)
    setCurrentUser(response.data);
  }

  const logout = async (inputs) => {
    await axios.post(`${Global.baseURL}/api/v1/users/logout`);
    setCurrentUser(null);
  }

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser])

  return (
    <AuthContext.Provider value={{currentUser, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
};
