import { createContext } from "react";

export const Context = createContext(null)


const ContextProvider = ({ children }) => {
    
    const value = {

    }

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default ContextProvider;