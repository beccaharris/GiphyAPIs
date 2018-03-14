$(document).ready(function() {
  var animals = [];

  function displayAnimalGifs() {
    var animal = $(this).attr('data-name');
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&rating=g&api_key=1Pcm3RD1MLLpLwru1GsRqd34UJh96MMs"

    $.ajax({
      url: giphyURL,
      method: "GET"
    }).done(function(response) {
      var resultingGifs = response.data;
      console.log(resultingGifs);
      for (var i = 0; i < resultingGifs.length; i++) {
        var animalDiv = $('<div class="animal">');
        animalDiv.addClass('hold-my-gif')
        var resultAnimalGif = resultingGifs[i].images.fixed_height.url;
        var showGif = $('<img>');
        showGif.attr('src', resultAnimalGif)
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
      newButton.addClass('animal-button');
      newButton.attr('data-name', animals[i]);
      newButton.text(animals[i]);
      $('#button-div').append(newButton)
  }
}

$(document).on("click", ".animal-button", displayAnimalGifs);

})
