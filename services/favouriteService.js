
module.exports = {
    'findListName' : findListName,
    'findMovie' : findMovie
}

var movieList = {
    listName: '',
    movies: [{}]
}
var newMovie = {}

function findListName(userMovieList, newListName, cb) {
    for (const list in userMovieList) {
        if (list.listName === newListName) {
            return cb(`The list ${newListName} already exists!`, true, null)
        }
    }
    
    movieList.listName = newListName

    return cb(null, false, movieList);
}

function findMovie(userMovies, movieToAdd, cb) {
    for (const movie in userMovie) {
        if (movie.id === movieToAdd.id) {
            return cb(`The movie ${movie.name} already exists int the list!`, true, null)
        }
    }
    return cb(null, false, Object.setPrototypeOf(newMovie, movieToAdd));
}