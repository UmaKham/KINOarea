import { getData } from '../../modules/helpers'
import { reload_search_movie } from '../../modules/ui'

/////////////////// SEARCH_MOVIE ///////////////////

let search_input = document.querySelector('.search_input')
let results_box = document.querySelector('.results_box')
let search_btn = document.querySelector('.search')
let btn_close = document.querySelector('[data-close]')
let search_box = document.querySelector('.search_box')

search_btn.onclick = () => {
    search_box.classList.add('visible')
    results_box.innerHTML = ''
    document.body.style.overflow = 'hidden'
    console.log(search_box);
}
btn_close.onclick = (e) => {
    document.body.style.overflow = 'scroll'
    if(e.target.getAttribute('data-close') !== null) {
        search_box.classList.remove('visible')
        search_input.value = ''
    }
}
search_input.onfocus = () => {
    results_box.style.height = '550px'
}
search_input.onkeyup = () => {

    Promise.all([getData(`/search/movie?query=${search_input.value}&page=1`), getData('/genre/movie/list')])
        .then(([movies, genres]) => {
            console.log(movies.data.results);
            reload_search_movie(movies.data.results, results_box, genres.data.genres)
        })
}

/////////////////// RELOAD_MOVIE_INFO ///////////////////

export function movie_info_page(item, genres) {
    console.log(item);
    
    document.querySelector('.background_image').src = 'https://image.tmdb.org/t/p/original/' + item.backdrop_path

    document.querySelector('.movie_poster').src = 'https://image.tmdb.org/t/p/original/' + item.poster_path
    
    let movie_name = document.querySelectorAll('.movie_name')
    for(let movie of movie_name) {
        movie.innerHTML = item.title
    }
    
    document.querySelector('.original_name').innerHTML = item.original_title
    
    let rating_color = document.querySelectorAll('.wrap')
    for(let color of rating_color) {
        if(item.vote_average > 5) {
            color.style.backgroundColor = 'red'
        }
        if(item.vote_average > 6) {
            color.style.backgroundColor = 'orange'
        }
        if(item.vote_average > 7) {
            color.style.backgroundColor = 'green'
        }
    }

    let genre_titles = []
    for (let id of item.genres) {
        for (let genre of genres) {
            if (id.id === genre.id) { 
                genre_titles.push(genre.name) 
            }
        }
    }
    
    document.querySelector('.kinoarea').innerHTML = item.vote_average.toFixed(2)
    document.querySelector('.imdb').innerHTML = item.vote_average.toFixed(2)
    
    document.querySelector('.about_movie').innerHTML = item.overview

    document.querySelector('.year').innerHTML = item.release_date.slice(0, 4)
    document.querySelector('.country').innerHTML = item.production_countries[0].name
    document.querySelector('.tagline').innerHTML = item.tagline
    let director = document.querySelector('.director')
    let the_script = document.querySelector('.the_script')
    let producer = document.querySelector('.producer')
    let operator = document.querySelector('.operator')
    let composer = document.querySelector('.composer')

    let artist = document.querySelector('.artist')
    let editor = document.querySelector('.editor')
    document.querySelector('.genres').innerHTML = genre_titles.join(', ')
    document.querySelector('.fees').innerHTML = `$${item.budget}`
    let premier = document.querySelector('.premier')
    let premier_rf = document.querySelector('.premier_rf')
    let age = document.querySelector('.age')
    if(item.adult == false) {
        age.innerHTML = '16+'
    } else {
        age.innerHTML = '18+'
    }
    document.querySelector('.duration').innerHTML = item.runtime + ' / ' + ((item.runtime - 60) / 100 + 1) + ' мин'

    let dir_img = document.querySelectorAll('.item_box img')
    let dir_name = document.querySelectorAll('.dir_name')
    let dir_original_name = document.querySelectorAll('.dir_original_name')
    let dir_post = document.querySelectorAll('.dir_post')

    let production_name = document.querySelector('.production_name')
    let special_effects_name = document.querySelector('.special_effects_name')
    let dubbing_studio_name = document.querySelector('.special_effects_name')
}

let id = location.search.split('=').at(-1)

Promise.all([getData(`/movie/` + id), getData('/genre/movie/list')])
    .then(([movie, genres]) => {
        movie_info_page(movie.data, genres.data.genres)
    })