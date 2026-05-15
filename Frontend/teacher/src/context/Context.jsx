import { createContext, useState } from "react";

export const Context = createContext(null)


const ContextProvider = ({ children }) => {
    const [Teacherdata, setteacherdata] = useState([])
    const API_URL = "https://teacher-conflict-detection-2.onrender.com";

    const value = {
        Teacherdata,
        setteacherdata,
        API_URL
    }

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default ContextProvider;