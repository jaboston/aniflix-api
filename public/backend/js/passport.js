const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Models = require('./models.js')
const passportJWT = require('passport-jwt')

var Users = Models.User
var JWTStrategy = passportJWT.Strategy
var ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy({
  usernameField: 'Username',
  passwordField: 'Password'
}, (username, password, callback) => {
  console.log(username + '  ' + password)
  Users.findOne({ Username: username }, (error, user) => {
    if (error) {
      console.log(error)
      return callback(error)
    }
    if (!user) {
      console.log('incorrect username')
      return callback(null, false, { message: 'Incorrect username or password.' })
    }
    console.log('finished')
    return callback(null, user)
  })
}))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret',
  passReqToCallback: true
}, (req, jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
    .then((user) => {
      console.log('adding user in to req: ' + user)
      // adding user in to my callback so I can use it just as I would with a session storage.
      req.user = user
      return callback(null, user)
    })
    .catch((error) => {
      return callback(error)
    })
}))
