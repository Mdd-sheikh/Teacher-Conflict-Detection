import { createContext } from "react";

export const Context = createContext(null)


const ContextProvider = ({ children }) => {
    const name = "priyanka"

    const API_URL = "https://teacher-conflict-detection-2.onrender.com/api"
    
    const value = {
        API_URL,name
    }
    

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default ContextProvider;