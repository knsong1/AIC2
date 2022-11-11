


document.addEventListener('DOMContentLoaded', function() {// code here will execute after the document is loaded
    document.addEventListener('click', function(event) { 
            if(event.target.classList.contains("add-button")) {
                const movieID = event.target.dataset.imdbid;
                saveToWatchList(movieID);
            }
          })
 });

///movies showing up in search bar//
const myForm = document.getElementById('search-bar');//this renders out what we are retrieving from the API
myForm.addEventListener('submit',async function(e){
    e.preventDefault();

    const searchString = document.getElementsByClassName("search-bar")[0].value;
    const urlEncodedSearchString = encodeURIComponent(searchString);
    await fetch("https://api.artic.edu/api/v1/artworks=" + urlEncodedSearchString)
        .then(async function(response) {
            return await response.json();
        })
        .then(function(data) {//actual usuable data that we can do something with//
        document.getElementsByClassName("art-container")[0].innerHTML = renderMovie(data.Search);// event listener code goes here
       artData = data.Search;
        });

})


const renderArt = (artArray) => {
    const movieHtmlArray = movieArray.map(function(currentMovie) {
       return ${}
    })
    return movieHtmlArray.join('');
}

const saveToWatchList = (movieID) => {
    const movie = movieData.find((currentMovie) => {
        return currentMovie.imdbID == movieID;
    })
    let watchlistJSON = localStorage.getItem("watchlist");
    let watchlist = JSON.parse(watchlistJSON);

    if (watchlist == null) { //if they didn't have a watchlist yet//
        watchlist = [];
    }
    watchlist.push(movie);
    watchlistJSON = JSON.stringify(watchlist); //turns it back into a string, and then save it into local
    localStorage.setItem("watchlist", watchlistJSON);
}