// define variables
// definde functions
// define listeners,functions
    $(document).ready(function() {
        $("#btnsubmit").on("click", function(event) {
          event.preventDefault();
          
          if (
            $("#inputtopics")
            .val()
            .trim() == ""
            ) {
              alert("Please input a character name.");
            } else {
              let topics = $("<input/>").attr({
                type: "button",
                name: "mybutton",
                value: $("#inputtopics")
                .val()
                .trim()
              });
              $("#buttonHolder").append(topics);
              getGifs(
                $("#inputtopics")
                .val()
                .trim()
                );
              }
            });
            // search gifs with rating of 'g'
            function getGifs(looneyName) {
              let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=rating=g=${looneyName}`;
              
              $.ajax({
                url: queryURL,
                method: "GET"
              })
              .then(function(response) {
                console.log(response);
                let searchResults = response.data;
                for (let i = 0; i < response.data.length; i++) {
                  let gifDiv = $("<div class = 'item'>");
                    let rating = searchResults[i].rating;
                    let p = $("<p>").text("Rating: " + rating);
                      
                      let looneyImage = $("<img>");
                      looneyImage.attr("image-still", searchResults[i].images.fixed_height_still.url);
                      looneyImage.attr("image-animate",searchResults[i].images.fixed_height.url);
                      looneyImage.attr("src", searchResults[i].images.fixed_height_still.url);
                      looneyImage.attr(("image-status", "still"));
                      looneyImage.addClass("play");
                      //  append images to DOM
                      gifDiv.prepend(p);
                      gifDiv.prepend(looneyImage);
                      
                      $("#gifHolder").prepend(gifDiv);
                      
                      $(".play").on("click", function() {
                        let status = $(this).attr("image-status");
                        if (status == "still") {
                          $(this).attr("src", $(this).attr("image-animate"));
                          $(this).attr("image-status", "animate");
                        } else {
                          $(this).attr("src", $(this).attr("image-still"));
                          $(this).attr("image-status", "still");
                        }
                      });
                    }
                  })
                  .catch(function(response) {
                    alert("ERROR, nothing found, please check your input.");
                  });
                }
              });