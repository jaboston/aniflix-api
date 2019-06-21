/* eslint spaced-comment: 0, no-unused-vars: 0, space-before-function-paren: 0, indent: 0, no-undef: 0, brace-style: 0, curly: 0*/
/* global $, console*/

// the express import
const express = require('express')

// the morgan import
const morgan = require('morgan')

// the instantiated express client
const app = express()

// this indicates that the express app should use the 'common' config of morgan which logs basic data such as IP address, the time of the request, the request method and path
app.use(morgan('common'))

// route all requests for static files to the public folder
app.use(express.static('public'))

// handle unexpected errors. This should always be included at the last part of the chain for app.use(...).
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// some temporary movies
let topMovies = [ {
    title: 'Ghost in the Shell',
    description: 'A gorgeous, futuristic, dystopian crime thriller in which a cyborg policewoman hunts for a sinister hacker known as The Puppet Master. While the synopsis could fall flat on paper through the cynical eyes of the present, this noir-ish vision of a cybernetic future formed the basis of inspiration for elements of both The Matrix and Avatar. The sequel, Ghost In The Shell 2: Innocence, is similarly worth your time.',
    director: 'Mamoru Oshii',
    year: '1995',
    trailer_url: 'https://youtu.be/SvBVDibOrgs'
},
{
    title: 'Akira',
    description: 'In a cyberpunk future, Neo-Tokyo is endangered after a secret military project turns a member of a biker gang into a psychopath with murderous tendencies and psychic abilities.',
    director: 'Katsuhiro Ôtomo',
    year: '1988',
    trailer_url: 'https://youtu.be/ooKBenGK3R4'
},
{
    title: 'Perfect Blue',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Satoshi Kon',
    year: '1997',
    trailer_url: 'https://youtu.be/dpaCRJ_u600'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI'
},
{
    title: 'Metropolis',
    description: 'A dizzying, paranoid story about a retired pop star who decides to make a go of acting before falling victim to a deep invasion of privacy. Haunted by stalkers, ghosts of her past and a seemingly endless onslaught of confused humiliation, the film acts as a tense and gripping indictment of celebrity whilst allowing the hypnotic visual pace question every aspect of the reality you’re presented with.',
    director: 'Rintaro',
    year: '2001',
    trailer_url: 'https://youtu.be/ifl-N4RBpVI'
}
]

// GET requests
app.get('/', function(req, res) {
  res.sendFile('public/index.html')
})

app.get('/documentation', function(req, res) {
  res.sendFile('public/documentation.html', { root: __dirname })
})

app.get('/movies', function(req, res) {
  res.json(topMovies)
})

app.get('/secreturl', function (req, res) {
  res.send('This is a secret url with super top-secret content.')
})

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
)
