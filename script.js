const select = document.getElementById("dropdown-menu");
let movies;

let link = '';

let currentPage = 1;
let numberOfPages = 1;

window.onload = function() {
    link = 'https://api.themoviedb.org/3/discover/movie?api_key=f307de7e6ace470207db3c68af7fc97c&query=m&year=2022&page='
    validateEachPage(1);
    displayGenres();
    select.addEventListener("click", getMovieByGenre);
}

function displayGenres(){
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=f307de7e6ace470207db3c68af7fc97c&language=en-US')
    .then(response => response.json())
    .then(data => { data.genres.forEach(genre => render(genre)) });
}

function render(genre) {
    const item = document.createElement('option');
    item.value = genre.id;
    const content = document.createTextNode(`${genre.name}`);
    item.appendChild(content);
    item.setAttribute("value",genre.name);
    item.setAttribute("id",genre.id);
    select.appendChild(item);
}

function getMovieByGenre(e) 
{
    link = 'https://api.themoviedb.org/3/discover/movie?api_key=f307de7e6ace470207db3c68af7fc97c&query=m&with_genres=' + e.target.id + '&page=';
    console.log(link);
    let title = document.getElementById("titlePage");
    title.innerHTML = e.target.innerHTML + " Movies"; 
    currentPage = 1;
    validateEachPage(1);
}   

function getPereviousPage() {
    if (currentPage > 1) {
        currentPage--;
        validateEachPage(currentPage);
    }
}

function getNextPage() {
    if (currentPage < numberOfPages) {
        currentPage++;
        validateEachPage(currentPage);
    }
}

function validateEachPage(paginationPage) {
    var paginationPage_span = document.getElementById("paginationNumber");
    if (paginationPage < 1)
        paginationPage = 1;
    if (paginationPage > numberOfPages)
        paginationPage = numberOfPages;
    console.log(link + paginationPage);
    getCards(link + paginationPage);
    console.log(paginationPage);
    paginationPage_span.innerHTML = paginationPage;
}

function getCards(link){
    if (document.getElementById('moviesList').innerHTML != ''){
        document.getElementById('moviesList').innerHTML = '';
    }
    fetch(link)
        .then(response => response.json())
        .then(movies => {
            console.log(movies,"movies");
            for (movieDetails in movies.results) {
            document.getElementById('moviesList').innerHTML += createCard(movies.results[movieDetails])
            }
            numberOfPages = movies.total_pages;
            console.log(numberOfPages,"nr total de pagini");
        })
}

function createCard(movie) {
    let imgSrc = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
    return `<article id = "movie">
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${imgSrc}" class="img-fluid rounded-start" alt="Card image">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${movie.title}</h5>
                                <p class="card-text">${movie.overview}</p>
                            </div>
                            <div class = "list">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Release Date: ${movie.release_date}</li>
                                    <li class="list-group-item">Language: ${movie.original_language}</li>
                                </ul>
                            <\div>  
                        </div>
                    </div>
                </div>
            </article>`
}

document.getElementById("btn-trending").addEventListener("click", displayTrendingMovies);

document.getElementById("movies2022").addEventListener("click", display2022Movies);

function display2022Movies(){
    link = 'https://api.themoviedb.org/3/discover/movie?api_key=f307de7e6ace470207db3c68af7fc97c&query=m&year=2022&page='
    let title = document.getElementById("titlePage");
    title.innerHTML = "2022 Movies"; 
    currentPage = 1;
    validateEachPage(1);
}

function displayTrendingMovies() {
    let title = document.getElementById("titlePage");
    title.innerHTML = "Trending Movies Of The Week"; 
    link = 'https://api.themoviedb.org/3/trending/movie/week?api_key=f307de7e6ace470207db3c68af7fc97c&page='
    currentPage = 1;
    validateEachPage(1);
}