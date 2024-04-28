import React from "react";
import "../../styles/loader.css";
import Lottie from "react-lottie";
import animationData from '../../animations/Loading.json';

const Loader = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className="loader-container">
            <Lottie options={defaultOptions} height={600} width={600}/>
        </div>
    );
};

export default Loader;
