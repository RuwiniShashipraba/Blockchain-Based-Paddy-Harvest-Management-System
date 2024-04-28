import React from 'react';
import NavigationBar from '../components/frontPage/NavigationBar';
import MainSection from '../components/frontPage/MainSection';
import Footer from '../components/frontPage/Footer';
import "../styles/firstpage.css";
import ServiceSection from '../components/frontPage/ServiceSection';
import AboutUs from '../components/frontPage/AboutUs';
import Contact from '../components/frontPage/Contact';


function Home() {
    return (
        <div>
            <NavigationBar/>
            <MainSection/>
            <ServiceSection/>
            <AboutUs/>
            <Contact/>
            <Footer/>
        </div>
    );
}

export default Home;