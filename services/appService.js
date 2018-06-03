'use strict'

const Movie = require('../model/Movie')
const Actor = require('../model/Actor')
const MovieForList = require('../model/MovieForList')
const API_Key = 'f8f35534af874e86c2f1fbf9f51c7888'


module.exports = init

function init(dataSource) {

    var moviesMap = new Map()
    var actorsMap = new Map()

    let req
    if (dataSource)
        req = dataSource
    else
        req = require('request')

    const services = {
        getMoviesList,
        getMovieDetails,
        getActorDetails,
    }
    return services

    function reqAsJson(path, cb) {
        req(path, (err, res, data) => {
            if (err) return cb(err)
            const obj = JSON.parse(data.toString())
            cb(null, obj)
        })
    }

    function getMoviesList(name, cb) {
        const path = `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${name}`
        reqAsJson(path, (err, movie) => {
            if (err) return cb(err)
            cb(null, new MovieForList(movie))
        })
    }

    function getMovieDetails(movieId, cb) {
        if (moviesMap.get(movieId)!== undefined) {
            cb(null, moviesMap.get(movieId))
        }
        else {
            const pathMovieDetails = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_Key}`
            const pathCredtis = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_Key}`
            reqAsJson(pathMovieDetails, (err, movie) => {
                if (err) return cb(err)
                reqAsJson(pathCredtis, (err, credits) => {
                    if (err) return cb(err)
                    var m = new Movie(movie, credits)
                    moviesMap.set(movieId,m)
                    cb(null,m)
                })
            })
        }
    }

    function getActorDetails(actorId, cb) {
        if (actorsMap.get(actorId)!== undefined) {
            cb(null, actorsMap.get(actorId))
        }
        else {
            const pathActor = `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_Key}`
            const pathActorCredits = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_Key}`
            reqAsJson(pathActor, (err, actor) => {
                if (err) return cb(err)
                reqAsJson(pathActorCredits, (err, credits) => {
                    if (err) return cb(err)
                    var a =  new Actor(actor, credits)
                    actorsMap.set(actorId,a)
                    cb(null,a)
                })
            })
        }
    }
}