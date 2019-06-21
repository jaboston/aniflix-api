/* global $ */
/* eslint no-undef: "error", no-unused-vars: 1 */

// MODAL closure
/// .................................................................................
function modal (
  shouldShowModal,
  shouldShowDialog,
  title,
  text,
  secondaryText,
  imageUrl,
  extraUrl
) {
  var $modalContainer = $('#modal-container')
  var $baseModal = $('')
  // <div class="modal created rubberBand animated" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"></div></div></div></div>

  console.log('start loading the page')
  // testing m'start loading the page'

  function showModal () {
    // Clear all exi sting modal content
    $('#modal-container').empty()
    $('#modal-container').innerHTML = ''

    console.log(
      'show modal is called: ' +
        title +
        ', text:  ' +
        text +
        ', secondary text: ' +
        secondaryText +
        ', imageUrl: ' +
        imageUrl
    )
    // Add the new modal content
    var closeButtonElement = $(
      '<button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>'
    )
    closeButtonElement.on('click', hideModal)

    $('.modal-title').html(title)

    var titleElement = $('<h1 class="modal-title">' + title + '</h1>')
    titleElement.innerText = title

    var contentElement = $('<p class="modal-content">' + text + '</p>')
    contentElement.innerText = text

    var content2Element = $(
      '<p class="modal-content2">' + secondaryText + '</p>'
    )
    content2Element.innerText = secondaryText
    var image = $("<img class='pokemon-image' src=" + imageUrl + '></img>')
    image.src = imageUrl
    $('.modal-body').empty()
    $('.modal-body').append(contentElement)
    $('.modal-body').append(content2Element)
    $('.modal-body').append(image)

    var confirmButton = $(
      "<button class='modal-confirm'>Show more details</button>"
    )

    $('.modal-footer').empty()
    $('.modal-footer').append(confirmButton)

    // We want to focus the confirmButton so that the user can simply press Enter
    confirmButton.focus()
    if (!($baseModal.parentElement === $('#modal-container'))) {
      $('#modal-container').append($baseModal)
    }

    return new Promise((resolve, reject) => {
      confirmButton.on('click', () => {
        dialogPromiseReject = null
        console.log('extra url: ' + extraUrl)
        window.open(extraUrl, 'www.google.com')
        resolve()
      })
      // This can be used to reject from other functions
      var dialogPromiseReject = reject
    })
  }

  // a subtype of showModal.
  function showDialog () {
    showModal()
    // We want to add a confirm and cancel button to the modal

    // var confirmButton = $(
    //   "<button class='modal-confirm'>Show more details</button>");
    //
    // $baseModal.append(confirmButton);
    //
    // // We want to focus the confirmButton so that the user can simply press Enter
    // confirmButton.focus();
    // // Return a promise that resolves when confirmed, else rejects
    // return new Promise((resolve, reject) => {
    //   confirmButton.on('click', () => {
    //     dialogPromiseReject = null;
    //     console.log('extra url: ' + extraUrl);
    //     window.open(extraUrl, 'www.google.com');
    //     resolve();
    //   });
    //   // This can be used to reject from other functions
    //   dialogPromiseReject = reject;
    // });
  }

  function hideModal () {
    var $modalContainer = $('#modal-container')
    $baseModal.empty()
    $modalContainer.remove($baseModal)
    $modalContainer.empty()
    $('#modal-container').removeClass('is-visible')
    $('#modal-container').empty()
    console.log($('#modal-container').children().length)
  }

  $(window).on('keydown', e => {
    if (e.key === 'Escape' && $modalContainer.hasClass('is-visible')) {
      hideModal()
    }
  })

  $('#modal-container').on('click', e => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target
    if (target.getAttribute('id') === 'modal-container') {
      hideModal()
    }
  })

  // $('[data-toggle="modal"]').on('click', function() {
  //   var targetSelector = $(this).attr('data-target');
  //   $(targetSelector).modal('show'); // Bootstrap’s own function to make the modal appear
  // });

  if (shouldShowModal) {
    showModal()
  }
  if (shouldShowDialog) {
    showDialog()
  }
}
