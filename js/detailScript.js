//API-key
const apiKey = "Bearer uvzE9vDWTsLzYBKfsJ-5";

//Hämtar den "hemmagjorda" parametern (allt efter "?" i URL) och lagrar den.
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const movieName = params.get("name");

console.log(movieId);
console.log(movieName);

//Hämtar det första elementet med .movieName-klassen från document, och sätter relevant innehåll
const headerMovieName = document.querySelector(".movieName");
headerMovieName.innerHTML = movieName;

/* PROMPT 4:Generate a 'fetch'async-function with 'try & catch' that fetches data from an URL,
awaits and stores the response, then converts the response from json. If the function is unable
to load the URL, catch and log an error message.*/
async function fetchMovieQuotes() {
    try {
        const response = await fetch("https://the-one-api.dev/v2/movie/" + movieId +"/quote", 
            {headers:{"Authorization": apiKey}});

        const data = await response.json();
        return data;

    } catch (error) {
        console.log('Error loading URL:', error.message);
    }
}

let randomQuote = function(){
//FORTSÄTT HÄR + GÖR EN FETCH CHARACTER FUNKTION
}
//console log
fetchMovieQuotes().then(data => {
    console.log("Quotes from API:", data);
});
