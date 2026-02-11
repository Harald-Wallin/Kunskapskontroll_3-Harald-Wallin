//API-key
const apiKey = "Bearer uvzE9vDWTsLzYBKfsJ-5";

//Hämtar den "hemmagjorda" parametern (allt efter "?" i URL) och lagrar den.
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const movieName = params.get("name");

//Hämtar doc.elementen vi ska ändra värdet i från html
let quoteParagraph = document.getElementById("quote");
let characterParagraph = document.getElementById("character");

//Buttons
let generateBtn = document.getElementById("generateBtn");
let backBtn = document.getElementById("backBtn");

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

/* PROMPT 5: Generate an async function named 'randomQuoteGenerator' that awaits fetchMovieQuotes(), picks a random object
 from 'data.docs'-function, and returns the value of '.dialog:' and 'character:'in a variable called 'randomQuote'
*/
async function randomQuoteGenerator() {
    const data = await fetchMovieQuotes();

    //ALLT innuti det hämtade API't
    const quotesArray = data.docs;

    //(Detta funkar men jag tror jag hade jobbat med en randomNumber-generator(?) om jag jobbat
    //utan AI (för att jag är mer bekväm med det)).
    const randomIndex = Math.floor(Math.random() * quotesArray.length);

    //Plockar ut alla element tillhörande en quote 
    const randomQuote = quotesArray[randomIndex];
    const characterId = randomQuote.character;

    return randomQuote;
}

/*PROMPT 6: Generate an async fetch-function called 'fetchCharacter' with 'try & catch', that 
fetches data from the URL "https://the-one-api.dev/v2/character/", awaits and converts the 
response from JSON in a variable. Catch shall log an 'error' message.
(EDIT: then return 'data.docs[0].name;')*/
async function fetchCharacter(characterId) {
    try {
        const response = await fetch(
            "https://the-one-api.dev/v2/character/" + characterId,
            {headers: { "Authorization": apiKey }});

        const data = await response.json();

        return data.docs[0].name;

    } catch (error) {
        console.log("Karaktären hittades ej:", error.message);
    }
}

/*PROMPT 7: Generate a click event listener for 'generateBtn' that runs runs an "async" function
with 'try & catch', wich in turn runs 'randomQuoteGenerator()' and 'fetchCharacter()', 
sets quoteParagraph.textContent to the quote's dialog, and sets characterParagraph.textContent
to the returned character name. 'Catch' shall log "Något gick fel" inside quoteParagraph.textContent,
and a console.log with an error.message.
*/
generateBtn.addEventListener("click", async function () {
    try {
        const randomQuote = await randomQuoteGenerator();

        quoteParagraph.textContent = randomQuote.dialog;

        const characterName = await fetchCharacter(randomQuote.character);

        characterParagraph.textContent = " - " + characterName;

    } catch (error) {
        quoteParagraph.textContent = "Something went wrong...";
        characterParagraph.textContent = "";
        console.log("Error generating quote:", error.message);
    }
});

/*PROMPT 8: Generate a click event-listener for backBtn that directs user back to index.page*/
backBtn.addEventListener("click", function () {
    window.location.href = "index.html";
});


//---------Borttagna console.logs-----------

//console.log(movieId);
//console.log(movieName);
//console.log(quoteParagraph);
//console.log(characterParagraph);

//randomQuoteGenerator().then(quote => {
//    console.log(quote);
//});

//console log
//fetchMovieQuotes().then(data => {
//    console.log("Quotes from API:", data);
//});
