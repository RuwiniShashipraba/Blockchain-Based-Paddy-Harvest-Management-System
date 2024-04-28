import React, {createContext, useEffect, useState} from "react";
import {getLocalStorage, removeLocalStorage, setLocalStorage} from "../utils/localStorageUtil";

// Define context
const MainContext = createContext();

// Define provider
const MainProvider = ({children}) => {
    const [userId, setUserId] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userFullName, setUserFullName] = useState("");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedUserId = getLocalStorage("userId");
        if (storedUserId) {
            setUserId(storedUserId);
            setIsUserLoggedIn(true);
            setUserRole(getLocalStorage("userRole"));
            setUserFullName(getLocalStorage("userFullName"));
            setUserAddress(getLocalStorage("userAddress"));
        }
    }, []);

    const setUserInfo = (userInfo) => {
        setUserId(userInfo.userId);
        setUserRole(userInfo.userRole);
        setUserFullName(userInfo.userFullName);
        setUserAddress(userInfo.userAddress);

        setLocalStorage("userId", userInfo.userId);
        setLocalStorage("userRole", userInfo.userRole);
        setLocalStorage("userFullName", userInfo.userFullName);
        setLocalStorage("userAddress", userInfo.userAddress);
    };

    const logout = () => {
        setIsUserLoggedIn(false);
        removeLocalStorage("userId");
        removeLocalStorage("userRole");
        removeLocalStorage("userFullName");
        removeLocalStorage("userAddress");
    };

    return (
        <MainContext.Provider value={{
            userId,
            setUserId,
            userRole,
            setUserRole,
            userAddress,
            setUserAddress,
            userFullName,
            setUserFullName,
            isUserLoggedIn,
            setIsUserLoggedIn,
            logout,
            setUserInfo,
            setIsLoading,
            isLoading
        }}>
            {children}
        </MainContext.Provider>
    );
};

export default MainProvider;
export {MainContext};
