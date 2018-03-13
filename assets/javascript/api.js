$(document).ready(function() {
  
  var animals = [];
  var newButton = $('<button>');

  $('#submit-button').on('click', function(event) {
    event.preventDefault();
    var userSearch = $('#search-input').val().trim();
    animals.push(userSearch);
    createButtons();
  })

  newButton.on('click', function(event) {
    var animal = $(this).attr('data-name');
    console.log(animal)
  });
  function createButtons() {
    $('#button-div').empty();
    for (var i = 0; i < animals.length; i++) {
      
      newButton.addClass('animal-button');
      newButton.attr('data-name', animals[i]);
      newButton.text(animals[i]);
      $('#button-div').append(newButton)
  }
  console.log(animals)
}
})
