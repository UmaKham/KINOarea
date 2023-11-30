import { getData } from './modules/helpers'
import { 
    reload_movie, 
    reload_actors, 
    reload_box_office, 
    reload_coming_soon, 
    reload_search_movie,
    reload_search_actor,
    reload_trailer
} from './modules/ui'

/////////////////// NOW-PLAYING ///////////////////

let movie_box = document.querySelector('.now_playing')

Promise.all([getData('/movie/now_playing'), getData('/genre/movie/list')])
    .then(([movies, genres]) => {
        reload_movie(movies.data.results.slice(0, 8), movie_box, genres.data.genres)
    });

let now_playing_btn = document.querySelector('.new_movie_btn')

now_playing_btn.onclick = () => {
    location.assign('/pages/new/')
}

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

let search_input = document.querySelector('.search_input')
let search_boxs = document.querySelector('.search_boxs')
let results_box = document.querySelector('.movie_box')
let actor_box = document.querySelector('.actor_box')
let search_btn = document.querySelector('.search')
let btn_close = document.querySelector('[data-close]')
let search_box = document.querySelector('.search_box')

function debounce(func, timeout = 600) {
    let timer;
    return (... args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

function saveInput() {
    Promise.all([getData(`/search/movie?query=${search_input.value}&page=1`), getData('/genre/movie/list')])
    .then(([movies, genres]) => {
        reload_search_movie(movies.data.results, results_box, genres.data.genres)
    })

getData(`/search/person?query=${search_input.value}&page=1`)
.then((res) => {
    reload_search_actor(res.data.results, actor_box);
})
}
getData(`/search/person?query=statham&page=1`)
    .then((res) => {
        console.log(res.data.results);
        // reload_search_actor(res.data.results, actor_box);
    })

const processChange = debounce(() => saveInput())

search_btn.onclick = () => {
    search_boxs.style.height = 'fit-content'
    search_box.classList.add('visible')
    results_box.innerHTML = ''
    actor_box.innerHTML = ''
    document.body.style.overflow = 'hidden'
}
btn_close.onclick = (e) => {
    if(e.target.getAttribute('data-close') !== null) {
        search_box.classList.remove('visible')
        search_input.value = ''
    }
}
search_input.onfocus = () => {
    results_box.style.height = '550px'
}
search_input.onkeyup = () => {
    processChange()
}

/////////////////// TRAILER_LIST_VIDEO ///////////////////

let trailer_list_video = document.querySelector('.trailer_list_video')

getData('/movie/top_rated')
    .then((res) => {
        reload_trailer(res.data.results, trailer_list_video);
    })