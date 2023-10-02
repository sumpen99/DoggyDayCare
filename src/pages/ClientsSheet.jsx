import '../styles/clients.css';
import { CoorTransition } from "../components/transition";
import React, { useState, useEffect} from 'react';
import { FILTER_OPTION,CLIENTS_PER_PAGE_OPTION } from "../helper/core"
import {ClientsPerPage,FilterField,SearchField,Pagination,ItemsShownedLabel} from "../components/optionofclients"
import {ListOfClientsSheet} from "../components/listofclients"
import { routeTransitionOpacity  } from "../helper/transitiontypes";
import { ClientSheet } from '../components/sheet';
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

const ClientsSheet = () => {
  const [sheetIsOpen] = useState(false);
  const [currentClient] = useState(null);
  const [filterOption,setFilterOption] = useState(FILTER_OPTION.ALL);
  const [perPageOption,setPerPageOption] = useState(CLIENTS_PER_PAGE_OPTION.SIXTEEN);
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

  const [sheetOption, setSheetOption] = useMergeState({
    isOpen: sheetIsOpen,
    currentClient: currentClient,
  });

  useEffect(() => {
    setFilterRequest({
      filterOption: filterOption,
      valueToMatch: valueToMatch,
      currentPage:currentPage,
      perPageOption:perPageOption
    })
  },[filterOption,valueToMatch,currentPage,perPageOption])

  useEffect(() => {
    setSheetOption({
      isOpen: false,
      currentClient: null,
    })
  },[])

  

  const bodySheet = () => {
    return (
      <>
      <ClientSheet sheetOption={sheetOption}/>
      <div className="container-body-clients">
        <div className="container-sort">
          <ClientsPerPage perPageOption={perPageOption} onPerPageOptionChange={setPerPageOption}></ClientsPerPage>
          <FilterField filterOption={filterOption} onFilterOptionChange={setFilterOption}></FilterField>
        </div>
          <SearchField isDisabled={isDisabled(filterOption)} onValueToMatchChange={setValueToMatch}></SearchField>
        <div className="container-pages">
          <ItemsShownedLabel currentPage= {currentPage} totalClients={clientCount.totalClients} perPageOption={perPageOption}></ItemsShownedLabel>
          <Pagination currentPage={currentPage} totalPages={clientCount.totalPages} onCurrentPageChange={setCurrentPage}></Pagination>
        </div>
        <div className="client-filter">
          <ListOfClientsSheet filterRequest={filterRequest} onClientCountChange={setClientCount} onResetPage={setCurrentPage} setSheetOption={setSheetOption}></ListOfClientsSheet>
        </div>
      </div>
      </>
    )
  }

  return (
    <CoorTransition page={bodySheet}  name="home trans" transition={routeTransitionOpacity}/>
  );
  };
  
export default ClientsSheet;