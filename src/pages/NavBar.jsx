import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
import '../styles/navbar.css';

const NavBar = () => {
  
  const [isOpen,setIsOpen] = useState(false);

  const handleToggleMenu = () =>{
    setIsOpen(!isOpen);
  }
  
  return (
    <>
      <nav className="navigation">
      <div className={isOpen ? "menu-bar responsive" : "menu-bar"} data-menu-bar id="toggle_button">
        <Link to="/" data-page="home">Home</Link>
        <Link to="/Clients" data-page="clients">Clients</Link>
        <Link to="/Profile" data-page="profile">Profile</Link>
        <a href="#" className="icon" onMouseDown={handleToggleMenu}> <i className="fa fa-bars"></i> </a>
      </div>
    </nav>
    <Outlet />
    </>
  )
};

export default NavBar;
