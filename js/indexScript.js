//API-key
const apiKey = "Bearer uvzE9vDWTsLzYBKfsJ-5";

//Hämtar "<ul>"-elementet från index som vi ska fylla med bok-listan
let indexList = document.getElementsByTagName("ul");


/*PROMPT 1: Generate a 'fetch'async-function with 'try & catch' that fetches data from an URL,
awaits and stores the response, then converts the response from json. If the function is unable
to load the URL, catch and log an error message.
(edit: +try & catch)*/
async function fetchMovies() {
    try {
        const response = await fetch("https://the-one-api.dev/v2/movie", 
        {headers:{"Authorization": apiKey}
        });

        const data = await response.json();
        return data;

    } catch (error) {

        console.log('Error fetching data:', error.message);
    }
}

//console.log(fetchMovies());

/*PROMPT 2: Generate a function with a for-loop that generates a new 'list'-item for each item in the 'lotrMovies'-variable.
Each of the new 'list'-items shall contain a 'link' that leads to "/detailPage.html". Inside each link there shall also be
an image: "images/index_eye.png", and a <h3> element containing the "name:" value of each 'lotrBooks' object.*/
async function displayMovies() {

    //Anropar fetchData, lagrar array i variabel
    const moviesData = await fetchMovies();

    /*PROMPT 3: Generate an arrow function that creates a new variable called 'lotrMovies', then 
    filters the content of the 'moviesData' variable so that 'lotrMovies' only contains the items with
    name: "The Fellowship of the Ring", "The Two Towers" and "The Return of the King".
    */
   //(Fick modda denna lite)
    const lotrMovies = moviesData.docs.filter(movie =>
        movie.name === "The Fellowship of the Ring" ||
        movie.name === "The Two Towers" ||
        movie.name === "The Return of the King"
    );

    //Här skapas HTML'en, automatiserat IFALL man vill lägga till andra filmer/böcker
    for (let movie of lotrMovies) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = "detailPage.html?id="+ movie._id +"&name=" + movie.name;

        console.log (link.href);
        
        const image = document.createElement("img");
        image.src = "images/index_eye.png";
        image.alt = movie.name;
        
        const heading = document.createElement("h3");
        heading.textContent = movie.name;
        
        link.appendChild(image);
        link.appendChild(heading);
        listItem.appendChild(link);
        indexList[0].appendChild(listItem);
    }
}

displayMovies();

//console.log(lotrMovies);

