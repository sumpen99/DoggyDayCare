import '../styles/clients.css';
import { CoorTransition } from "../components/transition";
import React, { useState, useEffect} from 'react';
import { FILTER_OPTION,CLIENTS_PER_PAGE_OPTION} from "../helper/core"
import {ClientsPerPage,FilterField,SearchField,Pagination,ItemsShownedLabel} from "../components/optionofclients"
import {ListOfClientsRoute} from "../components/listofclients"
import { routeTransitionOpacity  } from "../helper/transitiontypes";
import { Outlet } from "react-router-dom";

import { stringInterPolation } from '../helper/core';
import { lastRequest } from '../helper/clientDataHandler';


function useMergeState(initialState) {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => 
    setState(prevState => Object.assign({}, prevState, newState)
  );
  return [state, setMergedState];
}

const ClientsRoute = () => {
  const [filterOption,setFilterOption] = useState(lastRequest.filterOption);
  const [perPageOption,setPerPageOption] = useState(lastRequest.perPageOption);
  const [valueToMatch,setValueToMatch] = useState(lastRequest.valueToMatch);
  const [totalClients] = useState(lastRequest.totalClientsAvailable);
  const [totalPages] = useState(lastRequest.totalPages);
  const [currentPage,setCurrentPage] = useState(lastRequest.page);

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
      <div className="container-body-clients">
        <div className="container-sort">
            <ClientsPerPage perPageOption={perPageOption} onPerPageOptionChange={setPerPageOption}></ClientsPerPage>
            <FilterField filterOption={filterOption} onFilterOptionChange={setFilterOption}></FilterField>
        </div>
        <SearchField filterOption={filterOption} onValueToMatchChange={setValueToMatch}></SearchField>
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