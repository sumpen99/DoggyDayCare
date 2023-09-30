import '../styles/clients.css';
import { CoorTransition } from "../components/transition";
import React, { useState, useEffect} from 'react';
import { FILTER_OPTION,CLIENTS_PER_PAGE } from "../helper/core"
import {FilterField,SearchField,ListOfClients,Pagination} from "../components/clients"
import { routeTransitionSpring,routeTransitionEase,routeTransitionBlackBox,routeTransitionSpringFromRight,routeTransitionOpacity  } from "../helper/transitiontypes";


function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => 
    setState(prevState => Object.assign({}, prevState, newState)
  );
  return [state, setMergedState];
}

function isDisabled(filterOption){
  return  filterOption === FILTER_OPTION.ALL     ||
          filterOption === FILTER_OPTION.ABSENT  ||
          filterOption === FILTER_OPTION.PRESENT ||
          filterOption === FILTER_OPTION.MALE    ||
          filterOption === FILTER_OPTION.FEMALE;
}

function itemCount(currentPage,totalClients){
  let startItem = currentPage * CLIENTS_PER_PAGE + 1;
  startItem = startItem > totalClients ? totalClients : startItem;
  const endItem = Math.min(totalClients,startItem + CLIENTS_PER_PAGE - 1)
  return `Show ${startItem} - ${endItem} of ${totalClients} clients`;
}

const Clients = () => {
  const [filterOption,setFilterOption] = useState(FILTER_OPTION.ALL);
  const [valueToMatch,setValueToMatch] = useState("");
  const [totalClients] = useState(0);
  const [totalPages] = useState(0);
  const [currentPage,setCurrentPage] = useState(0);

  const [filterRequest, setFilterRequest] = useMergeState({
    filterOption: filterOption,
    valueToMatch: valueToMatch,
    currentPage:currentPage
  });

  const [clientCount, setClientCount] = useMergeState({
    totalClients: totalClients,
    totalPages: totalPages
  });

  useEffect(() => {
    setFilterRequest({
      filterOption: filterOption,
      valueToMatch: valueToMatch,
      currentPage:currentPage
    })
  },[filterOption,valueToMatch,currentPage])

  
  const body = () => {
    return (
      <div className="container-body">
      <div className="container-sort">
          <FilterField filterOption={filterOption} onFilterOptionChange={setFilterOption}></FilterField>
          <SearchField isDisabled={isDisabled(filterOption)} onValueToMatchChange={setValueToMatch}></SearchField>
          <FilterField filterOption={filterOption} onFilterOptionChange={setFilterOption}></FilterField>
      </div>
      <div className="container-pages">
        <h4> {itemCount(currentPage,clientCount.totalClients)}</h4>
        <Pagination currentPage={currentPage} totalPages={clientCount.totalPages} onCurrentPageChange={setCurrentPage}></Pagination>
      </div>
      <div className="client-filter">
        <ListOfClients filterRequest={filterRequest} onClientCountChange={setClientCount} onResetPage={setCurrentPage}></ListOfClients>
      </div>
    </div>
    )
  }

  return (
    <CoorTransition page={body}  name="home trans" transition={routeTransitionOpacity}/>
  );
  };
  
export default Clients;

/**
 * UPDATE PAGINATION < [1][2][3] *** [17] >
 * ADD CLIENTS PER PAGE
 * MAKE CLIENT PAGE
*/