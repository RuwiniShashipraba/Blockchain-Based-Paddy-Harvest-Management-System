import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import OptionCard from "./OptionCard";
import "../../styles/option.css";
import customerImage from "../../img/customer.jpg";
import sellerImage from "../../img/seller.jpg";
import Footer from "../frontPage/Footer";
import NavigationBar from "../frontPage/NavigationBar";
import {MainContext} from "../../context/MainContext";

function OptionSelection() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState(null);
    const {userRole} = useContext(MainContext)

    const handleOptionClick = (optionTitle) => {
        setSelectedOption(optionTitle);
    };

    return (
        <div>
            <NavigationBar/>
            <div className="option-section">
                <div className="select-section">
                    {userRole !== "customer" &&
                        <div
                            className="option-box"
                            onClick={() => navigate("/inputSelection")}
                        >
                            <OptionCard
                                title="Input the details"
                                description="Track the journey of rice from the farm to your table with complete transparency."
                                img={customerImage}
                                onClick={() => handleOptionClick("Increased Transparency")}
                            />
                        </div>
                    }

                    <div
                        className="option-box"
                        onClick={() => navigate("/retrieveselection")}
                    >
                        <OptionCard
                            title="View the details"
                            description="Build trust in the rice supply chain by ensuring the authenticity and quality"
                            img={sellerImage}
                            onClick={() => handleOptionClick("Enhanced Trust")}
                        />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default OptionSelection;
