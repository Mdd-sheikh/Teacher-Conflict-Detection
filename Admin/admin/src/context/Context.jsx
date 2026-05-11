import { createContext } from "react";

export const Context = createContext(null)


const ContextProvider = ({ children }) => {
    const name = ""
    const value = {
        name
    }

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>
}

export default ContextProvider;