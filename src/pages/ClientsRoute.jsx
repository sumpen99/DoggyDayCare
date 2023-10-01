import '../styles/clients.css';
import { CoorTransition } from "../components/transition";
import React, { useState, useEffect} from 'react';
import { FILTER_OPTION,CLIENTS_PER_PAGE_OPTION } from "../helper/core"
import {ClientsPerPage,FilterField,SearchField,Pagination,ItemsShownedLabel} from "../components/optionofclients"
import {ListOfClientsRoute} from "../components/listofclients"
import { routeTransitionOpacity  } from "../helper/transitiontypes";
import { Outlet } from "react-router-dom";

import { stringInterPolation } from '../helper/core';


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


const ClientsRoute = () => {
  const [filterOption,setFilterOption] = useState(FILTER_OPTION.ALL);
  const [perPageOption,setPerPageOption] = useState(CLIENTS_PER_PAGE_OPTION.FOUR);
  const [valueToMatch,setValueToMatch] = useState("");
  const [totalClients] = useState(0);
  const [totalPages] = useState(0);
  const [currentPage,setCurrentPage] = useState(0);

  const [filterRequest, setFilterRequest] = useMergeState({
    filterOption: filterOption,
    valueToMatch: valueToMatch,
    currentPage:currentPage,
    perPageOption:perPageOption
  });

  const [clientCount, setClientCount] = useMergeState({
    totalClients: totalClients,
    totalPages: totalPages
  });

  useEffect(() => {
    setFilterRequest({
      filterOption: filterOption,
      valueToMatch: valueToMatch,
      currentPage:currentPage,
      perPageOption:perPageOption
    })
  },[filterOption,valueToMatch,currentPage,perPageOption])

  const bodyRoute = () => {
    return (
      <>
      <Outlet/>
      <div className="container-body">
      <div className="container-sort">
          <FilterField filterOption={filterOption} onFilterOptionChange={setFilterOption}></FilterField>
          <SearchField isDisabled={isDisabled(filterOption)} onValueToMatchChange={setValueToMatch}></SearchField>
          <ClientsPerPage perPageOption={perPageOption} onPerPageOptionChange={setPerPageOption}></ClientsPerPage>
      </div>
      <div className="container-pages">
        <ItemsShownedLabel currentPage= {currentPage} totalClients={clientCount.totalClients} perPageOption={perPageOption}></ItemsShownedLabel>
        <Pagination currentPage={currentPage} totalPages={clientCount.totalPages} onCurrentPageChange={setCurrentPage}></Pagination>
      </div>
      <div className="client-filter">
        <ListOfClientsRoute filterRequest={filterRequest} onClientCountChange={setClientCount} onResetPage={setCurrentPage}></ListOfClientsRoute>
      </div>
      </div>
      </>
    )
  }

  return (
    <CoorTransition page={bodyRoute}  name="home trans" transition={routeTransitionOpacity}/>
  );
  };
export default ClientsRoute;