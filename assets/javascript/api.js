$(document).ready(function() {
  var animals = ["Cat","Dog","Gorilla","Pangolin","Penguin"];

  function displayAnimalGifs() {
    var animal = $(this).attr('data-name');
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&rating=pg&api_key=1Pcm3RD1MLLpLwru1GsRqd34UJh96MMs"

    $.ajax({
      url: giphyURL,
      method: "GET"
    }).done(function(response) {
      var resultingGifs = response.data;
      console.log(resultingGifs);
      for (var i = 0; i < resultingGifs.length; i++) {
        var animalDiv = $('<div>');
        animalDiv.addClass('hold-my-gif')
        var gifRating = $('<p>').text('Rating: ' + resultingGifs[i].rating)
        animalDiv.append(gifRating)
        var animalGifStill = resultingGifs[i].images.fixed_height_small_still.url;
        var animalGifAnimate = resultingGifs[i].images.fixed_height_small.url;
        var showGif = $('<img>');
        showGif.addClass('actual-gif');
        showGif.attr('src', animalGifStill);
        showGif.attr('data-still', animalGifStill);
        showGif.attr('data-animate', animalGifAnimate);
        showGif.attr('data-state', 'still');
        animalDiv.prepend(showGif);
        $('#gifs-div').prepend(animalDiv)
      }
    })
  }

  $('#submit-button').on('click', function(event) {
    event.preventDefault();
    var userSearch = $('#search-input').val().trim();
    animals.push(userSearch);
    createButtons();
  })

  function createButtons() {
    $('#button-div').empty();
    for (var i = 0; i < animals.length; i++) {
      var newButton = $('<button>');
      newButton.addClass('btn btn-dark')
      newButton.addClass('animal-button');
      newButton.attr('data-name', animals[i]);
      newButton.text(animals[i]);
      $('#button-div').append(newButton)
  }
}

$(document).on("click", ".animal-button", displayAnimalGifs);
$(document).on("click", ".actual-gif", function() {
  var state = $(this).attr('data-state');
  if (state === 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate')
  } else {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }
});

})
