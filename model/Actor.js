module.exports = Actor

function Actor(actorDetails,credits) {
    this.name = actorDetails.name
    this.biography = actorDetails.biography
    this.birthday = actorDetails.birthday
    this.deathday = getDeathDay(actorDetails)
    this.placeOfBirth = actorDetails.place_of_birth
    this.image = actorDetails.profile_path
    this.movies = credits.cast
}

function getDeathDay(actorDetails) {

    if (actorDetails.deathday === null)
        return "present"
    return actorDetails.deathday
}