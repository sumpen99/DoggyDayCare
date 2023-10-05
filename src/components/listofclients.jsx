import React, { useState, useEffect, useCallback} from 'react';
import { useLoader } from '../helper/gloaballoading';
import { NavLink } from "react-router-dom";
import AsyncImage from "../helper/asyncimage"
import clientDataHandler from "../helper/clientDataHandler"
import logo_pawn from "../assets/dogpawngrey.png";

const ClientCardRoute = ({client}) =>{
    return(
        <div className="client-card" >
            <div className="client-dog-name">
                <h1>{client.name}</h1>
            </div>
            <div className="client-image"> 
                <AsyncImage src={client.img}></AsyncImage> 
            </div>
            <NavLink className="client-link-route" to={client.name} data-page="info" state={{ client: client }} style={{ textDecoration: 'none' }}>
                <img className="client-logo-pawn" src={logo_pawn}></img>
            </NavLink>
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
        <div className="client-card">
            <div className="client-dog-name">
                <h4 >{client.name}</h4>
            </div>
            <div className="client-image"> 
                <AsyncImage src={client.img} ></AsyncImage>
            </div>
            <div className="client-breed-user-name" onMouseDown={handleOnClick}>
                <img className="client-logo-pawn" src={logo_pawn}></img>
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