import {getData} from '../../modules/helpers'
import {reload_movie} from '../../modules/ui'

let page1 = document.querySelector('.now_playing')
Promise.all([getData('/movie/now_playing'), getData('/genre/movie/list')])
    .then(([movies, genres]) => {
        reload_movie(movies.data.results, page1, genres.data.genres)
        console.log(movies.data);
    });
let page2 = document.querySelector('.now_playing2')
Promise.all([getData('/movie/now_playing?page=2'), getData('/genre/movie/list')])
    .then(([movies, genres]) => {
        reload_movie(movies.data.results, page2, genres.data.genres)
        console.log(movies.data);
    });