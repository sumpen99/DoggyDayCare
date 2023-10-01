import React, { useState, useEffect, useCallback} from 'react';
import { useLoader } from '../helper/gloaballoading';
import { Link } from "react-router-dom";
import AsyncImage from "../helper/asyncimage"
import clientDataHandler from "../helper/clientDataHandler"

const ClientCardRoute = ({client}) =>{
    return(
      <div className="client-card" >
        <Link to={client.name} data-page="info" state={{ client: client }}>
        <div className="client-image"> <AsyncImage src={client.img}></AsyncImage> </div>
        </Link>
        <div className="client-info">
          <h5>{client.name}</h5>
          <h6>{client.breed}</h6>
        </div>
      </div>
    );
  }
  
const ClientCardSheet = ({client,setSheetOption}) =>{

    const handleOnClick = useCallback(event => {
        setSheetOption({
        isOpen: true,
        currentClient: client,
        })
    },[setSheetOption])

    return(
        <div className="client-card" >
        <div className="client-image"> 
            <button onMouseDown={handleOnClick}>
            <AsyncImage src={client.img} ></AsyncImage>
            </button>
        </div>
        <div className="client-info">
            <h5>{client.name}</h5>
            <h6>{client.breed}</h6>
        </div>
        </div>
    );
}
    
export const ListOfClientsSheet = ({filterRequest,onClientCountChange,onResetPage,setSheetOption}) =>{
    const [clients,setClients] = useState([]);
    const {startLoader, stopLoader} = useLoader();

    useEffect(() => {
        const getClients = async event =>{
        startLoader();
        clientDataHandler(filterRequest,onClientCountChange,onResetPage)
        .then( filteredClients => {
            setClients(filteredClients);
            stopLoader();
        })
        .catch(() =>{
            stopLoader();
            //SHOW INFO
        })
        }
        getClients()
    },[filterRequest])

    return (
        <section className="section-clients">
        {clients.map(client => <ClientCardSheet key={Math.random()} client={client} setSheetOption={setSheetOption}/> )}
        </section>
    );
}
  
export const ListOfClientsRoute = ({filterRequest,onClientCountChange,onResetPage}) =>{
    const [clients,setClients] = useState([]);
    const {startLoader, stopLoader} = useLoader();

    useEffect(() => {
        const getClients = async event =>{
        startLoader();
        clientDataHandler(filterRequest,onClientCountChange,onResetPage)
        .then( filteredClients => {
            setClients(filteredClients);
            stopLoader();
        })
        .catch(() =>{
            stopLoader();
            //SHOW INFO
        })
        }
        getClients()
    },[filterRequest])

    return (
        <section className="section-clients">
        {clients.map(client => <ClientCardRoute key={Math.random()} client={client}/>)}
        </section>
    );
    
}