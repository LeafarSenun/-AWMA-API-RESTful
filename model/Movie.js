module.exports = Movie

function Movie(movieDetails, movieCredits) {

    this.id = movieDetails.id
    this.name = movieDetails.title
    this.overview = movieDetails.overview
    this.image = movieDetails.poster_path
    
    if (movieCredits !== null){
        this.actors = movieCredits.cast
        this.director = () => {
            for (const element of movieCredits.crew) {
                if (element.job === 'Director')
                    return element.name
            }
        }
    }
}