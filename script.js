let page = 1;

const fetchAndDisplayImage = async () => {
  const searchString = document.getElementById('search-form')[0].value;

  const encodedSearchString = encodeURIComponent(searchString);

  const result = await fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=${encodedSearchString}&fields=id,transcript,title,date_start,date_end,image_id&page=${page}`
  );

  const parsedResponse = await result.json();
  console.log(parsedResponse, 'parsed response');
  const htmlArray = [];
  console.log(htmlArray);
  for (let i = 0; i < parsedResponse.data.length; i++) {
    const info = `https://api.artic.edu/api/v1/mobile-sounds?q=${parsedResponse.data[i].transcript}&page=${page}`;
    const src = `https://www.artic.edu/iiif/2/${parsedResponse.data[i].image_id}/full/843,/0/default.jpg`;
    const imgHtml = `
        <div class="card" id="cardContainer">
        <img src=${src}
         <a href="#" title="${info}" data-toggle="popover" data-trigger="hover" data-content="Some content" delay: { show: 5, hide: 1000 }></a>
          <a href="${src}" target="_blank" class="card-title">${parsedResponse.data[i].title}</a>
          <p class="card-text"> Date: ${parsedResponse.data[i].date_start}-${parsedResponse.data[i].date_end}
          </p>
      </div>`;
    htmlArray.push(imgHtml);
  }

  document.getElementById('imageContainer').innerHTML = htmlArray;
};

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchInput = document.getElementById('searchbar');
  if (searchInput.value.trim() !== '') {
    fetchAndDisplayImage();
  } else {
    location.reload();
  }
});

const searchInput = document.getElementById('searchbar');

searchInput.addEventListener('click', (e) => {
  e.preventDefault();
  if (searchInput !== ' ') {
    searchInput.value = '';
  }
});

const paginationContainer = document.getElementsByClassName('pagination')[0];

const removeActiveClass = () => {
  const currentActiveButton = document.getElementById(page);
  currentActiveButton.className = 'pageNumber';
};

const addActiveClass = (pageNumber) => {
  const newActiveButton = document.getElementById(pageNumber);
  newActiveButton.className = 'active pageNumber';
};

paginationContainer.addEventListener('click', (event) => {
  event.preventDefault();
  if (
    event.target.classList.contains('pageNumber') &&
    event.target.id != page
  ) {
    removeActiveClass();
    page = event.target.id;
    addActiveClass(page);
    fetchAndDisplayImage();
  }
});

const decrementButton = document.getElementById('decrement');
const incrementButton = document.getElementById('increment');

decrementButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (page > 1) {
    removeActiveClass();
    page--;
    addActiveClass(page);
    fetchAndDisplayImage();
  }
});

incrementButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (page < 6) {
    removeActiveClass();
    page++;
    addActiveClass(page);
    fetchAndDisplayImage();
  }
});

const scrollToTopButton = document.getElementById('scrollToTop');
scrollToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('hello, this is scroll to top button');

  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
});
