const express = require('express');
const router = express.Router();
const passport = require('passport')
const userService = require('../services/userService')

module.exports = router
/* GET User Login */
router.get('/login', (req, resp) => {
    resp.render('login')
})

router.post('/login', (req, resp, next) => {
    console.log(` username: ${req.body.username} password: ${req.body.password}`)
    userService.authenticate(req.body.username, req.body.password, (err, user, info) => {
        if (err) return next(err)
        if (info) return next(new Error(info))
        req.logIn(user, (err) => {
            if (err) return next(err)
            var returnTo = '/'
            if (req.session.returnTo) {
                returnTo = req.session.returnTo
                delete req.session.returnTo
            }
            resp.redirect(returnTo)
        })
    })
})

/* GET User Logout*/
router.get('/logout', (req, resp) => {
    req.logout()
    resp.redirect('/')
})


/* GET User Register */
router.get('/register', (req, resp) => {
    resp.render('register')
})

/* POST New User */
router.post('/register', (req, resp, next) => {
    if (req.body.password !== req.body.confirm) return new Error("The passwords don't match")
    userService.find(req.body.username, (err, user) => {
        if (err) return err

        if (user.error === 'not_found') {
            req.body.moviesList = [{
                    listName: '',
                    //movies: []
                }]
            
            userService.save(req.body, (err) => {
                if (err) return err
            })

        } else {
            return new Error(`The username ${req.body.username} is not available`)
        }
    })

    var returnTo = '/'
    if (req.session.returnTo) {
        returnTo = req.session.returnTo
        delete req.session.returnTo
    }
    resp.redirect(returnTo)
})

router.post('/moviesList/:listName', (req, resp, next) => {
    
})

passport.serializeUser(function (user, cb) {
    cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
    userService.find(username, cb);
});

