import '../styles/clients.css';

import React from 'react';
import Catalog from "react-catalog-view";

const SortContainer = () =>{
  return(
    <div className="container-sort">
        <FilterField/>
        <SortField/>
    </div>
  )
}

const FilterField = () =>{
  return (
    <div className="collection-sort"> 
      <label>Filter by:</label> 
      <select> <option value="/">All Jackets</option> </select> 
    </div>
  )
}

const SortField = () =>{
  return (
    <div className="collection-sort"> 
      <label>Sort by:</label> 
      <select> <option value="/">Featured</option> </select> 
    </div>
  )
}

const Clients = () => {

  const loadClients = async event =>{

    const baseUrl = 'https://api.jsonbin.io/v3/b/650a7ebece39bb6dce7f5683';
   
    const url = `${baseUrl}?format=json&nojsoncallback=1`;

    const response = await fetch(baseUrl);
    const clientData = await response.json();
    
    clientData.record.forEach( (dog) =>
      console.log(dog)
    )
  }

  

  return (
    <nav className="product-filter">
      <h1>Dogs</h1>
      <SortContainer/>
      </nav>
  );
  };
  
export default Clients;