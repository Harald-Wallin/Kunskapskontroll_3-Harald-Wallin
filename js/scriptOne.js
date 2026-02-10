//const apiKey = "Bearer uvzE9vDWTsLzYBKfsJ-5"



//Anropar fetchData, lagrar array i variabel
let lotrBooks=fetchData();

//Hämtar "<ul>"-elementet från index som vi ska fylla med bok-listan
let indexList = document.getElementsByTagName("ul");


/*PROMPT 1: Generate a 'fetch'async-function with 'try & catch' that fetches data from an URL,
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


/*PROMPT 2: Generate a function with a for-loop that generates a new 'list'-item for each item in the 'lotrBooks'-variable.
Each of the new 'list'-items shall contain a 'link' that leads to "/detailPage.html". Inside each link there shall also be
an image: "images/index_eye.png", and a <h3> element containing the "name:" value of each 'lotrBooks' object.*/
async function displayBooks() {

    const books = await lotrBooks;
    
    for (let book of books.docs) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = "/detailPage.html";
        
        const image = document.createElement("img");
        image.src = "images/index_eye.png";
        image.alt = book.name;
        
        const heading = document.createElement("h3");
        heading.textContent = book.name;
        
        link.appendChild(image);
        link.appendChild(heading);
        listItem.appendChild(link);
        indexList[0].appendChild(listItem);
    }
}

displayBooks();

console.log(lotrBooks);

