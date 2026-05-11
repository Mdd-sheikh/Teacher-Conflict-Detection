import { createContext } from "react";

export const Context = createContext(null)


const ContextProvider = ({ children }) => {

    const API_URL = "https://teacher-conflict-detection-2.onrender.com/api"
    
    const value = {
        API_URL
    }

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default ContextProvider;