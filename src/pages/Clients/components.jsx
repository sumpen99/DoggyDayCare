import '../../styles/clients.css';
import React, { useState, useEffect, useCallback} from 'react';
import { Link } from "react-router-dom";
import AsyncImage from "../../helper/asyncimage"
import clientDataHandler from "../../helper/clientDataHandler"
import { FILTER_OPTION,stringInterPolation} from "../../helper/core"

export const Pagination = ({currentPage,totalPages,onCurrentPageChange}) => {
  const handleSelectedChange = useCallback(event => {
    const index = event.target.getAttribute("value");
    onCurrentPageChange(index);
  },[onCurrentPageChange])
  
  return(
    <div className="pagination">
      <a href="#" value={Math.max(0,currentPage-1)} onMouseDown={handleSelectedChange}>&laquo;</a>
      { Array(totalPages).fill(null).map((value,index) => ( 
        <a key={index} value={index} href="#" className={(currentPage == index) ? "active" : "notActive"} onMouseDown={handleSelectedChange}>{index+1}</a>)) 
      }
      <a href="#" value={Math.min(currentPage+1,Math.max(0,totalPages-1))} onMouseDown={handleSelectedChange}>&raquo;</a>
    </div>
  )
}

export const FilterField = ({filterOption,onFilterOptionChange}) =>{
  const handleSelectedChange = useCallback(event => {
    onFilterOptionChange(event.target.value);
  },[onFilterOptionChange])
  
  return (
    <div className="collection-sort">
      <div><label>Filter on:</label>  </div>  
      <select value={filterOption} onChange = {handleSelectedChange}> 
        {Object.values(FILTER_OPTION).map( op => <option key={op} value={op}>{op}</option> )};
      </select> 
    </div>
    
  )
}
  
export  const SearchField = ({isDisabled,onValueToMatchChange}) =>{
  const handleInputChange = useCallback(event => {
    onValueToMatchChange(event.target.value);
  },[onValueToMatchChange])

  return(
    <div className="collection-sort"> 
      <div><label>Search for:</label>  </div>
      <input className="search" placeholder={isDisabled ? "" : "search"} type="text" onChange={handleInputChange} disabled={isDisabled}></input>
    </div>
  );
}
  
export const ClientCard = (client) =>{
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
  
export const ListOfClients = ({filterRequest,onClientCountChange,onResetPage}) =>{
  const [clients,setClients] = useState([]);

  useEffect(() => {
    const getClients = async event =>{
      clientDataHandler(filterRequest.filterOption,filterRequest.valueToMatch,filterRequest.currentPage,onClientCountChange,onResetPage).then( filteredClients => {
        setClients(filteredClients);
      });
    }
    getClients()
  },[filterRequest])
  
  return (
    <section className="section-clients">
      {clients.map(client => ClientCard(client) )}
    </section>
    );

}