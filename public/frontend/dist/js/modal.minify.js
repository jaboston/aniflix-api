function modal (o, e, a, n, l, t, i) {
  var d = $('#modal-container')
  var m = $('')

  function c () {
    $('#modal-container').empty(),
    ($('#modal-container').innerHTML = ''),
    console.log(
      'show modal is called: ' +
          a +
          ', text:  ' +
          n +
          ', secondary text: ' +
          l +
          ', imageUrl: ' +
          t
    ),
    $(
      '<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>'
    ).on('click', r),
    $('.modal-title').html(a),
    ($('<h1 class="modal-title">' + a + '</h1>').innerText = a)
    var o = $('<p class="modal-content">' + n + '</p>')
    o.innerText = n
    var e = $('<p class="modal-content2">' + l + '</p>')
    e.innerText = l
    var d = $("<img class='pokemon-image' src=" + t + '></img>')
    ;(d.src = t),
    $('.modal-body').empty(),
    $('.modal-body').append(o),
    $('.modal-body').append(e),
    $('.modal-body').append(d)
    var c = $("<button class='modal-confirm'>Show more details</button>")
    return (
      $('.modal-footer').empty(),
      $('.modal-footer').append(c),
      c.focus(),
      m.parentElement !== $('#modal-container') &&
        $('#modal-container').append(m),
      new Promise((o, e) => {
        c.on('click', () => {
          null,
          console.log('extra url: ' + i),
          window.open(i, 'www.google.com'),
          o()
        })
      })
    )
  }

  function r () {
    var o = $('#modal-container')
    m.empty(),
    o.remove(m),
    o.empty(),
    $('#modal-container').removeClass('is-visible'),
    $('#modal-container').empty(),
    console.log($('#modal-container').children().length)
  }
  console.log('start loading the page'),
  $(window).on('keydown', o => {
    o.key === 'Escape' && d.hasClass('is-visible') && r()
  }),
  $('#modal-container').on('click', o => {
    o.target.getAttribute('id') === 'modal-container' && r()
  }),
  o && c(),
  e && c()
}
