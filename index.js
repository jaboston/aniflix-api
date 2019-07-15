/* eslint spaced-comment: 0, no-unused-vars: 0, space-before-function-paren: 0, indent: 0, no-undef: 0, brace-style: 0, curly: 0, eqeqeq: 0*/
/* global $, console*/

// the express import
const express = require('express')
// body parser
const bodyParser = require('body-parser')
// uuid package for generating uuids
const uuid = require('uuid')
// the morgan import
const morgan = require('morgan')
// the mongoose import (for our ORM)
const mongoose = require('mongoose')
// our passport library for authentication and rules
const passport = require('passport')
// cross origin resource sharing
const cors = require('cors')

// reference our backend ORM js file.
const Models = require('./public/backend/js/models.js')

// create new constants for our movies and users
const Movies = Models.Movie
const Users = Models.User

// connect to mongo db via mongoose. useNewUrlParser: true required because of deprecation of old parsing method.
mongoose.connect('mongodb://localhost:27017/AniflixDB', { useNewUrlParser: true })

// the instantiated express client
const app = express()

// route all requests for static files to the public folder
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// use cross origin resource sharing
app.use(cors())

// field validation for express
var exValidator = require('express-validator')
// use validator for express
app.use(exValidator())

// update this with real website once hosted.
var allowedOrigins = ['http://localhost:8080', 'http://testsite.com']

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
        var message = 'The CORS policy for this application doesn’t allow access from origin ' + origin
        return callback(new Error(message), false)
      }
      return callback(null, true)
    }
  })
)

var auth = require('./public/backend/js/auth.js')(app)
require('./public/backend/js/passport.js')

// this indicates that the express app should use the 'common' config of morgan which logs basic data such as IP address, the time of the request, the request method and path
app.use(morgan('common'))

// Put these statements before you define any routes.
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// handle unexpected errors. This should always be included at the last part of the chain for app.use(...).
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// some temporary movies
let topAnimes = [ {
    title: 'Ghost in the Shell',
    description: 'A gorgeous, futuristic, dystopian crime thriller in which a cyborg policewoman hunts for a sinister hacker known as The Puppet Master. While the synopsis could fall flat on paper through the cynical eyes of the present, this noir-ish vision of a cybernetic future formed the basis of inspiration for elements of both The Matrix and Avatar. The sequel, Ghost In The Shell 2: Innocence, is similarly worth your time.',
    director: 'Mamoru Oshii',
    year: '1995',
    trailer_url: 'https://youtu.be/SvBVDibOrgs',
    id: 1,
    genre: 'thriller'
},
{
    title: 'Akira',
    description: 'In a cyberpunk future, Neo-Tokyo is endangered after a secret military project turns a member of a biker gang into a psychopath with murderous tendencies and psychic abilities.',
    director: 'Katsuhiro Ôtomo',
    year: '1988',
    trailer_url: 'https://youtu.be/ooKBenGK3R4',
    id: 2,
    genre: 'thriller'
},
{
    title: 'Perfect Blue',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Satoshi Kon',
    year: '1997',
    trailer_url: 'https://youtu.be/dpaCRJ_u600',
    id: 3,
    genre: 'thriller'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI',
    id: 4,
    genre: 'thriller'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI',
    id: 5,
    genre: 'thriller'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI',
    id: 6,
    genre: 'thriller'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI',
    id: 7,
    genre: 'thriller'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI',
    id: 8,
    genre: 'thriller'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI',
    id: 9,
    genre: 'thriller'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI',
    id: 10,
    genre: 'thriller'
}
]

// GET requests
app.get('/', function(req, res) {
  res.sendFile('public/index.html')
})

app.get('/documentation', function(req, res) {
  res.sendFile('public/documentation.html', { root: __dirname })
})

// Return a list of ALL animes to the user
app.get('/animes', passport.authenticate('jwt', { session: false }), function(req, res) {
  Movies.find().then((movies) => {
    res.json(movies).status(200)
  })
})

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single anime by title to the user
app.get('/animes/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  // not sure if I like wrapping the response like this or being able to modify the response right until the end.
  Movies.findOne(
    { Title: req.params.title }).then((animeItem) => {
    console.log(animeItem)

    // if the item cannot be found, return nothing otherwise give us the found anime item.
    if (animeItem != null) {
        res.status(201).json(animeItem)
    }
    else {
      res.status(404).send('anime item not found with title')
    }
  }).catch(function(err) {
    console.error(err)
    res.status(500).send('Error: ' + err)
  })
})

// Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/animes/:title/genre', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.title }).then((animeItem) => {
    if (animeItem) {
      // if the genrekey is genre then return the animeItems genre
      res.status(200).json(animeItem.Genre)
    } else {
      res.status(404).send('anime item not found with title')
    }
  }).catch(function(err) {
    console.error(err)
    res.status(500).send('Error: ' + err)
  })
})

//Return data about a director (bio, birth year, death year) by name
app.get('/animes/:title/director', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.title }).then((animeItem) => {
    // if the anime item exists continue otherwise 404
    if (animeItem) {
      console.log('checking director for title ' + animeItem.Title)
      // if the director exists, continue, otherwise 404
      if (animeItem.Director != null) {
        // return a success status with the director
        res.status(200).json(animeItem.Director)
      } else {
        res.status(404).send('Director not found for movie. It is likely that the director has not been added for the movie')
      }
    } else {
      res.status(404).send('Movie with title not found. It is likely that a movie does not exist with that name')
    }
  })
})

// Find all users
app.get('/users', passport.authenticate('jwt', { session: false }), function(req, res) {
  if (req.user.Username == 'admin')
  // dont allow a public API to provide a password silly.
  Users.find().select('-password').select('-Password')
  .then(
    function(users) {
      res.status(201).json(users)
    }
  )
  .catch(
    function(err) {
      console.error(err)
      res.status(500).send('Error: ' + err)
    }
  )
  else res.status(401).send('Unauthorized')
})

// Find user by username
app.get('/users/:username', passport.authenticate('jwt', { session: false }), function(req, res) {
// if the username is the admin or if the username is the user requesting the user details.
  if (req.user.Username == 'admin' || req.user.Username == req.params.username)
  Users.findOne({ Username: req.params.username }).select('-password').select('-Password')
  .then(
    function(user) {
      console.log(user)
    res.status(201).json(user)
    }
  )
  .catch(
    function(err) {
      console.error(err)
      res.status(500).send('Error: ' + err)
    }
  )
  else res.status(401).send('Unauthorized')
})

// Update user by username
app.put('/users/:username', passport.authenticate('jwt', { session: false }), function(req, res) {
  console.log('/users/:username with username ' + req.user.username)
  if (req.user.Username === 'admin' || req.user.params.username === req.user.Username)
  Users.findOneAndUpdate({ Username: req.params.username },
  {
    $set:
    {
      Username: req.params.username,
      Password: req.body.password,
      Email: req.body.email,
      Birthday: req.body.birthday,
      Name: req.body.name
    }
  },
  { new: true },
    function(err, updatedUser) {
      if (err) {
        console.log(err)
      } else {
        res.status(201).json(updatedUser)
      }
    }
  ).select('-password').select('-Password')
  else res.status(401).send('Unauthorized')
})

// Allow new users to register
app.post('/register', (req, res) => {
  // Validation logic here for request
 req.checkBody('username', 'Username is required').notEmpty()
 req.checkBody('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric()
 req.checkBody('password', 'Password is required').notEmpty()
 req.checkBody('email', 'Email is required').notEmpty()
 req.checkBody('email', 'Email does not appear to be valid').isEmail()

 // check the validation object for errors
  var errors = req.validationErrors()

  if (errors) {
    return res.status(422).json({ errors: errors })
  }
  // create a hashed password for the request body with password
  var hashedPassword = Users.hashPassword(req.body.password)
  Users.findOne({ Username: req.body.username })
  .then(
    function(user) {
      if (user) {
        return res.status(400).send(req.body.username + 'already exists')
      } else {
        if (req.body.name &&
        (req.body.email ||
        req.body.otherloginid)) {
          var regexEmail = RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          if (regexEmail.test(req.body.email) || req.body.otherloginid) {
            Users.create(
              { Authkey: uuid.v4(),
                Username: req.body.username,
                Password: hashedPassword,
                Email: req.body.email,
                Birthday: req.body.birthday,
                Name: req.body.name })
            res.status(201).send('successfully registered with the following email: ' + req.body.email + ' and name: ' + req.body.name)
          }
        } else {
            res.status(400).send('failed to register because not all details were found')
        }
      }
    }
  ).catch(
    function(error) {
      console.error(error)
      res.status(500).send('Error: ' + error)
    }
  )
})

// Add a movie to a user's lsit of FavouriteMovies
app.post('/users/:username/animes/:movieid',
passport.authenticate('jwt', { session: false }),
  function(req, res) {
    if (req.user.Username == 'admin' || req.user.params.username === req.user.Username)
    Users.findOneAndUpdate(
      {
        Username: req.params.username
      },
      {
        $push:
        {
          FavouriteMovies: req.params.movieid
        }
      },
      {
        new: true
      },
      function (err, updatedUser) {
        if (err) {
        console.error(err)
        res.status(500).send('Error: ' + err)
      } else {
        res.json(updatedUser)
      }
      }
    )
    else res.status(401).send('Unauthorized')
  }
)

// delete a movie to a user's lsit of FavouriteMovies
app.delete('/users/:username/animes/:movieid',
passport.authenticate('jwt', { session: false }),
  function(req, res) {
    if (req.user.Username == 'admin' || req.user.params.username === req.user.Username)
    Users.findOneAndUpdate(
      {
        Username: req.params.username
      },
      {
        $pull:
        {
          FavouriteMovies: req.params.movieid
        }
      },
      {
        new: true
      },
      function (err, updatedUser) {
        if (err) {
        console.error(err)
        res.status(500).send('Error: ' + err)
      } else {
        res.json(updatedUser)
      }
      }
    )
    else res.status(401).send('Unauthorized')
  }
)

// Delete a user by username
app.delete('/users/:username', passport.authenticate('jwt', { session: false }), (req, res) =>
  {
    if (req.user.Username == 'admin')
    Users.findOneAndRemove(
      { Username: req.params.username }
    ).then((user) => {
      if (!user) {
        res.status(404).send(req.param.username + ' was not found.')
      } else {
        res.status(200).send(req.params.username + ' was deleted successfully.')
      }
    }).catch((err) =>
      {
        console.error(err)
        res.status(500).send('Error: ' + err)
      }
    )
    else res.status(401).send('Unauthorized')
  }
)

function isAuthed(username, authkey) {
  Users.findOne(
    { Authkey: authkey, Username: username }
  ).then((user) => {
      if (user) return true
      else return false
  }
  )
  return true
}

// Allow users to update their user info (username, password, email, date of birth)
app.put('/update/:username', passport.authenticate('jwt', { session: false }), (req, res) => {
  let reqBody = req.body
  if (req.user.Username == 'admin' || req.user.params.username === req.user.Username) {
    Users.findOne({ Username: req.params.username, Authkey: req.body.authkey }).then(
      function(user) {
        if (user) {
          Users.updateOne({ Username: req.params.username },
            { $set:
              { 'Username': req.params.username ? req.params.username : user.Username,
                'Email': req.body.Email ? req.body.Email : user.Email,
                'Birthday': req.body.Birthday ? req.body.Birthday : user.Birthday,
                'Name': req.body.Name ? req.body.Name : user.Name
              }
            }
          )
          res.status(201).send('successfully updated user information')
        } else {
          res.status(403).send('forbidden. the user either does not exist or you are not autorized.')
        }
      }

      // Users.findOneAndUpdate(
      //   { Username: req.params.username, Authkey: req.body.authkey },
      //   { $push: { 'Username': req.body.username ? req.body.username : Username, 'Email': req.body.email ? req.body.email : Email, 'Birthday': req.body.birthday ? req.body.birthday : Birthday } }
      // )
    )
  } else {
    res.status(400).send('failed to update the user information. auth token does not match against id')
  }
})

// posts a new anime to our animes list
app.post('/animes/new', passport.authenticate('jwt', { session: false }), (req, res) => {
  let newAnimeItem = req.body
  console.log(req.body)
  if (!newAnimeItem.Title) {
    const message = 'missing title of anime. You must atleast have a title if you want to add a new anime.'
    res.status(400).send(message)
  } else {
    newAnimeItem._id = uuid.v4()
    Movies.findOne({ Title: newAnimeItem.Title })
    .then(
      function(movie) {
        if (movie) {
          res.status(400).send('cannot add new item. item with title already exists!')
        } else {
          Movies
          .create(
            new Models.Movie(
              {
                  Genre: req.body.Genre,
                  Title: req.body.Title,
                  Description: req.body.Description,
                  Director: req.body.Director,
                  ImagePath: req.body.ImagePath,
                  Featured: req.body.Featured
              }
            )
          )
          .then(function(movie) { res.status(201).json(movie) })
          .catch(
            function (err) {
              console.log(err)
              res.status(500).send('Error: ' + err)
            }
          )
        }
      }
    )
  }
})

// delete an anime from our list by ID
app.delete('/animes/delete/:title', passport.authenticate('jwt', { session: false }), (req, res) => {
  // let animeItem = topAnimes.find((animeItem) => {
  //   console.log('anime item id:' + animeItem.id + ' ,params id:' + req.params.id)
  //     if (animeItem.id == req.params.id) {
  //         // todo - actually remove thee anime from the persistent storage method.
  //         res.status(201).send('Anime ' + req.params.id + 'was removed permanently.')
  //     }
  // })
  Movies.findOneAndRemove(
    { Title: req.params.title }
  ).then(
    function(anime) {
      if (!anime) {
        res.status(400).send('anime was not found for title: ' + req.params.title)
      } else {
        res.status(200).send(req.params.title + 'deleted from database.')
      }
    }
  ).catch(
    function (err) {
      console.log(err)
      res.status(500).send('Error: ' + err)
    }
  )
})

app.delete('/updategdpr/:userid', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.Username == 'admin' || req.user.params.username === req.user.Username) {
    //todo - actually put in some proper auth and deletion here.
    res.status(200).send('Successfully deleted all user data including account for user ' + req.body.userid)
  } else {
    res.status(404).send('Unfortunately the user id did not match the auth token and subsequently, we cannot delete the user data right now. please email test@email.com to request a manual deletion with the verified email address.')
  }
})

// Update the year and director of an anime in reference to its name
app.put('/animes/:title/:year/:director', passport.authenticate('jwt', { session: false }), (req, res) => {
  let animeItem = topAnimes.find((animeItem) => { return animeItem.title === req.params.title })

  if (animeItem && req.user.Username == 'admin') {
    animeItem.director = req.params.director
    animeItem.year = req.params.year
    if (req.body.description) {
      let reqBody = req.body
      animeItem.description = req.body.description
    }
    res.status(201).send('Anime ' + req.params.title + ' had its year of release updated to ' + req.params.year + ' and director updated to ' + req.params.director + ' with description: ' + req.body.description)
  } else {
    res.status(404).send('Anime with the name ' + req.params.title + ' was not found.')
  }
})

// Update the description of an anime by id
app.put('/animes/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.Username == 'admin') {
    let animeItem = topAnimes.find((animeItem) => {
      return animeItem.id == req.params.id })
    if (animeItem) {
      let reqBody = req.body
      animeItem.description = req.body.description
      res.status(201).send('description updated for anime ' + animeItem.title + ' with id ' + animeItem.id)
    } else {
      res.status(400).send('Anime not found for id ' + req.params.id)
    }
 } else { res.status(401).send('Unauthorized') }
})

// GET the description of the anime by title
app.get('/animes/:title/:description', passport.authenticate('jwt', { session: false }), (req, res) => {
  let animeItem = topAnimes.find((animeItem) => { return animeItem.title == req.params.title })

  if (animeItem) {
    if (req.params.description === 'description' && animeItem.description !== '') {
      res.status(201).json(animeItem.description)
    }
  }
  else
  {
    if (req.param.title === 'Teapot') res.status(418).send('Im a little Teapot short and stout. Here is my handle, here is my spout.')
    res.status(404).send('Anime with the name ' + req.params.title + ' was not found.')
  }
})

app.get('/secreturl', function (req, res) {
  res.send('This is a secret url with super top-secret content.')
})

// listen for requests
var port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', function() {
  console.log('Listening on Port 3000')
})
