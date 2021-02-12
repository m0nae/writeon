import { Flex } from "@chakra-ui/react";
import { IoPersonCircleOutline as PersonIcon } from "react-icons/io5";
import React from "react";

// export function Navbar({ handleShowLogin }) {
//   return (
//     <div className="navbar">
//       <div className="nav-right">
//         <button onClick={() => handleShowLogin()} className="login">
//           Login
//         </button>
//         <PersonIcon className="profile-icon" />
//       </div>
//     </div>
//   );
// }

export function Header({ children }) {
  return (
    <>
      <Flex p="4" justify="center" align="center" className="header">
        {children}
      </Flex>
    </>
  );
}
