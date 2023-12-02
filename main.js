import {
    getData
} from './modules/helpers'
import {
    reload_movie,
    reload_actors,
    reload_box_office,
    reload_coming_soon,
    reload_search_movie,
    reload_search_actor,
    reload_trailer,
    reload_person,
    reload_person_list,
    reload_genres
} from './modules/ui'

import Swiper from "swiper"
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
/////////////////// NOW-PLAYING ///////////////////
let movie_box = document.querySelector('.now_playing')

Promise.all([getData('/movie/now_playing?language=ru'), getData('/genre/movie/list?language=ru')])
    .then(([movies, genres]) => {
        reload_movie(movies.data.results.slice(0, 10), movie_box, genres.data.genres)
    });

let now_playing_btn = document.querySelector('.new_movie_btn')

now_playing_btn.onclick = () => {
    location.assign('/pages/new/')
}

/////////////////// POPULAR-MOVIE ///////////////////
let popular_movie = document.querySelector('.popular_movie')

Promise.all([getData('/movie/popular?language=ru'), getData('/genre/movie/list?language=ru')])
    .then(([movies, genres]) => {
        reload_movie(movies.data.results, popular_movie, genres.data.genres)
    });
/// FILTER_YEAR ///
let year_btn = document.querySelectorAll('.title_popular ul li')

year_btn.forEach(btn => {
    let year = btn.innerHTML
    btn.onclick = () => {
        year_btn.forEach(btn_remove_active => {
            btn_remove_active.classList.remove('active')
        })
        btn.classList.add('active')

        Promise.all([getData(`/discover/movie?language=ru-RU&primary_release_year=` + year), getData('/genre/movie/list?language=ru')])
    .then(([movies, genres]) => {
        reload_movie(movies.data.results, popular_movie, genres.data.genres)
    });
    }
})

/////////////////// POPULAR-ACTORS ///////////////////
let popular_person = document.querySelector('.popular_person')

getData('/person/popular?language=ru')
    .then(res => {
        reload_actors(res.data.results, popular_person)
    })

let actors_ids = []

getData('/person/popular?language=ru')
    .then(res => {
        actors_ids.push(res.data.results[0].id, res.data.results[1].id)
    })

getData(`/person/3194176/images`)
    .then(res => {})

/////////////////// COMING-SOON ///////////////////
let coming_soon = document.querySelector('.item_box')

Promise.all([getData('/movie/upcoming?language=ru'), getData('/genre/movie/list?language=ru')])
    .then(([movies, genres]) => {
        reload_coming_soon(movies.data.results.slice(0, 10), coming_soon, genres.data.genres)
    });

/////////////////// BOX-OFFICE ///////////////////

let movie_list = document.querySelector('.movie_list')

getData('/movie/popular?language=ru')
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
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

function saveInput() {
    Promise.all([getData(`/search/movie?query=${search_input.value}&page=1`), getData('/genre/movie/list'), getData(`/search/person?query=${search_input.value}`)])
        .then(([movies, genres, actors]) => {
            reload_search_movie(movies.data.results, results_box, genres.data.genres)
            reload_search_actor(actors.data.results, actor_box);
        })
}
getData(`/search/person?query=statham&page=1`)
    .then((res) => {
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
    if (e.target.getAttribute('data-close') !== null) {
        search_box.classList.remove('visible')
        search_input.value = ''
        document.body.style.overflow = ''
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

getData('/movie/top_rated?language=ru')
    .then((res) => {
        reload_trailer(res.data.results, trailer_list_video);
    })

    trailer(299536)

export function trailer(id) {
    let iframe = document.querySelector('.video iframe')
    let title_trailer = document.querySelector('.bottom_title h1')
    getData(`/movie/${id}/videos?language=ru`)
    .then((res) => {
        let key = res.data.results[0].key;
        iframe.src = `https://www.youtube.com/embed/${key}`
        title_trailer.innerHTML = res.data.results[0].name
    })
}
/////////////////// PERSON_LIST /////////////////////
let person_box = document.querySelector('.person_box')
let person_place_list = document.querySelector('.person_place_list')
console.log(person_place_list);
getData('/person/popular')
    .then((res) => {
        reload_person(res.data.results.slice(0, 2), person_box);
        reload_person_list(res.data.results, person_place_list);
    })


/////////////////// RELOAD_GENRES /////////////////////
let genre_list = document.querySelector('.title_genre ul')

getData('/genre/movie/list?language=ru')
    .then((genres_res) => {
        const {data: { genres }} = genres_res

        reload_genres(genres, genre_list)
    })

/////////////////// SWIPER_SLIDER /////////////////////

