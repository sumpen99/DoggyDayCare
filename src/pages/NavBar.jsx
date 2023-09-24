import { Outlet, Link } from "react-router-dom";
import React from "react";
import { HelmetProvider } from 'react-helmet-async';

const NavBar = () => {

  const toggleMenu = event => {
    //console.log(event.data)
    const toggleButton = document.getElementById('toggle_button');
    if(toggleButton != null){
        if (toggleButton.className == "menu-bar") {
            toggleButton.className += " responsive";
        } 
        else {
            toggleButton.className = "menu-bar";
        }
    }
  }

  return (
    <>
      <nav className="navigation">
      <div className="menu-bar" data-menu-bar id="toggle_button">
      <HelmetProvider> <link rel="stylesheet" href="../src/styles/navbar.css"/> </HelmetProvider>
      <Link to="/" data-page="home">Home</Link>
      <Link to="/Clients" data-page="clients">Clients</Link>
      <Link to="/Profile" data-page="profile">Profile</Link>
      <a href="#" className="icon"> <i className="fa fa-bars" onClick={toggleMenu}></i> </a>
      </div>
    </nav>
    <Outlet />
    </>
  )
};

export default NavBar;
