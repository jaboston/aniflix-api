/* eslint no-undef: 1, brace-style: 0 */
/* global $, fetch, console */

var imported = document.createElement('script')
imported.src = 'dist/js/modal.minify.js'
document.head.appendChild(imported)

// globally accessible element.
// reference our list item for cloning.
var $listItem = document.querySelector('.project-grid__item')

var pokemonRepository = (function() {
  'use strict'
  // API constant
  var MAX_POKEMONS = 150
    // URL constants
  var SITE_PROTOCOL = 'https://'
  var SITE_ADDRESS = 'pokeapi.co/'
  var SITE_API_PATH = 'api/v2/'
  var SITE_ENDPOINT_POKEMON = 'pokemon/'
  var SITE_PARAMETER_LIMIT = '?limit='
  var repository = []
    // construct our api url.
  var apiUrl =
    SITE_PROTOCOL +
    SITE_ADDRESS +
    SITE_API_PATH +
    SITE_ENDPOINT_POKEMON +
    SITE_PARAMETER_LIMIT +
    MAX_POKEMONS

  function loadDetails(pokemon) {
    var url = pokemon.detailsUrl
    return $.get(url, function() {
        console.log('getting details from ' + url)
      })
      .done(function(details) {
        // Now we add the details to the item
        pokemon.imageUrl = details.sprites.front_default
        pokemon.height = details.height
        pokemon.types = details.types
        return pokemon
      })
      .fail(function(e) {
        console.error(e)
      })
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json()
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          console.log(item)
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
            height: -1,
            types: Object.keys({})
          }
          add(pokemon)
        })
      })
      .catch(function(e) {
        console.error(e)
      })
      // once we know we have added all the available pokemons, it is safe to delete our original $pokemonTemplatedItem
      // delete our original list item because aint nobody got time for that.
      // $listItem.parentElement.removeChild($listItem);
  }

  function add(pokemon) {
    // check every value explicitly. Make sure there is no monkey business.
    if (
      typeof pokemon.height === typeof 0 &&
      typeof pokemon.name === typeof ''
    ) {
      repository.push(pokemon)
    }
    // ironic eh
    else throw console.log(": You didn't catch this pokemon!")
  }

  return {
    add: add,
    getAll: function() {
      return repository
    },
    // returns the object for the pokemon name that you want.
    filter: function(name) {
      return repository.filter(value => value.name === name)
    },
    loadList: loadList,
    loadDetails: loadDetails
  }
})()

function showDetails(pokemon) {
  pokemonRepository.loadDetails(pokemon).then(function() {
    console.log(
      'name: ' +
      pokemon.name +
      ', height: ' +
      pokemon.height +
      ', type: ' +
      pokemon.types[0].type.name +
      ''
    )
    var secondaryText = ''
    if (pokemon.height > 15) {
      secondaryText = pokemon.height + ' inches tall! wow what a big boi!'
    } else {
      secondaryText = pokemon.height + ' inches... such a wittle pokeman.'
    }
    console.log('show modal')
    modal(
      false,
      true,
      pokemon.name,
      'type: ' + pokemon.types[0].type.name,
      secondaryText,
      pokemon.imageUrl,
      pokemon.detailsUrl
    )
  })
}

function addListItem(pokemon) {
  // check the values are legit
  if (typeof pokemon.height === typeof 0 && typeof pokemon.name === typeof '') {
    // clone our list item.
    var $pokemonTemplatedItem = $listItem.cloneNode(false)
    var $pokemonTemplatedButton = document
      .querySelector('.button--pokemon')
      .cloneNode(false)

    // find our project grid.
    var $projectGrid = document.querySelector('.project-grid')

    // set our row based on the pokemon properties. We already checked that pokemon name is a type of string in this
    $pokemonTemplatedButton.innerText = pokemon.name
    $pokemonTemplatedButton.classList.add('list-group-item')
    $pokemonTemplatedButton.classList.add('list-group-item-dark')

    $pokemonTemplatedItem.insertBefore(
      $pokemonTemplatedButton,
      $pokemonTemplatedItem.firstElementChild
    )

    $pokemonTemplatedButton.addEventListener('click', function() {
      // we need to referenence a pokemon outside of this function just above.
      console.log('show details')
      showDetails(pokemon)
    })

    // insert our pokemon at the top.
    $projectGrid.insertBefore(
      $pokemonTemplatedItem,
      $projectGrid.firstElementChild
    )
  }
}

// make container visible
$('.modal').load(
  'https://jaboston.github.io/alphabet-landingpage-jquery/modal.html'
)

console.log(pokemonRepository.getAll())

// call the loadList function in pokemonRepository which makes a request to the API to fetch and return the list of Pokemon.
pokemonRepository.loadList().then(function() {
  // getAll returns pokemon array from pokemon repository then we call the 'forEach' function on the array
  // which then references each object as the object 'pokemon'.
  // it then adds that pokemon as a list item to our UI.
  pokemonRepository.getAll().forEach(function(pokemon) {
    addListItem(pokemon)
  })
})
