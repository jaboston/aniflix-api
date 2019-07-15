/* eslint no-undef: "error", no-unused-vars: 1, standard/object-curly-even-spacing: 0 */

const mongoose = require('mongoose')

// bcrypt for encrypting passwords, required for our user model
const bcrypt = require('bcrypt')

var movieSchema = mongoose.Schema(
  {
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Genre: {
      Name: String,
      Description: String
    },
    Director: {
      Name: String,
      Bio: String,
      BirthYear: Number,
      DeathYear: Number
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean,
    Year: Number
  }
)

var userSchema = mongoose.Schema(
  {
    Authkey: { type: String, required: false },
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Birthday: { type: Date, required: false },
    Name: { type: String, required: false },
    FavouriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    Director: { type: String, required: false }
  }
)

// hash the password
userSchema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10)
}

// compare submitted hashed password with password in // DEBUG: userSchema.methods.validatePassword = function(password) {
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password)
}

var Movie = mongoose.model('Movie', movieSchema)
var User = mongoose.model('User', userSchema)

module.exports.Movie = Movie
module.exports.User = User
