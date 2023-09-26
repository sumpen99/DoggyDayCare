import '../styles/clients.css';
import React, { useState, useEffect, useCallback} from 'react';
import { Link } from "react-router-dom";
import AsyncImage from "../helper/asyncimage"
import fetcher from "../helper/fetcher"
import { FILTER_OPTION } from "../helper/core"

const FilterField = ({filterOption,onFilterOptionChange}) =>{
  
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

const SearchField = ({isDisabled,onValueToMatchChange}) =>{
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

const ClientsData = (props) =>{
  const [clients,setClients] = useState([]);

  useEffect(() => {
    const getClients = async event =>{
      fetcher(props.filterRequest.filterOption,props.filterRequest.valueToMatch).then( filteredClients => {
        setClients(filteredClients);
      });
    }
    getClients()
  },[props.filterRequest])
  
  return (
    <section className="section-clients">
      {clients.map(client => ClientCard(client) )}
    </section>
    );

}

function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => 
    setState(prevState => Object.assign({}, prevState, newState)
  );
  return [state, setMergedState];
}

const Clients = () => {
  const [filterOption,setFilterOption] = useState(FILTER_OPTION.ALL);
  const [valueToMatch,setValueToMatch] = useState("");
  const [filterRequest, setFilterRequest] = useMergeState({
    filterOption: filterOption,
    valueToMatch: valueToMatch
  });


  function isDisabled(){
    return  filterOption === FILTER_OPTION.ALL     ||
            filterOption === FILTER_OPTION.ABSENT  ||
            filterOption === FILTER_OPTION.PRESENT ||
            filterOption === FILTER_OPTION.MALE    ||
            filterOption === FILTER_OPTION.FEMALE;
  }

  useEffect(() => {
    setFilterRequest({
      filterOption: filterOption,
      valueToMatch: valueToMatch
    })
  },[filterOption,valueToMatch])

  return (
    <div className="container-body">
    <h1 >Doggy DayCare Clients</h1>
    <div className="container-sort">
        <FilterField filterOption={filterOption} onFilterOptionChange={setFilterOption}></FilterField>
        <SearchField isDisabled={isDisabled()} onValueToMatchChange={setValueToMatch}></SearchField>
    </div>
    <div className="client-filter">
    <ClientsData filterRequest={filterRequest}></ClientsData>
    </div>
    </div>
  );
  };
  
export default Clients;
