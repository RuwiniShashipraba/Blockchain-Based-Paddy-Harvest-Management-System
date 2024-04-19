import React from "react";
import "../../styles/firstpage.css";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/#Home">Home</Link>
        </li>
        {/* <li>Benefits</li> */}
        <li>
          <Link to="/#Service">Benefits</Link>
        </li>
        {/* <li>About</li> */}
        <li>
          <Link to="/#About">About</Link>
        </li>
        {/* <li>Contact</li> */}
        <li>
          <Link to="/#Contact">Contact</Link>
        </li>
        <li>Profile</li>
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
