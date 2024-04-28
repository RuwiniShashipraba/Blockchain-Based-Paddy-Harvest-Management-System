import React from "react";
import "../../styles/firstpage.css";
import Lottie from "react-lottie";
import frontpageAnimation from "../../img/about.json";

function AboutUs() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: frontpageAnimation,
  };

  return (
    <main>
      {/* <div id="About"> */}
      <div className="image2-content" id="About">
        <Lottie options={defaultOptions} height={600} width={600} />
      </div>
      <div className="who-we-are-section">
        <h2>Who We Are</h2>

        <p>
          <h3>About Us</h3>
          We are Ruwini Shashipraba and Vishvi De Silva, both undergraduate
          students pursuing a Bachelor of Science (Honours) degree in Software
          Engineering. As part of our final year project, we embarked on a
          journey to innovate within the realm of technology and supply chain
          management.
        </p>
        {/* Add more content about who you are */}
        {/* <p>
          <h3>Our Project</h3>
          Our project revolves around the development of a blockchain-based
          system tailored for the rice industry in Sri Lanka. Leveraging the
          transformative potential of blockchain technology, our aim is to
          enhance the traceability and transparency of Sri Lanka's paddy supply
          chain.
        </p> */}
        <p>
          <h3>Our Mission</h3>
          Our mission is clear: to build a robust web application that
          revolutionizes the way the rice industry operates in Sri Lanka. By
          harnessing the power of blockchain, we seek to empower stakeholders
          with real-time insights and immutable data, thereby fostering trust
          and efficiency throughout the supply chain.
        </p>
        <p>
          <h3>Why It Matters</h3>
          The rice industry is not only a vital component of Sri Lanka's economy
          but also deeply intertwined with the livelihoods of countless
          individuals across the nation. By introducing transparency and
          traceability into the supply chain, we strive to elevate industry
          standards, promote fair practices, and ultimately contribute to the
          socioeconomic development of our country
        </p>
        <p>
          <h3>Our Commitment</h3>
          As software engineering enthusiasts, we are driven by a passion for
          innovation and a commitment to excellence. We approach our work with
          dedication, creativity, and a relentless pursuit of solutions that
          make a meaningful impact.
        </p>
        {/* <p>
          <h3>GEt In Touch</h3>
          Interested in learning more about our project or collaborating with
          us? We'd love to hear from you! Feel free to reach out to us through
          the contact information provided below.
        </p> */}
      </div>
      {/* </div> */}
    </main>
  );
}

export default AboutUs;
