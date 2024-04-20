import React from "react";
import "../../styles/firstpage.css";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li>
          {/* <Link to="/#Home">Home</Link> */}
          <a href="#Home">Home</a>
        </li>
        {/* <li>Benefits</li> */}
        <li>
          {/* <Link to="/#Service">Benefits</Link> */}
          <a href="#Service">Benefits</a>
        </li>
        {/* <li>About</li> */}
        <li>
          {/* <Link to="/#About">About</Link> */}
          <a href="#About">About</a>
        </li>
        {/* <li>Contact</li> */}
        <li>
          {/* <Link to="/#Contact">Contact</Link> */}
          <a href="/#Contact">Contact</a>
        </li>
        <li>
          <a href="/#Profile">Profile</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
// import React from "react";
// import "../../styles/firstpage.css";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

// function NavigationBar() {
//   const handleUserClick = () => {
//     // Handle user icon click
//   };

//   const handleLogout = () => {
//     // Handle logout icon click
//   };

//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/#Home">Home</Link>
//         </li>
//         {/* <li>Benefits</li> */}
//         <li>
//           <Link to="/#Service">Benefits</Link>
//         </li>
//         {/* <li>About</li> */}
//         <li>
//           <Link to="/#About">About</Link>
//         </li>
//         {/* <li>Contact</li> */}
//         <li>
//           <Link to="/#Contact">Contact</Link>
//         </li>
//         <li>
//           <FontAwesomeIcon icon={faUser} onClick={handleUserClick} />
//         </li>
//         <li>
//           <FontAwesomeIcon icon={faSignOutAlt} onClick={handleLogout} />
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default NavigationBar;
