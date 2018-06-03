'use strict'

const mov = require('./../movieService')


module.exports = {
    testgetMovieDetails
}

function testgetMovieDetails(test) {
    mov.getMovieDetails(211672, (err, movie) => {
        if(err)
            test.ifError(err)
        else {
            test.equal(movie.name, 'Minions')
            test.equal(movie.id, 211672)
        }
        test.done()
    })
}