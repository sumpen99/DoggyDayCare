import '../styles/clients.css';
import React, { useCallback} from 'react';
import { FILTER_OPTION,stringInterPolation} from "../helper/core"
import { CLIENTS_PER_PAGE_OPTION } from '../helper/core';

export const Pagination = ({currentPage,totalPages,onCurrentPageChange}) => {

  const handleSelectedChange = useCallback(event => {
    const index = event.target.getAttribute("value");
    onCurrentPageChange(index);
  },[onCurrentPageChange])

  const handleSelectedDecreaseChange = useCallback(event => {
    let newPage = currentPage-1;
    onCurrentPageChange(newPage < 0 ? 0 : newPage);
  })

  const handleSelectedIncreaseChange = useCallback(event => {
    console.log(totalPages)
    let newPage = currentPage+1;
    onCurrentPageChange(newPage > (totalPages-1) ? (totalPages-1) : newPage);
  })

  return(
    <div className="pagination">
      <a href="#" onMouseDown={handleSelectedDecreaseChange}>&laquo;</a>
      { Array(totalPages).fill(null).map((value,index) => ( 
        <a key={index} value={index} href="#" className={(currentPage == index) ? "active" : "notActive"} onMouseDown={handleSelectedChange}>{index+1}</a>)) 
      }
      <a href="#" onMouseDown={handleSelectedIncreaseChange}>&raquo;</a>
    </div>
  )
}

//raquo
//&gt
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

export const ClientsPerPage = ({perPageOption,onPerPageOptionChange}) =>{
  const handleSelectedChange = useCallback(event => {
    onPerPageOptionChange(parseInt(event.target.value));
  },[onPerPageOptionChange])
  
  return (
    <div className="collection-sort">
      <div><label>Show:</label>  </div>  
      <select value={perPageOption} onChange = {handleSelectedChange}> 
        {Object.values(CLIENTS_PER_PAGE_OPTION).map( op => <option key={op} value={op}>{op}</option> )};
      </select> 
    </div>
    
  )
}
  
export  const SearchField = ({isDisabled,onValueToMatchChange}) =>{
  const handleInputChange = useCallback(event => {
    onValueToMatchChange(event.target.value);
  },[onValueToMatchChange])

  return(
    <div className="collection-search"> 
      <input className="search" placeholder={isDisabled ? "" : "search by filter"} type="text" onChange={handleInputChange} disabled={isDisabled}></input>
    </div>
  );
}

export const ItemsShownedLabel = ({currentPage,totalClients,perPageOption}) =>{
  return(
    <h4> {calculateNewlabel(currentPage,totalClients,perPageOption)}</h4>
  );
}

function calculateNewlabel(currentPage,totalClients,perPageOption){
  let startItem = currentPage * perPageOption + 1;
  startItem = startItem > totalClients ? totalClients : startItem;
  const endItem = Math.min(totalClients,startItem + perPageOption - 1)
  return `Show ${startItem} - ${endItem} of ${totalClients} clients`;
}
