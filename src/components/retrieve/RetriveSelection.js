import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/retrive.css";
import customerImage from "../../img/customer.jpg";
import sellerImage from "../../img/seller.jpg";
import RetrievePage from "../common/RetrieveCard";
import Footer from "../frontPage/Footer";
import NavigationBar from "../frontPage/NavigationBar";
import { MainContext } from "../../context/MainContext";

function RetriveSelection() {
    const navigate = useNavigate();
    const [selectedRetrive, setSelectedRetrive] = useState(null);
    const { userRole } = useContext(MainContext);

    const handleRetriveClick = (retriveTitle) => {
        setSelectedRetrive(retriveTitle);
    };

    return (
        <div>
            <NavigationBar />
            <div className="retrive-section">
                <div className="selectretrive-section">
                    <div className="select-section">
                        <div className="row">
                            {userRole === "farmer" && (
                                <div
                                    className="retrive-box"
                                    onClick={() => navigate("/farmer-ret")}
                                >
                                    <RetrievePage
                                        title="Farmer Details"
                                        description="Track the journey of rice from the farm to your table with complete transparency."
                                        img={customerImage}
                                        onClick={() => handleRetriveClick("Increased Transparency")}
                                    />
                                </div>
                            )}

                            {userRole === "miller" && (
                                <div
                                    className="retrive-box"
                                    onClick={() => navigate("/miller-ret")}
                                >
                                    <RetrievePage
                                        title="Miller Details"
                                        description="Build trust in the rice supply chain by ensuring the authenticity and quality"
                                        img={sellerImage}
                                        onClick={() => handleRetriveClick("Enhanced Trust")}
                                    />
                                </div>
                            )}

                            {userRole === "seller" && (
                                <div
                                    className="retrive-box"
                                    onClick={() => navigate("/seller-ret")}
                                >
                                    <RetrievePage
                                        title="Seller Details"
                                        // description="Description for another option."
                                        img={customerImage}
                                        onClick={() => handleRetriveClick("Another Option")}
                                    />
                                </div>
                            )}

                            {userRole === "customer" && (
                                <div
                                    className="retrive-box"
                                    onClick={() => navigate("/customer")}
                                >
                                    <RetrievePage
                                        title="Customer Details"
                                        description="Description for a different option."
                                        img={sellerImage}
                                        onClick={() => handleRetriveClick("Different Option")}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <div className="select-section"> */}
                    <div className="row"></div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RetriveSelection;
