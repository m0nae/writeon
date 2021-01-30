import React from 'react';
import { IoPersonCircleOutline as PersonIcon } from 'react-icons/io5';

export function Navbar({ handleShowLogin }) {
  return (
    <div className="navbar">
      <div className="nav-right">
        <button onClick={() => handleShowLogin()} className="login">
          Login
        </button>
        <PersonIcon className="profile-icon" />
      </div>
    </div>
  );
}
