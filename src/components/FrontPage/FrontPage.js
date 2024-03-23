import React from 'react';
import NavigationBar from './NavigationBar';
import MainSection from './MainSection';
import Footer from './Footer';
import "../../styles/firstpage.css";
import ServiceSection from './ServiceSection';
import AboutUs from './AboutUs';
import Contact from './Contact';


function FrontPage() {
  return (
    <div>
      <NavigationBar />
      <MainSection />
      <ServiceSection />
      <AboutUs />
      <Contact />
      <Footer />
    </div>
  );
}

export default FrontPage;