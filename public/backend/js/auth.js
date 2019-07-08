var jwtSecret = 'your_jwt_secret' // this has to be the same as the key used in the JWTStrategy in passport.js
var jwt = require('jsonwebtoken')
const passport = require('passport') // the passport package
require('./passport') // the local passport file

// generates a JWT token based upon the provided user and signs it with the provided jwt secret.
function generateJWTToken (user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // This is the username encoding in the JWTStrategy
    expiresIn: '7d', // This specifies the length of time before the token expiresIn
    algorithm: 'HS256' // The algorithm used to "sign" or encode JWT values
  })
}

/* POST LOGIN */
module.exports = (app) => {
  app.post('/login', (req, res) => {
    // use the local strategy defined in the passport js file to authenticate.
    passport.authenticate('local', { session: false }, (error, user, info) => {
      // if there is an error or no user, then there is a problem and we should return a 400.
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        })
      }
      // if there is no error, then log in the user.
      req.login(user, { session: false }, (error) => {
        // if there is an error when attempting to log in, send the error in the response body.
        if (error) {
          res.send(error)
        }
        // generate JWT token based on the user body.
        var token = generateJWTToken(user.toJSON())
        // return the user body and the token in the response body.
        return res.json({ user, token })
      }
      )
    })(req, res)
  })
}
