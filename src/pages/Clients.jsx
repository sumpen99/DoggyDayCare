import '../styles/clients.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import AsyncImage from "../helper/asyncimage"
import {parseBreedFromListOfClients} from "../helper/core"
import fetcher from "../helper/fetcher"

const SortContainer = (selectedFilter) =>{
  return(
    <div className="container-sort">
        <FilterField/>
        <SortField/>
    </div>
  )
}

const FilterField = ({selectedFilter,onSelectedFilterChange}) =>{
  
  const handleSelectedChange = useCallback(event => {
    onSelectedFilterChange(event.target.value);
  },[onSelectedFilterChange])
  
  return (
    <div className="collection-sort">
      <div><label>Filter:</label>  </div>  
      <select value={selectedFilter} onChange = {handleSelectedChange}> 
        <option value="all">All</option>
        <option value="breed">Breed</option>
        <option value="name">Name</option>
        <option value="active">Active</option> 
      </select> 
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



class ClientsData extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            clients: null,
            selectedFilter:props.selectedFilter
        };
    }

    static getDerivedStateFromProps(props, state) {
      if(props.selectedFilter !== state.selectedFilter){
        return {
          selectedFilter:props.selectedFilter
        };
      }
      // Re-run the filter whenever the list array or filter text change.
      // Note we need to store prevPropsList and prevFilterText to detect changes.
      /*if (
        props.list !== state.prevPropsList ||
        state.prevFilterText !== state.filterText
      ) {
        return {
          prevPropsList: props.list,
          prevFilterText: state.filterText,
          filteredList: props.list.filter(item => item.text.includes(state.filterText))
        };
      }*/
      return null;
  }

    componentDidMount(){
        fetcher().then( clients => {
            this.setState({
                loaded:true,
                clients:clients
            });
        });
    }

    render(){
      console.log(this.state.selectedFilter);
      if(!this.state.loaded){
        return false;
      }
      return (
        <section className="section-clients">
          {this.state.clients.map(client => ClientCard(client) )}
        </section>
        );
    };
}

const Clients = () => {
  /*const baseUrl = 'https://api.jsonbin.io/v3/b/650a7ebece39bb6dce7f5683';
  const [breeds,setBreeds] = useState([]);
  const [clients,setClients] = useState([]);

  useEffect(() => {
    const getClients = async event =>{
        const response = await fetch(baseUrl);
        const clientData = await response.json();
        const breedData = await parseBreedFromListOfClients(clientData.record ?? []);
        setClients(clientData.record ?? []);
        setBreeds(breedData ?? [])
    }
    getClients()
  },[])*/

  const [selectedFilter,setSelectedFilter] = useState("all")

  return (
    <div className="container-body">
    <h1 >All Categories {selectedFilter}</h1>
    <div className="container-sort">
        <FilterField selectedFilter={selectedFilter} onSelectedFilterChange={setSelectedFilter}></FilterField>
        <SortField/>
    </div>
    <div className="client-filter">
    <ClientsData selectedFilter={selectedFilter}></ClientsData>
    </div>
    </div>
  );
  };
  
export default Clients;


/*
const {useState, useEffect} = React;
https://stackoverflow.com/questions/53574614/multiple-calls-to-state-updater-from-usestate-in-component-causes-multiple-re-re
function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => 
    setState(prevState => Object.assign({}, prevState, newState)
  );
  return [state, setMergedState];
}

function App() {
  const [userRequest, setUserRequest] = useMergeState({
    loading: false,
    user: null,
  });

  useEffect(() => {
    setUserRequest({ loading: true });
    fetch('https://randomuser.me/api/')
      .then(results => results.json())
      .then(data => {
        setUserRequest({
          loading: false,
          user: data.results[0],
        });
      });
  }, []);

  const { loading, user } = userRequest;

  return (
    <div>
      {loading && 'Loading...'}
      {user && user.name.first}
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));


*/
