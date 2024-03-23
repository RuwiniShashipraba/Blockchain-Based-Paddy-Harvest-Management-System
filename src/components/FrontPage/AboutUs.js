import React from 'react';
import "../../styles/firstpage.css";
import Lottie from 'react-lottie';
import frontpageAnimation from '../../img/about.json';

function AboutUs() {const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: frontpageAnimation,
  };

  return (
    <main>
    <div className="image2-content">
          <Lottie options={defaultOptions} height={600} width={600} />
    </div>  
    <div className="who-we-are-section">
      <h2>Who We Are</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
        Sed cursus ante dapibus diam. Sed nisi.
      </p>
      {/* Add more content about who you are */}
    </div>
    </main> 
  );
}

export default AboutUs;