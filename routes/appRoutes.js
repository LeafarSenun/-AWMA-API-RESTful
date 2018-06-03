const express = require('express');
const router = express.Router();
const service = require('../services/appService')();

module.exports = router

/* GET home page. */
router.get('/', (req, resp) => {
    var loginStatus = false;
    if (req.user) loginStatus = true;
    resp.render('homeView')
})

/* GET actor */
router.get('/actors/:id', (req, resp, next) => {
    var loginStatus = false;
    if (req.user) loginStatus = true;
    req.session.returnTo = req.originalUrl
    service.getActorDetails(req.params.id, (err, actor) => {
        if (err) return next(err)
        resp.render('actorDetailsView', actor)
    })
})

/* GET movie */
router.get('/movies/:id', (req, resp, next) => {
    var loginStatus = false;
    if (req.user) loginStatus = true;
    req.session.returnTo = req.originalUrl
    service.getMovieDetails(req.params.id, (err, movie) => {
        if(err) return next(err)
        resp.render('movieDetailsView',movie)
    })
})

/* GET list of movies */

router.get('/search', (req, resp, next) => {
    var loginStatus = false;
    if (req.user) loginStatus = true;
    req.session.returnTo = req.originalUrl
    service.getMoviesList(req.query.name, (err, moviesList) => {
        if (err) return next(err)
        resp.render('moviesListView', moviesList )
    })
})

router.post('/customList', (req, resp, next) => {
    var moviesCookie = req.body.movies
    console.log(moviesCookie)
    resp.render('customMovieList', moviesCookie)
})
