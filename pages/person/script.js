import { getData } from '../../modules/helpers'
import { reload_movie } from '../../modules/ui'

let person_id = location.search.split('=').at(-1)
let best_movie_box = document.querySelector('.best_movie_box')

Promise.all([   
    getData(`/person/${person_id}?language=ru`),
    getData(`/person/${person_id}/movie_credits?language=ru`),
    getData('/genre/movie/list?language=ru'),
    getData(`/person/${person_id}/images`)])
        .then(([info, movie, genre, photo]) => {
            console.log(photo.data.profiles),
            person_page(info.data, photo.data.profiles), 
            reload_movie(movie.data.cast.splice(0, 5), best_movie_box, genre.data.genres)
    })

function person_page(info, photo) {
    ////////// PERSON_IMG //////////
    document.querySelector('.person_img').src = `https://image.tmdb.org/t/p/original/${info.profile_path}`
    
    let person_photo_box = document.querySelector('.person_photo_box')
for(let item of photo.slice(0, 6)) {
    let img = document.createElement('div')
    person_photo_box.append(img)
    img.style.background = `url(https://image.tmdb.org/t/p/original/${item.file_path}) no-repeat center / cover`
    
    ////////// PERSON_INFO //////////
    let person_name = document.querySelectorAll('.person_name')
    person_name.forEach(name => {
        name.innerHTML = info.name
    })
    document.querySelector('.date_of_birth').innerHTML = info.birthday
    document.querySelector('.place_of_birth').innerHTML = info.place_of_birth
    document.querySelector('.popularity').innerHTML = info.popularity

}
}