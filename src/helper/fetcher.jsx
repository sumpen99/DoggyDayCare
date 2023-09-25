let cache = null;
const baseUrl = 'https://api.jsonbin.io/v3/b/650a7ebece39bb6dce7f5683';
export default async function makeRequest(selectedFilter) {
  if(!cache) {
      console.log("we are reloading but we shouldnt")
      const response = await fetch(baseUrl);
      const clientData = await response.json();
      cache = clientData.record;
  } 
  else{
    console.log("we are fetching cache")
  }
  return cache;
}
