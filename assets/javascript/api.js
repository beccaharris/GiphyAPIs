$(document).ready(function() {
  var animals = [];

  $('#submit-button').on('click', function() {
    var userSearch = $('#search-input').val().trim();
    animals.push(userSearch)
    var newButton = $('<button>');
    newButton.attr('data-name', userSearch);
    newButton.addClass('animal-button');
    newButton.text(userSearch);
    $('#button-div').append(newButton)
  })



})