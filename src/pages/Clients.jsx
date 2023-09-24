import '../styles/clients.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AsyncImage from "../helper/asyncimage"
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
      <div><label>Filter by breed:</label>  </div>  
      <select> <option value="/">All</option> </select> 
    </div>
    
  )
}

const SortField = () =>{
  return (
    <div className="collection-sort"> 
      <div><label>Sort by:</label>  </div>  
      <select> <option value="/">Featured</option> </select> 
    </div>
  )
}

const ClientCard = (client) =>{
  return(
    <div key={Math.random()} className="client-card" >
      <Link to="/Info" data-page="info" preventScrollReset={true} state={{ client: client }}>
      <div className="client-image"> <AsyncImage src={client.img}></AsyncImage> </div>
      </Link>
      <div className="client-info">
        <h5>{client.name}</h5>
        <h6>{client.breed}</h6>
      </div>
    </div>
 );
}

const Clients = () => {
  const baseUrl = 'https://api.jsonbin.io/v3/b/650a7ebece39bb6dce7f5683';
  //const url = `${baseUrl}?format=json&nojsoncallback=1`;
  const [clients,setClients] = useState([]);

  useEffect(() => {
    const getClients = async event =>{
      
        const response = await fetch(baseUrl);
        const clientData = await response.json();
        setClients(clientData.record)
    }
    getClients()
  },[])

  
  

  return (
    <div className="container-body">
    <h1 >All Categories</h1>
    <SortContainer/>
    <div className="client-filter">
      <section className="section-clients">
        {clients.map(client => ClientCard(client) )}
      </section>
    </div>
    </div>
  );
  };
  
export default Clients;
