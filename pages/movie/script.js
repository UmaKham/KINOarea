import { getData } from '../../modules/helpers'
import { reload_search_movie, reload_movie } from '../../modules/ui'

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

    Promise.all([getData(`/search/movie?query=${search_input.value}&page=1?language=ru`), getData('/genre/movie/list')])
        .then(([movies, genres]) => {
            reload_search_movie(movies.data.results, results_box, genres.data.genres)
        })
}

/////////////////// RELOAD_MOVIE_INFO ///////////////////

export function movie_info_page(item, genres, job_arr, place, video, images) {

/////////////////// BACKDROP_MOVIE ///////////////////
let footage = document.querySelector('.footage_box')
for(let item of images.backdrops.slice(0, 6)) {
    let img = document.createElement('div')
    footage.append(img)
    img.style.background = `url(https://image.tmdb.org/t/p/original/${item.file_path}) no-repeat center / cover`
}

/////////////////// POSTER_MOVIE ///////////////////
let poster_box = document.querySelector('.poster_box')
for(let item of images.posters.splice(0, 5)) {
    let img = document.createElement('img')
    poster_box.append(img)
    img.src = `https://image.tmdb.org/t/p/original${item.file_path}`
}


/////////////////// SIMILAR_MOVIE ///////////////////
let similar_box = document.querySelector('.similar_box')
getData(`/movie/${item.id}/similar?language=ru`)
.then(res => {
    reload_movie(res.data.results.splice(3, 5), similar_box, genres)
})


let background_image = document.querySelector('.background_image')
console.log(background_image);
background_image.style.background = `linear-gradient(to top, #1E2538 0%, transparent 100%), url(https://image.tmdb.org/t/p/original/${item.backdrop_path}) no-repeat center / cover`
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
    
    let dir_img_one = document.querySelector('.item_box .item_one img')
    let dir_img_two = document.querySelector('.item_box .item_two img')
    let dir_name = document.querySelectorAll('.dir_name')
    let dir_original_name = document.querySelectorAll('.dir_original_name')
    let dir_post = document.querySelectorAll('.dir_post')
    
    let tagline = document.querySelector('.tagline')
    tagline.innerHTML = item.tagline
    if(item.tagline === '') {
        tagline.innerHTML = '-'
    }
    
    let director = document.querySelector('.director')
    for(let item of job_arr.crew) {
        if(item.job === 'Director') {
            director.innerHTML = item.name
            dir_img_one.src = `https://image.tmdb.org/t/p/original${item.profile_path}` 
            dir_img_two.src = `https://image.tmdb.org/t/p/original${item.profile_path}`
            for(let person of dir_name) {
                person.innerHTML = item.name
            }
            for(let person of dir_original_name) {
                person.innerHTML = item.original_name
            }
            for(let person of dir_post) {
                person.innerHTML = item.job
            }
        }
    }
    let the_script = document.querySelector('.the_script')
    for(let item of job_arr.crew) {
        if(item.job === 'Screenplay') {
            the_script.innerHTML = item.name
        }
    }
    
    let producer = document.querySelector('.producer')
    for(let item of job_arr.crew) {
        if(item.job === 'Producer') {
            producer.innerHTML = item.name
        }
    }
    
    let operator = document.querySelector('.operator')
    for(let item of job_arr.crew) {
        if(item.job === 'Provider') {
            operator.innerHTML = item.name
        }
    }

    let composer = document.querySelector('.composer')
    for(let item of job_arr.crew) {
        if(item.job === 'Original Music Composer') {
            composer.innerHTML = item.name
        }
    }
    
    let artist = document.querySelector('.artist')
    for(let item of job_arr.crew) {
        if(item.job === 'Production Design') {
            artist.innerHTML = item.name
        }
    }
    
    let editor = document.querySelector('.editor')
    for(let item of job_arr.crew) {
        if(item.job === 'Editor') {
            editor.innerHTML = item.name
        }
    }

    document.querySelector('.genres').innerHTML = genre_titles.join(', ')
    document.querySelector('.fees').innerHTML = `$${item.budget}`
    document.querySelector('.premier').innerHTML = item.release_date
    let premier_rf = document.querySelector('.premier_rf')
    let age = document.querySelector('.age')
    if(item.adult == false) {
        age.innerHTML = '16+'
    } else {
        age.innerHTML = '18+'
    }
    document.querySelector('.duration').innerHTML = item.runtime + ' / ' + ((item.runtime - 60) / 100 + 1) + ' мин'


    let production_name = document.querySelector('.production_name')
    for(let name of item.production_companies) {
        production_name.innerHTML += `${name.name}, <br> `
    }
    let special_effects_name = document.querySelector('.special_effects_name')
    let dubbing_studio_name = document.querySelector('.special_effects_name')
    
    place.innerHTML = ''
    for(let item of job_arr.cast.splice(0, 10)) {
        let actor_item = document.createElement('div')
        let actor_img_box = document.createElement('div')
        let actor_img = document.createElement('img')
        let actor_name = document.createElement('span')
        let actor_original_name = document.createElement('p')
        let actor_name_legend = document.createElement('p')

        place.append(actor_item)
        actor_item.append(actor_img_box, actor_name, actor_original_name, actor_name_legend)
        actor_img_box.append(actor_name, actor_original_name, actor_name_legend)

        actor_item.classList.add('actor_item')
        actor_img_box.classList.add('actor_img_box')
        actor_img.classList.add('actor_img')
        actor_name.classList.add('actor_name')
        actor_original_name.classList.add('actor_original_name')
        actor_name_legend.classList.add('actor_name_legend')


        actor_item.style.background = `url(https://image.tmdb.org/t/p/original${item.profile_path}) no-repeat center / cover`
        actor_name.innerHTML = item.name
        actor_original_name.innerHTML = item.original_name
        actor_name_legend.innerHTML = item.character

        let finded_trailer = video.find(video => video.type === 'Trailer')
        let iframe = document.querySelector('iframe')
        iframe.src = `https://www.youtube.com/embed/${finded_trailer.key}`

    }
}
let actor_box = document.querySelector('.actor_box')
let id = location.search.split('=').at(-1)

Promise.all([   getData(`/movie/${id}?language=ru`), 
                getData('/genre/movie/list?language=ru'), 
                getData(`/movie/${id}/credits?language=ru`),
                getData(`/movie/${id}/videos`),
                getData(`/movie/${id}/images`)])
    .then(([movie, genres, job, video, images]) => {
        movie_info_page(movie.data, genres.data.genres, job.data, actor_box, video.data.results, images.data)
    })