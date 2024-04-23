import React, {createContext, useState} from "react";

// Define context
const MainContext = createContext();

// Define provider
const MainProvider = ({children}) => {
    const [userId, setUserId] = useState("");
    const [userRole, setUserRole] = useState("");

    return (
        <MainContext.Provider value={{userId, setUserId, userRole, setUserRole}}>
            {children}
        </MainContext.Provider>
    );
};

export default MainProvider;
export {MainContext};
