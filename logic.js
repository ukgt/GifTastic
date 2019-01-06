// define variables
// define functions
// define listeners,functions

// <!-- When user clicks on Submit button 
// else value 
//        1. buttons APPENDS to page
//        2. API gets 10 giphs
//        3. Giphs are added to page
// if no value 
//        1. alert user to input value 

// When user clicks on gif
//        1. if gif is playing
//                stop animation
//           if gif is stopped
//            start animation
//             -->
// onclick event for submit button
$(document).ready(function () {
  let topics = ['TWEETIE', 'BUGS BUNNY', 'DAFFY DUCK'];
  for (var s = 0; s < topics.length; s++) {
    let b = $('<button>');
    b.addClass('character');
    b.text(topics[s]);
    $('#buttonHolder').append(b);
  }
  $('#buttonHolder').on('click', '.character', function () {
    getGifs($(this).text());
  })
  $("#btnSubmit").on("click", function (event) {
    event.preventDefault();
    // $('#buttonHolder').empty();
    
    
    if (
      $("#inputtopics").val().trim() == "") {
        alert("Please input a character name.");
      } else {
        let topics = $("<input/>").attr({
          type: "button",
          name: "mybutton",
          value: $("#inputtopics").val().trim().toUpperCase(),
          class: "userInput"
        });
        $("#buttonHolder").append(topics);
        getGifs($("#inputtopics").val().trim());
      }
      $('#gifHolder').empty();
  });
  // search gifs with rating of 'g', limit of 10
  function getGifs(looneyName) {
    // let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&rating=g&q=${looneyName}`;
       let queryURL = `https://api.giphy.com/v1/gifs/search?q=${looneyName}&api_key=dc6zaTOxFJmzC&limit=10&rating=g`;
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        console.log(response);
        let searchResults = response.data;
        for (let i = 0; i < response.data.length; i++) {
          let gifDiv = $("<div class = 'item'>");
          let rating = searchResults[i].rating;
          let p = $("<p>").text("Rating: " + rating);

          let looneyImage = $("<img>");
          looneyImage.attr("image-still", searchResults[i].images.fixed_height_still.url);
          looneyImage.attr("image-animate", searchResults[i].images.fixed_height.url);
          looneyImage.attr("src", searchResults[i].images.fixed_height_still.url);
          looneyImage.attr("image-status", "still");
          looneyImage.addClass("play");
          //  append images to DOM
          gifDiv.prepend(p);
          gifDiv.prepend(looneyImage);
          $("#gifHolder").prepend(gifDiv);
        }
        $(".play").on("click", function () {
          let status = $(this).attr("image-status");
          if (status === "still") {
            $(this).attr("src", $(this).attr("image-animate"));
            $(this).attr("image-status", "animate");
          } else {
            $(this).attr("src", $(this).attr("image-still"));
            $(this).attr("image-status", "still");
          }
        });
      })
      .catch(function (response) {
        alert("ERROR, nothing found, please check your input.");
      });
      $('#gifHolder').empty();
  }


});