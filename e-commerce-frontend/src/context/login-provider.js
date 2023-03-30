import { createContext, useEffect, useState } from "react";


export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setLogin(true)
        }

    }, [])
    console.log("User is logged in", login)
    return (
        <LoginContext.Provider value={{ login, setLogin }} >
            {children}
        </LoginContext.Provider >
    )
}