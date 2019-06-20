var imported = document.createElement('script')
;(imported.src = 'js/modal.js'), document.head.appendChild(imported)
var $listItem = document.querySelector('.project-grid__item')
var pokemonRepository = (function () {
  'use strict'
  var e = []
  var t = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

  function o (t) {
    if (typeof t.height !== 'number' || typeof t.name !== 'string') {
      throw console.log(": You didn't catch this pokemon!")
    }
    e.push(t)
  }
  return {
    add: o,
    getAll: function () {
      return e
    },
    filter: function (t) {
      return e.filter(e => e.name === t)
    },
    loadList: function () {
      return fetch(t)
        .then(function (e) {
          return e.json()
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            console.log(e),
            o({
              name: e.name,
              detailsUrl: e.url,
              height: -1,
              types: Object.keys({})
            })
          })
        })
        .catch(function (e) {
          console.error(e)
        })
    },
    loadDetails: function (e) {
      var t = e.detailsUrl
      return $.get(t, function () {
        console.log('getting details from ' + t)
      })
        .done(function (t) {
          return (
            (e.imageUrl = t.sprites.front_default),
            (e.height = t.height),
            (e.types = t.types),
            e
          )
        })
        .fail(function (e) {
          console.error(e)
        })
    }
  }
})()

function showDetails (e) {
  pokemonRepository.loadDetails(e).then(function () {
    console.log(
      'name: ' +
        e.name +
        ', height: ' +
        e.height +
        ', type: ' +
        e.types[0].type.name
    )
    var t = ''
    ;(t =
      e.height > 15
        ? e.height + ' inches tall! wow what a big boi!'
        : e.height + ' inches... such a wittle pokeman.'),
    console.log('show modal'),
    modal(
      !1,
      !0,
      e.name,
      'type: ' + e.types[0].type.name,
      t,
      e.imageUrl,
      e.detailsUrl
    )
  })
}

function addListItem (e) {
  if (typeof e.height === 'number' && typeof e.name === 'string') {
    var t = $listItem.cloneNode(!1)
    var o = document.querySelector('.button--pokemon').cloneNode(!1)
    var n = document.querySelector('.project-grid')
    ;(o.innerText = e.name),
    o.classList.add('list-group-item'),
    o.classList.add('list-group-item-dark'),
    t.insertBefore(o, t.firstElementChild),
    o.addEventListener('click', function () {
      console.log('show details'), showDetails(e)
    }),
    n.insertBefore(t, n.firstElementChild)
  }
}
$('.modal').load(
  'https://jaboston.github.io/alphabet-landingpage-jquery/modal.html'
),
console.log(pokemonRepository.getAll()),
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    addListItem(e)
  })
})
