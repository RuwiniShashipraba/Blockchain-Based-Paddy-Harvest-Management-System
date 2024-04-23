import {useContext} from "react";
import MainContext from "../context/MainContext";

const useMainContext = () => {
    const context = useContext(MainContext);

    if (context === undefined) {
        throw new Error("useMainContext must be used within a MainProvider");
    }

    return context;
};

export default useMainContext;
