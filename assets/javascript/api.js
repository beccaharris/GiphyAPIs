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
        var resultAnimalGifStill = resultingGifs[i].images.fixed_height_small_still.url;
        var resultAnimalGifAnimate = resultingGifs[i].images.fixed_height_small.url;
        var showGif = $('<img>');
        showGif.addClass('actual-gif');
        showGif.attr('src', resultAnimalGif);
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

  $('.actual-gif').on('click', function(event) {
    console.log("wooooo")
  })

  function createButtons() {
    $('#button-div').empty();
    for (var i = 0; i < animals.length; i++) {
      var newButton = $('<button type="button" class="btn btn-dark">');
      newButton.addClass('animal-button');
      newButton.attr('data-name', animals[i]);
      newButton.text(animals[i]);
      $('#button-div').append(newButton)
  }
}

$(document).on("click", ".animal-button", displayAnimalGifs);

})
