class App {
    static async run() {
        const movies = await APIService.fetchMovies()
        HomePage.renderMovies(movies);
        const genrList = await APIService.fetchDropdowngenr()
        GenrDropdown.renderGenrs(genrList);   
    }
}
class GenrDrop {
    static async run(genreId) {
        HomePage.container.innerHTML = "";
        const discoverData = await APIService.fetchGenresList(genreId);
        HomePage.renderMovies(discoverData);
    }
}
class AppPopularActor{
    static async run() {
        const actorpopular = await APIService.fetchPersonPopular()
        PopularActorPage.renderMovies(actorpopular);
    }
}
class SearchList {
    static async run(userInput){
        HomePage.container.innerHTML = "";
        const searchMovies = await APIService.fetchSearchMovie(userInput)
        HomePage.renderMovies(searchMovies)
        const searchActors = await APIService.fetchSearchActor(userInput);
        renderActors(actorMovie)
    }
}
class FilterList{
    static async run(filter="nowPlaying"){
        HomePage.container.innerHTML = "";
        if (filter==="topRated"){
        const topRatedMovies = await APIService.fetchTopRatedMovies();
        HomePage.renderMovies(topRatedMovies);
        }
        if (filter==="popularMovie"){
       const popularMovies = await APIService.fetchPopularMovies();
        HomePage.renderMovies(popularMovies);
        }
       if (filter==="nowPlaying"){
       const nowPlayingMovies = await APIService.fetchNowPlayingMovies();
        HomePage.renderMovies(nowPlayingMovies);
        }
        if (filter==="upComing"){
        const upComingMovies = await APIService.fetchUpComingMovies();
        HomePage.renderMovies(upComingMovies);
        }
        if (filter==="releaseDate"){
         const releaseDateMovies = await APIService.fetchReleaseDateMovies();
        HomePage.renderMovies(releaseDateMovies);
        }       
    }  
}


class APIService {
    static TMDB_BASE_URL = 'https://api.themoviedb.org/3';
    static async fetchMovies() {
        const url = APIService._constructUrl(`movie/now_playing`)
        const response = await fetch(url)
        const data = await response.json()
        return data.results.map(movie => new Movie(movie))
    }
    static async fetchMovie(movieId) {
        const url = APIService._constructUrl(`movie/${movieId}`)
        const response = await fetch(url)
        const data = await response.json()
        return new Movie(data)
    }
    static async fetchDropdowngenr() {
        const url = APIService._constructUrl(`genre/movie/list`)
        const response = await fetch(url);
        const data = await response.json();
        return data.genres
    }
    static async fetchGenresList(genreId) {
        const url = APIService._constructUrl(`discover/movie`) + `&with_genres=${genreId}`
        const response = await fetch(url);
        const data = await response.json();
        return data.results.map(movie => new Movie(movie))
    }
    static async fetchPersonPopular() {
        const url = APIService._constructUrl(`person/popular`)
        const response = await fetch(url)
        const data = await response.json()
        return data.results.map(movie => new PopularActor(movie))
    }
    static async fetchActor(personId){
        const url = APIService._constructUrl(`person/${personId}`)
        const response = await fetch(url)
        const data = await response.json()
        return new SingleActorPage(data)
    }
    static async fetchActorMovieCredit(personId){
        const url = APIService._constructUrl(`person/${personId}/movie_credits`)
        const response = await fetch(url)
        const data = await response.json()
        return data.cast.map(x => new SingleActorPageMovieCredit(x))
    }
    static async fetchActors(movie) {
        const url = APIService._constructUrl(`movie/${movie.id}/credits`)
        const response = await fetch(url)
        const data = await response.json()
        return data.cast.map(x => new Credit(x))
    }
    static async fetchCrew(movie) {
        const url = APIService._constructUrl(`movie/${movie.id}/credits`)
        const response = await fetch(url)
        const data = await response.json()
        return data.crew.map(x => new CreditCrew(x))
    }
    static async fetchSimilarMovies(movie) {
        const url = APIService._constructUrl(`movie/${movie.id}/similar`)
        const response = await fetch(url)
        const data = await response.json()
        return data.results.map(x => new Similar(x))
    }
    static async fetchSearchMovie(userInputs){
        const url = APIService._constructUrl(`search/movie`) + `&query=${userInputs}`
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data.results.map(movie => new Movie(movie))
    }
    static async fetchSearchActor(userInputs){
        const url = APIService._constructUrl(`search/person`) + `&query=${userInputs}`
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        return data.results.map(actor => new Actor(actor))
    }
    static async fetchTrailer(movie) {
        const url = APIService._constructUrl(`movie/${movie.id}/videos`)
        const response = await fetch(url)
        const data = await response.json()
        return data.results.map(x => new Trailer(x))
    }
    static async fetchTopRatedMovies(){
        const url = APIService._constructUrl(`movie/top_rated`) 
        const response = await fetch(url);
        const data = await response.json();
        return data.results.map(movie => new Movie(movie))
    }
     static async fetchPopularMovies(){
        const url = APIService._constructUrl(`movie/popular`) 
        const response = await fetch(url);
        const data = await response.json();
        return data.results.map(movie => new Movie(movie))
    }
     static async fetchNowPlayingMovies(){
        const url = APIService._constructUrl(`movie/now_playing`) 
        const response = await fetch(url);
        const data = await response.json();
        return data.results.map(movie => new Movie(movie))
    }   
    static async fetchUpComingMovies(){
        const url = APIService._constructUrl(`movie/upcoming`) 
        const response = await fetch(url);
        const data = await response.json();
        return data.results.map(movie => new Movie(movie))
    }
    static async fetchReleaseDateMovies(){
        const url = APIService._constructUrl(`movie/${movie_id}/release_dates`)
        const response = await fetch(url);
        const data = await response.json();
        return data.results.map(movie => new Movie(movie))
    }
    
    static _constructUrl(path) {
        return `${this.TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}`;
    }
}
class SingleActorPage{
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
        this.id = json.id
        this.name = json.name
        this.gender = json.gender
        this.popularity = json.popularity
        this.birthday = json.birthday
        this.deathday = json.deathday
        this.biography = json.biography
        this.profile_path = json.profile_path
    }
    get backdropUrl() {
        return this.backdropPath ? SingleActorPage.BACKDROP_BASE_URL + this.backdropPath : "";
    }
}
 const inputs = document.getElementById("inputs");
 const searchForm = document.getElementById("searchForm");
        searchForm.addEventListener("submit", function (e) {
        e.preventDefault()
        SearchList.run(inputs.value);
})
class SingleActorPageMovieCredit{
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
        this.original_title = json.original_title
        this.poster_path = json.poster_path
        this.id = json.id
    }
    get backdropUrl() {
        return this.backdropPath ? SingleActorPageMovieCredit.BACKDROP_BASE_URL + this.backdropPath : "";
    }
}
class CreditCrew {
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
        this.name = json.name
        this.job = json.job
        
    }
    get backdropUrl() {
        return this.backdropPath ? CreditCrew.BACKDROP_BASE_URL + this.backdropPath : "";
    }
}
class Credit {
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
        this.castName = json.name
        this.character = json.character
        this.profile_path = json.profile_path
        this.id = json.id
    }
    get backdropUrl() {
        return this.backdropPath ? Credit.BACKDROP_BASE_URL + this.backdropPath : "";
    }
}
class Similar {
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
        this.id = json.id
        this.original_title = json.original_title
        this.poster_path = json.poster_path
    }
    get backdropUrl() {
        return this.backdropPath ? Similar.BACKDROP_BASE_URL + this.backdropPath : "";
    }
}
class Trailer {
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
        this.key = json.key
    }
    get backdropUrl() {
        return this.backdropPath ? Trailer.BACKDROP_BASE_URL + this.backdropPath : "";
    }
}
class Movie {
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
        this.id = json.id;
        this.title = json.title;
        this.releaseDate = json.release_date;
        this.runtime = json.runtime + " minutes";
        this.overview = json.overview;
        this.backdropPath = json.poster_path;
        this.language = json.original_language.toUpperCase()
        this.genres = json.genres;
        this.vote_count = json.vote_count;
        this.vote_average = json.vote_average;
        this.production_companies = json.production_companies;
    }
    get backdropUrl() {
        return this.backdropPath ? Movie.BACKDROP_BASE_URL + this.backdropPath : "";
    }
}
class PopularActor {
    static BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
    constructor(json) {
        this.profile_path = json.profile_path;
        this.id = json.id;
        this.name = json.name
    }
    get backdropUrl() {
        return this.backdropPath ? PopularActor.BACKDROP_BASE_URL + this.backdropPath : "";
    }
}
class PopularActorPage {
    static container = document.getElementById('container');
    static renderMovies(actors) {
        let BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780';
        this.container.innerHTML = " "
        actors.forEach(actor => {
            let urlActor = BACKDROP_BASE_URL + actor.profile_path
            const actorDiv = document.createElement("div");
            actorDiv.setAttribute("class", "popularActorDiv")
            const actorImage = document.createElement("img");
            actorImage.src = `${urlActor}`;
            const actorTitle = document.createElement("h3");
            actorTitle.textContent = `${actor.name}`;
            actorImage.addEventListener("click", function() {
            Actor.run(actor.id);  });
            actorDiv.appendChild(actorTitle);
            actorDiv.appendChild(actorImage);
            this.container.appendChild(actorDiv);
        })
    }
}
class HomePage {
    static container = document.getElementById('container');
    static renderMovies(movies) {
        this.container.innerHTML = " "
        movies.forEach(movie => {
            const movieDiv = document.createElement("div");
            const movieImage = document.createElement("img");
            movieImage.src = `${movie.backdropUrl}`;
            const movieTitle = document.createElement("p");
            movieTitle.textContent = `${movie.title}`;


      //Hover
      const hoverDiv = document.createElement("div");
      hoverDiv.setAttribute("class", "hoverDetails");
      const hoverDivContent = document.createElement("p");
      //DOCS GOOGLE BUGS CHECK
      hoverDivContent.innerHTML = `
                <span>Rating: ${movie.vote_average}</span>
            `;
      hoverDiv.append(hoverDivContent);

      movieDiv.addEventListener("click", function () {
        Movies.run(movie);
      });

            movieImage.addEventListener("click", function() {
                Movies.run(movie);
            });

            movieDiv.appendChild(movieTitle);
            movieDiv.appendChild(movieImage);
            movieDiv.append(hoverDiv);
            this.container.appendChild(movieDiv);
        })
    }
}
//filter

const dropdownNowPlaying = document.getElementById("nowPlaying");
    dropdownNowPlaying.addEventListener("click", function (e){
        FilterList.run("nowPlaying")
    })
const dropdownUpComing = document.getElementById("upComing");
    dropdownUpComing.addEventListener("click", function (e){
        FilterList.run("upComing")
    })    
const dropdownTopRated = document.getElementById("topRated");
    dropdownTopRated.addEventListener("click", function (e){
        FilterList.run("topRated")
         })
const dropdownPopular = document.getElementById("popularMovie");
    dropdownPopular.addEventListener("click", function (e){
        FilterList.run("popularMovie")
    })
const dropdownReleaseDate = document.getElementById("releaseDate");
    dropdownReleaseDate.addEventListener("click", function (){
        FilterList.run("releaseDate");
    })

class Movies {
    static async run(movie) {
        const movieData = await APIService.fetchMovie(movie.id)       
        let fetchActorsVari = await APIService.fetchActors(movie)
        let fetchSimilarMovies = await APIService.fetchSimilarMovies(movie)
        let fetchTrailer = await APIService.fetchTrailer(movie)
        let fetchCrewVari = await APIService.fetchCrew(movie)
        MoviePage.renderMovieSection(movieData, fetchActorsVari, fetchSimilarMovies, fetchTrailer, fetchCrewVari);
    }
}

class Actor{
    static async run(actorid){
        let actorData = await APIService.fetchActor(actorid)
        let actorDataMovieCredit = await APIService.fetchActorMovieCredit(actorid)
        ActorInfoPage.renderSingleActorPage(actorData, actorDataMovieCredit)
    }
}
class ActorInfoPage{
    static container = document.getElementById('container');
    static renderSingleActorPage(actorInstance, actorMovie){
        const BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780'

        let actorPicinSinglePage = BACKDROP_BASE_URL + actorInstance.profile_path

        let gender 
        if (actorInstance.gender == 2) {
            gender = "Male"  }
        else{
            gender = "Female" }

        let deathdayVari
        if(actorInstance.deathday == null){
            deathdayVari =""   }
        else{
            deathdayVari = actorInstance.deathday   }

        let arrayForActorMovie = []
        for(let i = 0; i < actorMovie.length; i++){
            if(actorMovie[i].poster_path !== null){
                arrayForActorMovie.push(BACKDROP_BASE_URL + actorMovie[i].poster_path)
            }
        }

        const imgHTMLArray = []
        for(let i = 0; i < 5; i++){
            imgHTMLArray.push( `
            <div class = "actorAllMoviesPicinDiv">
                <img src="${arrayForActorMovie[i]}" alt="${actorMovie[i].poster_path}" width="35%" class = "actorAllMoviesPic"> 
            </div>
            `) 
        }
        console.log(imgHTMLArray)




        container.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img id="movie-backdrop" src=${actorPicinSinglePage}> 
            </div>

            <div class="col-md-8">
                <h3>Overview:</h3>
                <p id="movie-name">Name: ${actorInstance.name}</p>
                <p id="movie-gender">Gender: ${gender}</p>
                <p id="movie-popularity">Popularity: ${actorInstance.popularity}</p>
                <p id="movie-date">Date: ${actorInstance.birthday}  ${deathdayVari}</p>
            </div>
         </div> 

        <div class="row">
            <div class="col-md-12">
                <h3>Biography</h3>
                <div>
                    <p>${actorInstance.biography}</p>
                </div>
            </div>
        </div>  

        <div class="row">
            <div class="col-md-12">
                <h3>A list of movies the actor participated in</h3>
                <div id = "movieClassinActorPage">
                   ${imgHTMLArray.join(' ')}
                </div>
            </div>
        </div>  
        
        
        `
        let moviePic = document.getElementsByClassName("actorAllMoviesPicinDiv")
        for(let i = 0; i < moviePic.length; i++){
            moviePic[i].addEventListener("click", function(){
                Movies.run(actorMovie[i])
            })
        }
        
    }
}


class MoviePage {
    static container = document.getElementById('container');
    static renderMovieSection(movie, credits, similar, trailer, crew) {
        MovieSection.renderMovie(movie, credits, similar, trailer, crew);
    }
}

class GenrDropdown {
    static renderGenrs(genres) {
        const genresNames = document.getElementById('dropdown-genr')
        genres.forEach(genre => {
            const genritems = document.createElement("a");
            genritems.textContent = `${genre.name}`;
            genritems.className = "dropdown-item";
            genritems.addEventListener("click", function () {
                GenrDrop.run(genre.id);
            });
            genresNames.appendChild(genritems);
        })
    }
}

class MovieSection { 
    static renderMovie(movie, credits, similar, trailer, crew) {
        const BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780'

        let arrayForGenres = []
        for(let i = 0; i < movie.genres.length ; i++){
            arrayForGenres.push(movie.genres[i].name)
        }

        let arrayForCastName = []
        let arrayForCastNamePic = []
        let arrayForCharacter = []
        for(let j = 0; j < 5; j++){
            arrayForCastName.push(credits[j].castName)
            arrayForCharacter.push(credits[j].character)
            arrayForCastNamePic.push(BACKDROP_BASE_URL + credits[j].profile_path)
        }

        let imgHTMLArray = []
        for(let o = 0; o < 5; o++){
            imgHTMLArray.push(`<img src="${arrayForCastNamePic[o]}" alt="${arrayForCastName[o]}" width="35%" class = "castPic"><span>${arrayForCastName[o]} as ${arrayForCharacter[o]}</span>`)
        }

        let nameForSimilarMovies = []
        let imageForSimilarMovies = []
        for(let k = 0; k < 5; k++){
            nameForSimilarMovies.push(similar[k].original_title)
            imageForSimilarMovies.push(BACKDROP_BASE_URL + similar[k].poster_path)
        }

        let imageSimilarHTML = []       
        for(let k = 0; k < 5; k++){
            imageSimilarHTML.push(`<img src="${imageForSimilarMovies[k]}" alt="${nameForSimilarMovies[k]}" width="35%" class = "actorAllMoviesPic"><br><span>${nameForSimilarMovies[k]}</span>`)
        }


        let youtubeTrailer = `"https://www.youtube.com/embed/${trailer[0].key}"`

        let director
        for(let crewFor = 0; crewFor < crew.length; crewFor++){
            if(crew[crewFor].job == "Director"){
                director = crew[crewFor].name
            }
        }

        let arrayForProduction = []
        let nameForProduction = []
        for (let z = 0; z < movie.production_companies.length; z++){
            arrayForProduction.push(BACKDROP_BASE_URL + movie.production_companies[z].logo_path)
            nameForProduction.push(movie.production_companies[z].name)
        }

        let imageProductionHTML = []
        for(let pp = 0; pp < 1; pp++){
            imageProductionHTML.push(`<img src="${arrayForProduction[pp]}" alt="${nameForProduction[pp]}" width="35%" class = "actorAllMoviesPic"><br><span>${nameForProduction[pp]}</span>`)
        }

      
        MoviePage.container.innerHTML = `
      <div class="row">
        <div class="col-md-4">
          <img id="movie-backdrop" src=${movie.backdropUrl}> 
        </div>

        <div class="col-md-8">
          <h3 id="movie-title">${movie.title}</h3>
          <p id="genres">Genres: ${arrayForGenres}</p>
          <p id="movie-release-date">Release Date: ${movie.releaseDate}</p>
          <p id="movie-runtime">Runtime: ${movie.runtime}</p>
          <p id="language">Language: ${movie.language}</p>
          <p id="movie-vote_average">Average Rate of Movie: ${movie.vote_average}</p>
          <p id="movie-vote_count">Vote Count: ${movie.vote_count}</p>
          <p id="movie-director">Director: ${director}</p>
          
        </div>
      </div>


      <div class="row">
        <div >
            <p>Overview:</p>
            <p id="movie-overview">${movie.overview}</p>
        </div>
      </div> 

      <div class="row">
        <div >
            <p>Actors:</p>
            <div id = "castInMovie">
                ${imgHTMLArray.join(' ')}
            </div>
        </div>
      </div>  

      <div class="row">
        <div>
            <h3>Trailer</h3>
            <div>
                <iframe id="youtubeTrailer" src=${youtubeTrailer}></iframe> 
            </div>
        </div>
      </div>  

      <div class="row">
        <div class="col-md-12">
            <h3>Similar Movies</h3>
            <div class="similar">
                ${imageSimilarHTML}
            </div>
        </div>
      </div>  

  

      <div class="row">
        <div class="col-md-12">
            <h3>Production Companies</h3>
            <div>
                ${imageProductionHTML}
            </div>
        </div>
      </div>  
    `;

    let actorPic = document.getElementsByClassName("castPic")
    for(let p = 0; p < actorPic.length; p++){
        actorPic[p].addEventListener("click", function(){
            Actor.run(credits[p].id)
        })
    }

    let actorAllMoviesPicinClass = document.getElementsByClassName("actorAllMoviesPic")
    for(let i = 0; i < actorAllMoviesPicinClass.length; i++){
        actorAllMoviesPicinClass[i].addEventListener("click", function(){
            Movies.run(similar[i])
        })
    }

    }
}


function about(){
        MoviePage.container.innerHTML = `
        <div class="container">
        <div class="container text-center">
        <h3>IMDB Movies</h3>
        <p><em>Watch and Enjoy!</em></p>
        <p>IMDb (an acronym for Internet Movie Database) is an online database of information related to films, television programs, home videos, video games, and streaming content online – including cast, production crew and personal biographies, plot summaries, trivia, ratings, and fan and critical reviews. An additional fan feature, message boards, was abandoned in February 2017. Originally a fan-operated website, the database is now owned and operated by IMDb.com, Inc., a subsidiary of Amazon.</p>
        <p> As of December 2020, IMDb has approximately 7.5 million titles (including episodes) and 10.4 million personalities in its database,[2] as well as 83 million registered users.</p>
        <p>IMDb began as a movie database on the Usenet group "rec.arts.movies" in 1990 and moved to the web in 1993.</p>      
        `
    }
document.addEventListener("DOMContentLoaded",() => App.run('now_playing'));

