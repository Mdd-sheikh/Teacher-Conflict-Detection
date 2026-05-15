import { createContext, useState ,useEffect} from "react";


export const Context = createContext(null)


const ContextProvider = ({ children }) => {
<<<<<<< HEAD
    const name = "priyanka"
=======
    const [rooms, setRooms] = useState([])
    const [teachers,setTeachers] = useState([])
>>>>>>> 53dc4b5ac6c2cb696c26dd7accc5b318791a5061

    const [subjects, setSubjects] = useState([])
    const API_URL = "https://teacher-conflict-detection-2.onrender.com/api"

    const value = {
<<<<<<< HEAD
        API_URL,name
=======
        API_URL,
        rooms, 
        setRooms,
        subjects, 
        setSubjects,
        teachers,
        setTeachers
>>>>>>> 53dc4b5ac6c2cb696c26dd7accc5b318791a5061
    }
    


    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default ContextProvider;