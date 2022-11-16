let page = 1;


const fetchAndDisplayImage = async (exampleSearchBox) => { 
    const searchString = document.getElementsByClassName("search-bar")[0].value;

    const encodedSearchString = encodeURIComponent(exampleSearchBox)
   

    const result =  await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${encodedSearchString}&fields=id,title,image_id&page=${page}`)
    const parsedResponse = await result.json();
    console.log(parsedResponse)
    const htmlArray = [];
        for (let i = 0; i < parsedResponse.data.length; i++)
        {
            const src = `https://www.artic.edu/iiif/2/${parsedResponse.data[i].image_id}/full/843,/0/default.jpg`
            const imgHtml = `<img src=${src}></img>`
            htmlArray.push(imgHtml)
        }
    
    const htmlString = htmlArray.join('');
    console.log(htmlString)
    document.getElementById("imageContainer").innerHTML = htmlString;
    }


    ////SEARCHBAR
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        
        fetchAndDisplayImage(searchString);
    })


    ///PAGINATION
// const changePage = (pageNumber) => {
//     page = pageNumber;
// }

const paginationContainer = document.getElementsByClassName("pagination")[0];
// console.log(paginationnContainer)

paginationContainer.addEventListener("click", (event) => {
    if(event.target.classList.contains("pagenumber")) { //adds event listener to just nubmers and not on left and right
        const currentActiveButton = document.getElementById(page);
        currentActiveButton.className = "pageNumber";


        event.target.className = "active pageNumber"
        page = event.target.id;  
        console.log("hello", page);
    }
  
})






// const paginationId = [
//     {id:1},
//     {id:2},
//     {id:3},
//     {id:4},
//     {id:5},
//     {id:6},
// ]