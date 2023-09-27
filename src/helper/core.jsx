// http://localhost:5173/
export const CLIENTS_PER_PAGE = 3;

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
