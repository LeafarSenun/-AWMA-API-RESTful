module.exports = MovieForList;
const Movie = require('./Movie')

function MovieForList(movie) {


    if(movie.results === undefined || movie.results.length === 0)
        this.err = "No Movies To Show"
    else {
        this.length = movie.results.length
        var res = []
        let x = 0;
        for (var i = 0; x < movie.results.length; ++i) {
            res[i] = []
            for(var j = 0 ; j<3 && x< movie.results.length;++j) {
                res[i][j] = new Movie(movie.results[x], null)
                x++;
            }
        }

        this.moviesList = res
    }

}

