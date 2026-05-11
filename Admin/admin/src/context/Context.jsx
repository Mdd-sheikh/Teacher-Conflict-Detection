import { createContext, useState ,useEffect} from "react";


export const Context = createContext(null)


const ContextProvider = ({ children }) => {
    const [rooms, setRooms] = useState([])
    const [teachers,setTeachers] = useState([])

    const [subjects, setSubjects] = useState([])
    const API_URL = "https://teacher-conflict-detection-2.onrender.com/api"

    const value = {
        API_URL,
        rooms, 
        setRooms,
        subjects, 
        setSubjects,
        teachers,
        setTeachers
    }


    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default ContextProvider;