import { FILTER_OPTION,stringInterPolation } from "./core";
let cache = null;
const baseUrl = 'https://api.jsonbin.io/v3/b/650a7ebece39bb6dce7f5683';

export let lastRequest = { 
  filterOption: null,
  perPageOption:null,
  valueToMatch: null,
  page:null,
  totalClientsAvailable:null,
  filteredClients:null
};

 //stringInterPolation(selectedFilter,valueToMatch);
export default async function makeRequest(filterRequest,onClientCountChange,onResetPage) {
  const selectedFilter = filterRequest.filterOption;
  const valueToMatch = filterRequest.valueToMatch;
  const perPageOption = filterRequest.perPageOption;
  let currentPage = filterRequest.currentPage;

  if(!cache) {
    const response = await fetch(baseUrl);
    const clientData = await response.json();
    cache = clientData.record;
  } 
  if(notSameFilterAsLastOne(selectedFilter,valueToMatch,perPageOption)){
    const filteredClients = filterData(selectedFilter,valueToMatch);
    const clientsAvailable = filteredClients.length;
    currentPage = 0;
    onResetPage(0);
    updateLastRequest(selectedFilter,perPageOption,valueToMatch,clientsAvailable,filteredClients);
  }

  updateLastRequestWithPage(currentPage);
  onClientCountChange({
    totalClients:lastRequest.totalClientsAvailable,
    totalPages:Math.ceil(lastRequest.totalClientsAvailable/perPageOption)
  });

  return slicedFilteredClients(currentPage);
}

function notSameFilterAsLastOne(selectedFilter,valueToMatch,perPageOption){
  return selectedFilter !== lastRequest.filterOption || 
          valueToMatch !== lastRequest.valueToMatch ||
          perPageOption !== lastRequest.perPageOption
}

function updateLastRequest(selectedFilter,perPageOption,valueToMatch,clientsAvailable,filteredClients){
  lastRequest.filterOption = selectedFilter;
  lastRequest.perPageOption = perPageOption;
  lastRequest.valueToMatch = valueToMatch;
  lastRequest.totalClientsAvailable = clientsAvailable;
  lastRequest.filteredClients = (selectedFilter === FILTER_OPTION.ALL) ? null : filteredClients;
}

function updateLastRequestWithPage(currentPage){
  lastRequest.page = currentPage;
}

function filterData(selectedFilter,valueToMatch){
  if(selectedFilter === FILTER_OPTION.ALL){ return cache; }
  return cache.filter((client) => {return filterClient(client,selectedFilter,valueToMatch)});
}

function filterClient(client,selectedFilter,valueToMatch){
  switch(selectedFilter){
    case FILTER_OPTION.PRESENT: return client.present;
    case FILTER_OPTION.ABSENT:  return !client.present;
    case FILTER_OPTION.NAME:    return client.name.toLowerCase().includes(valueToMatch.toLowerCase());
    case FILTER_OPTION.BREED:   return client.breed.toLowerCase().includes(valueToMatch.toLowerCase());
    case FILTER_OPTION.MALE:    return client.sex.toLowerCase() === "male";
    case FILTER_OPTION.FEMALE:  return client.sex.toLowerCase() === "female";
    case FILTER_OPTION.AGE:     return client.age == valueToMatch;
    case FILTER_OPTION.OWNER:   return client.owner.name.toLowerCase().includes(valueToMatch.toLowerCase()) || client.owner.lastName.toLowerCase().includes(valueToMatch.toLowerCase());
    default:                    return false;
  };
}

function slicedFilteredClients(currentPage){
  const filteredClients = (lastRequest.filterOption === FILTER_OPTION.ALL) ? cache : lastRequest.filteredClients;
  const fromIndex = currentPage * lastRequest.perPageOption;
  const toButNotIncludedIndex = fromIndex + lastRequest.perPageOption;
  lastRequest.page = currentPage;
  return filteredClients.slice(fromIndex,toButNotIncludedIndex)
}
