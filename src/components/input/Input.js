import React from 'react';
import Footer from '../FrontPage/Footer';
import NavigationBar from '../FrontPage/NavigationBar';
// import "../../styles/inputcard.css";
const InputPage = ({title, description, img}) => {
  return (
    <div>
    <NavigationBar/>
    <div className="input-card">
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <img src={img} alt={title} />
      </div>
      
    </div>
    <Footer/>
    </div>
    
  );
}

export default InputPage;


