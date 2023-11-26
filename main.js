import { getData } from './modules/helpers'
import { reload_movie, reload_actors, reload_box_office, reload_coming_soon } from './modules/ui'

/////////////////// NOW-PLAYING ///////////////////

let movie_box = document.querySelector('.now_playing')

Promise.all([getData('/movie/now_playing'), getData('/genre/movie/list')])
    .then(([movies, genres]) => {
        reload_movie(movies.data.results.slice(0, 8), movie_box, genres.data.genres)
        console.log(movies.data.results);
    });

/////////////////// POPULAR-MOVIE ///////////////////

let popular_movie = document.querySelector('.popular_movie')

Promise.all([getData('/movie/popular'), getData('/genre/movie/list')])
    .then(([movies, genres]) => {
        reload_movie(movies.data.results.slice(0, 8), popular_movie, genres.data.genres)
    });

/////////////////// POPULAR-ACTORS ///////////////////

let popular_person = document.querySelector('.popular_person')

getData('/person/popular')
    .then(res => {
        reload_actors(res.data.results, popular_person)
        
    })

let actors_ids = []

getData('/person/popular')
    .then(res => {
        actors_ids.push(res.data.results[0].id, res.data.results[1].id)
    })

getData(`/person/3194176/images`)
    .then(res => {
        console.log(res.data.profiles[0].file_path);
    })

/////////////////// COMING-SOON ///////////////////

let coming_soon = document.querySelector('.item_box')

Promise.all([getData('/movie/upcoming'), getData('/genre/movie/list')])
    .then(([movies, genres]) => {
        reload_coming_soon(movies.data.results.slice(0, 8), coming_soon, genres.data.genres)
    });

/////////////////// BOX-OFFICE ///////////////////

let movie_list = document.querySelector('.movie_list')

getData('/movie/popular')
    .then(movies => {
        reload_box_office(movies.data.results.slice(0, 5), movie_list)
    });

/////////////////// SEARCH_MOVIE ///////////////////

let search_box = document.querySelector('.search_box')
let search_btn = document.querySelector('.search')

search_btn.onclick = () => {
    if(search_box.classList.contains('visible')) {
        search_box.classList.remove('visible')
    } else {
        search_box.classList.add('visible')
    }
}