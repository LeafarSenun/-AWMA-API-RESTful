const express = require('express')
const router = express.Router()
const userService = require('../services/userService')
const favService = require('../services/favouriteService')

module.exports = router

router.get('/favourites', (req, resp) => {
    userService.find(req.user, (err, user) => {
        if (err) return err

        resp.render('favourites', req.user)

    })
})

router.post('/favourites', (req, resp, next) => {

    if (!req.user) {
        req.session.returnTo = req.originalUrl
        return resp.redirect('/login')
    }
    if (req.body.newListName) {
        favService.findListName(req.user.moviesList, req.body.newListName, (err, bool, movieList) => {
            if (err) {
                return err
            }

            req.user.moviesList.push(movieList)
        })
    }

    if (!req.body.listToInsert) {

        movieList.movie.id = req.body.id
        movieList.movie.image = req.body.image
        movieList.movie.name = req.body.title
        resp.cookie('movieList', movieList.movie)
        return resp.redirect('/favourites')
    }

    userService.save(req.user, (err) => {
        if (err) return next(err)
        resp.redirect(req.returnTo)
    })
})

router.post('/insertFavouriteMovie', (req, resp, next) => {
    var movie = {
        id: req.body.id,
        name: req.body.name,
        image: req.body.image
    }

    favService.findMovie(req.user.moviesList.movies, movie, (err, bool, movieToAdd) => {
        if (err) {
            return err
        }

        req.user.movieList.movies.push(movieToAdd)
    })
})