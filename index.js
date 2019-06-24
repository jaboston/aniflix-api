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

// the instantiated express client
const app = express()

// route all requests for static files to the public folder
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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
app.get('/animes', function(req, res) {
  res.json(topAnimes).status(200)
})

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single anime by title to the user
app.get('/animes/:title', (req, res) => {
  // not sure if I like wrapping the response like this or being able to modify the response right until the end.
  res.json(topAnimes.find((animeItem) => {
    console.log(animeItem)
    // if the title is the same as the queried name, then return the true.
    if (animeItem.title === req.params.title)
      return animeItem
    else res.status(404).send('anime item not found with title')
  }))
})

// Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/animes/:title/genre', (req, res) => {
  topAnimes.find((animeItem) => {
    // if the genrekey is genre then return the animeItems genre
    if (req.params.title === animeItem.title)
      res.json(animeItem.genre)
  }
  )
})

//Return data about a director (bio, birth year, death year) by name
app.get('/animes/:title/director', (req, res) => {
  topAnimes.find((animeItem) => {
    console.log('checking director for title ' + animeItem.title)
    // if the genrekey is genre then return the animeItems genre
    if (animeItem.title === req.params.title)
      res.json(animeItem.director)
  })
})

// Allow new users to register
app.post('/register', (req, res) => {
  if (req.body.name &&
  (req.body.email ||
  req.body.otherloginid)) {
    var regexEmail = RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    if (regexEmail.test(req.body.email) || req.body.otherloginid) {
      // todo - add logic to store new user here
      res.status(201).send('successfully registered with the following email: ' + req.body.email + ' and name: ' + req.body.name)
    }
  } else {
      res.status(400).send('failed to register because not all details were found')
  }
})

function isAuthed(userid, authkey) {
  // todo - add logic here to auth the user.
  return true
}

// Allow users to update their user info (username, password, email, date of birth)
app.put('/update/:userid', (req, res) => {
  let reqBody = req.body
  if (isAuthed(req.params.userid, req.body.auth_token)) {
    // todo - actually update user information to some db.
    res.status(201).send('successfully updated user information')
  } else {
    res.status(400).send('failed to update the user information. auth token does not match against id')
  }
})

// posts a new anime to our animes list
app.post('/animes/new', (req, res) => {
  let newAnimeItem = req.body
  console.log(req.body)
  if (!newAnimeItem.title) {
    const message = 'missing title of anime. You must atleast have a title if you want to add a new anime.'
    res.status(400).send(message)
  } else {
    newAnimeItem.id = uuid.v4()
    topAnimes.push(newAnimeItem)
    // todo - actually update our anime list with new anime using some persistent db of sorts.
    res.status(201).send('new anime added: ' + JSON.stringify(newAnimeItem) + ' by user id: ' + newAnimeItem.userid)
  }
})

// delete an anime from our list by ID
app.delete('/animes/delete/:id', (req, res) => {
  let animeItem = topAnimes.find((animeItem) => {
    console.log('anime item id:' + animeItem.id + ' ,params id:' + req.params.id)
      if (animeItem.id == req.params.id) {
          // todo - actually remove thee anime from the persistent storage method.
          res.status(201).send('Anime ' + req.params.id + 'was removed permanently.')
      }
  })
})

app.delete('/updategdpr/:userid', (req, res) => {
  if (isAuthed(req.params.userid, req.body.auth_token)) {
    //todo - actually put in some proper auth and deletion here.
    res.status(200).send('Successfully deleted all user data including account for user ' + req.body.userid)
  } else {
    res.status(404).send('Unfortunately the user id did not match the auth token and subsequently, we cannot delete the user data right now. please email test@email.com to request a manual deletion with the verified email address.')
  }
})

// Update the year and director of an anime in reference to its name
app.put('/animes/:title/:year/:director', (req, res) => {
  let animeItem = topAnimes.find((animeItem) => { return animeItem.title === req.params.title })

  if (animeItem && isAuthed(req.body.userid, req.body.auth_token)) {
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
app.put('/animes/:id', (req, res) => {
  let animeItem = topAnimes.find((animeItem) => {
    return animeItem.id == req.params.id })
  if (animeItem) {
    let reqBody = req.body
    animeItem.description = req.body.description
    res.status(201).send('description updated for anime ' + animeItem.title + ' with id ' + animeItem.id)
  } else {
    res.status(400).send('Anime not found for id ' + req.params.id)
  }
})

// GET the description of the anime by title
app.get('/animes/:title/:description', (req, res) => {
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
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
)
