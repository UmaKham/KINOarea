import {getData} from '../../modules/helpers'
import {reload_movie, reload_genres} from '../../modules/ui'

let page1 = document.querySelector('.now_playing')
Promise.all([getData('/movie/now_playing?language=ru'), getData('/genre/movie/list?language=ru')])
    .then(([movies, genres]) => {
        reload_movie(movies.data.results, page1, genres.data.genres)
        console.log(movies.data);
    });
let page2 = document.querySelector('.now_playing2')
Promise.all([getData('/movie/now_playing?page=2&language=ru'), getData('/genre/movie/list?language=ru')])
    .then(([movies, genres]) => {
        reload_movie(movies.data.results, page2, genres.data.genres)
        console.log(movies.data);
    });

////////////////////RELOAD_GENRES_FOR_SELECT///////////////////
let genre_list = document.querySelector('.title_genre ul')

getData('/genre/movie/list?language=ru')
    .then((genres_res) => {
        const {data: { genres }} = genres_res

        reload_genres(genres, genre_list)
    })