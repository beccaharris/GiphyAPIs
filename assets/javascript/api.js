$(document).ready(function() {
  var animals = ["orangutan", "panda", "pangolin","dog","alligator", "bear", "mouse", "gorilla","penguin", "cat"]
  generateButtons();
  displayButtons();
  $(document).on("click", ".animal-chip", displayAnimalGifs);
  // Get GIFs to pause/animate on click //
  // ================================== //
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
  // Function to push new buttons to array on click of submit //
  // ======================================================== //
  function displayButtons() {
    $('#submit-button').on('click', function(event) {
      event.preventDefault();
      var userSearch = $('#search-input').val().trim();
      var lowerUserSearch = userSearch.toLowerCase()
      // So user cannot add a blank button // 
      if (lowerUserSearch == "") {
        return false;
      }
      animals.push(lowerUserSearch);
      $('#search-input').val("");
      generateButtons();
    })
  }
  // Function to generate new buttons from animals array //
  // =================================================== //
  function generateButtons() {
    $('#chips-div').empty();
    for (var i = 0; i < animals.length; i++) {
      var chips = $('<div class="chip animal-chip">')
      chips.attr('data-name', animals[i]);
      chips.text(animals[i]);
      $('#chips-div').append(chips)
    }
  }
  // ajax call to GIPHY API to get the actual gifs & ratings //
  // defines still and animated urls from response - sets default to still // 
  // ===================================================================== //
  function displayAnimalGifs() {
    $('#gifs-div').empty();
    var animal = $(this).attr('data-name');
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&rating=pg&api_key=1Pcm3RD1MLLpLwru1GsRqd34UJh96MMs"

    $.ajax({
      url: giphyURL,
      method: "GET"
    }).done(function(response) {
      var resultingGifs = response.data;
      for (var i = 0; i < resultingGifs.length; i++) {
        var animalDiv = $('<div class="hold-my-gif">');
        // Display rating // 
        var gifRating = $('<p>').text('Rating: ' + resultingGifs[i].rating)
        animalDiv.prepend(gifRating)
        // Display GIFs // 
        var showGif = $('<img class="actual-gif">');
        var animalGifStill = resultingGifs[i].images.fixed_height_small_still.url;
        var animalGifAnimate = resultingGifs[i].images.fixed_height_small.url;
        showGif.attr('src', animalGifStill);
        showGif.attr('data-still', animalGifStill);
        showGif.attr('data-animate', animalGifAnimate);
        showGif.attr('data-state', 'still');
        animalDiv.prepend(showGif);
        $('#gifs-div').prepend(animalDiv)
      }
    })
  }
})


