import { FILTER_OPTION,stringInterPolation } from "./core";
let cache = null;
const baseUrl = 'https://api.jsonbin.io/v3/b/650a7ebece39bb6dce7f5683';

export default async function makeRequest(selectedFilter,valueToMatch) {
  if(!cache) {
    console.log("we are reloading but we shouldnt")
    const response = await fetch(baseUrl);
    const clientData = await response.json();
    cache = clientData.record;
  } 
  //stringInterPolation(selectedFilter,valueToMatch);
  return filterData(selectedFilter,valueToMatch);
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
