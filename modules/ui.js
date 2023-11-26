
export function reload_movie(arr, place, genres) {
    for (let item of arr) {
        let item_movie = document.createElement('div')
        let poster_movie = document.createElement('img')
        let name_movie = document.createElement('span')
        let genre_movie = document.createElement('p')
        let rating_box = document.createElement('div')
        let rating = document.createElement('p')

        let hover_bg = document.createElement('div')
        let hover_bg_btn = document.createElement('button')
        
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

        poster_movie.onmousemove = () => {
            hover_bg.style.display = 'flex'
        }
        hover_bg.onmouseleave = () => {
            hover_bg.style.display = 'none'
        }
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

