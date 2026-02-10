//Anropar fetchData, lagrar array i variabel
const apiKey = "Bearer uvzE9vDWTsLzYBKfsJ-5"
let lotrData=fetchData();



/*Prompt 1: Generate a 'fetch'async-function with 'try & catch' that fetches data from an URL,
 awaits and stores the response, then converts the response from json. If the function is unable
 to load the URL, catch and log an error message.
 (edit: +try & catch)*/

async function fetchData() {
    try {
        const response = await fetch("https://the-one-api.dev/v2/book", 
        /*{headers:{"Authorization": apiKey}*/);

        const data = await response.json();
        return data;

    } catch (error) {

        console.log('Error fetching data:', error.message);
    }
}

console.log(lotrData);

