// http://localhost:5173/
export const CLIENTS_PER_PAGE = 30;

export const FILTER_OPTION = Object.freeze({
    ALL:"All",
    NAME:"Name",
    BREED:"Breed",
    PRESENT:"Present",
    ABSENT:"Absent",
    MALE:"Male",
    FEMALE:"Female",
    AGE:"Age",
    OWNER:"Owner",
});

export const CLIENTS_PER_PAGE_OPTION = Object.freeze({
    FOUR:4,
    EIGHT:8,
    SIXTEEN:16,
    THIRTYTWO:32,
    ONE_HUNDRED:100
});

export function stringInterPolation(...args){
    let str = "";
    args.forEach( (arg) =>
        str += `${arg} `
    );
    console.log(str)
}

export async function parseBreedFromListOfClients(clients){
    return new Promise( resolve => { const breeds = parseBreeds(clients); resolve(breeds); })
}

function parseBreeds(clients){
    const breeds = {};
    clients.map(client => {
        const breed = client.breed; 
        if(breed in breeds){
            breeds[breed]++;
        } 
        else{
            breeds[breed] = 1;
        }
    });
    return breeds;

}

export function capitalizeFirstLetter(string) {
    if(!string){return string;}
    return string.charAt(0).toUpperCase() + string.slice(1);
}