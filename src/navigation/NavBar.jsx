import { NavLink} from "react-router-dom";
import React, { useState } from "react";
import '../styles/navbar.css';

const NavBar = () => {
  
  const [isOpen,setIsOpen] = useState(false);

  const handleToggleMenu = () =>{
    setIsOpen(!isOpen);
  }
 
  return (
    <div className={isOpen ? "menu-bar responsive" : "menu-bar"} data-menu-bar id="toggle_button">
        <NavLink to="/" data-page="home" onClick={handleToggleMenu}>Home</NavLink>
        <NavLink to="/Clients" data-page="clients" onClick={handleToggleMenu}>Clients</NavLink>
        <NavLink to="/Contact" data-page="contact" onClick={handleToggleMenu}>Contact</NavLink>
        <a className="icon" onClick={handleToggleMenu}> <i className="fa fa-bars"></i> </a>
    </div>
  )
};

export default NavBar;

