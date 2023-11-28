
export function reload_movie(arr, place, genres) {
    place.innerHTML = ''
    for (let item of arr) {
        let item_movie = document.createElement('div')
        let poster_movie = document.createElement('img')
        let name_movie = document.createElement('span')
        let genre_movie = document.createElement('p')
        let rating_box = document.createElement('div')
        let rating = document.createElement('p')

        let hover_bg = document.createElement('div')
        let hover_bg_btn = document.createElement('button')

        hover_bg_btn.onclick = () => {
            location.assign(`http://localhost:5173/pages/movie/index.html?id=` + item.id)
        }
        
        let genre_titles = []
        
        for (let id of item.genre_ids) {
            for (let genre of genres) {
                if (id === genre.id) { 
                    genre_titles.push(genre.name) 
                }
            }
        }
        place.append(item_movie)
        item_movie.append(poster_movie, hover_bg, name_movie, genre_movie, rating_box)
        hover_bg.append(hover_bg_btn)
        rating_box.append(rating)
        
        item_movie.classList.add('item_movie')
        poster_movie.classList.add('poster_movie')
        name_movie.classList.add('name_movie')
        genre_movie.classList.add('genre_movie')
        rating_box.classList.add('rating_box')
        rating.classList.add('rating')

        hover_bg.classList.add('hover_bg')
        hover_bg_btn.classList.add('hover_bg_btn')

        poster_movie.src = 'https://image.tmdb.org/t/p/original/' + item.poster_path
        name_movie.innerHTML = item.title
        genre_movie.innerHTML = genre_titles.join(', ')
        rating.innerHTML = item.vote_average.toFixed(2)

        hover_bg_btn.innerHTML = 'Карточка фильма'

        poster_movie.onmousemove = () => { hover_bg.style.display = 'flex' }
        hover_bg.onmouseleave = () => { hover_bg.style.display = 'none' }

        if ( rating.innerHTML >= 0 ) { rating_box.style.backgroundColor = 'red' }
        if ( rating.innerHTML >= 6 ) { rating_box.style.backgroundColor = 'orange' }
        if ( rating.innerHTML >= 7 ) { rating_box.style.backgroundColor = 'green' } 
    }
}
export function reload_actors(arr, place) {
    for(let actor of arr) {
        let item_person = document.createElement('div')
        let name = document.createElement('p')
        let original_name = document.createElement('p')
        let age = document.createElement('p')
        
        place.append(item_person)
        item_person.append(name, original_name, age)
        
        item_person.classList.add('.item_person')
        name.classList.add('.name')
        original_name.classList.add('.original_name')
        age.classList.add('.age')
    }
}
export function reload_coming_soon(arr, place, genres) {
    for(let movie of arr) {
        let item_movie = document.createElement('div')
        let item_poster = document.createElement('img')
        let item_name = document.createElement('p')
        let item_genre = document.createElement('p')
        let genre_titles = []

        place.append(item_movie)
        item_movie.append(item_poster, item_name, item_genre)
        
        for (let id of movie.genre_ids) {
            for (let genre of genres) {
                if (id === genre.id) {
                    genre_titles.push(genre.name)
                }
            }
        }

        item_movie.classList.add('item_movie')
        item_poster.classList.add('poster_movie')
        item_name.classList.add('name_movie')
        item_genre.classList.add('genre_movie')

        item_poster.src = 'https://image.tmdb.org/t/p/original/' + movie.poster_path
        item_name.innerHTML = movie.title
        item_genre.innerHTML = genre_titles.join(', ')
    }
}
export function reload_box_office(arr, place) {
    for(let movie of arr) {
        let item_movie = document.createElement('div')
        let item_poster = document.createElement('img')
        let movie_info = document.createElement('div')
        let item_name = document.createElement('p')
        let item_box_office = document.createElement('p')
        let box_office_four_week = document.createElement('p')

        place.append(item_movie)
        item_movie.append(item_poster, movie_info)
        movie_info.append(item_name, item_box_office, box_office_four_week)

        item_movie.classList.add('item_movie')
        item_poster.classList.add('item_poster')
        movie_info.classList.add('movie_info')
        item_name.classList.add('item_name')
        item_box_office.classList.add('item_box_office')
        box_office_four_week.classList.add('box_office_four_week')
        
        item_poster.src = 'https://image.tmdb.org/t/p/original/' + movie.poster_path
        item_name.innerHTML = movie.title
        item_box_office.innerHTML = '$13 млн долларов'
        box_office_four_week.innerHTML = '$15 млн долларов за 4 недели'
    }
}

/////////////////// SEARCH_MOVIE_RELOAD ///////////////////

export function reload_search_movie(arr, place, genres) {
    place.innerHTML = ""
    for(let movie of arr) {
    
    let result_item_movie = document.createElement('div')
    let img_poster = document.createElement('img')
    let movie_info = document.createElement('div')
    let movie_info_left = document.createElement('div')
    let movie_name = document.createElement('p')
    let movie_original_name = document.createElement('p')
    let movie_genre = document.createElement('p')
    let movie_info_right = document.createElement('div')
    let movie_rating = document.createElement('p')
    let genre_titles = []

    place.append(result_item_movie)
    result_item_movie.append(img_poster, movie_info)
    movie_info.append(movie_info_left, movie_info_right)
    movie_info_left.append(movie_name, movie_original_name, movie_genre)
    movie_info_right.append(movie_rating)

    for (let id of movie.genre_ids) {
        for (let genre of genres) {
            if (id === genre.id) {
                genre_titles.push(genre.name)
            }
        }
    }
    
    result_item_movie.classList.add('result_item_movie')
    movie_info.classList.add('movie_info')
    movie_info_left.classList.add('movie_info_left')
    movie_name.classList.add('movie_name')
    movie_original_name.classList.add('movie_original_name')
    movie_genre.classList.add('movie_genre')
    movie_info_right.classList.add('movie_info_right')
    
    img_poster.src = 'https://image.tmdb.org/t/p/original/' + movie.poster_path
    movie_name.innerHTML = movie.title
    movie_name.innerHTML = movie.original_title
    movie_genre.innerHTML = genre_titles.join(', ')
    movie_rating.innerHTML = movie.vote_average.toFixed(2)
    if(movie_rating.innerHTML >= 0) {
        movie_info_right.style.backgroundColor = 'red'
    }
    if(movie_rating.innerHTML >= 6) {
        movie_info_right.style.backgroundColor = 'orange'
    }
    if(movie_rating.innerHTML >= 7) {
        movie_info_right.style.backgroundColor = 'green'
    } 
    }
}

/////////////////// RELOAD_MOVIE_INFO /////////////////////

export function reload_movie_info(arr, place) {
    let movie_poster = document.querySelector('.movie_poster')
    let movie_name = document.querySelectorAll('.movie_name')
    let movie_original_name = document.querySelector('.movie_original_name')
    let color_rating_kinoarea = document.querySelector('.wrap_kinoarea')
    let rating_kinoarea = document.querySelector('.kinoarea')
    let color_rating_imdb = document.querySelector('.wrap_imdb')
    let rating_imdb = document.querySelector('.imdb')
    let about_movie_desc = document.querySelector('.about_movie')
    let year = document.querySelector('.year')
    let country = document.querySelector('.country')
    let tagline = document.querySelector('.tagline')
    let director = document.querySelector('.director')
    let the_script = document.querySelector('.the_script')
    let producer = document.querySelector('.producer')
    let operator = document.querySelector('.operator')
    let composer = document.querySelector('.composer')
    
}

reload_movie_info()