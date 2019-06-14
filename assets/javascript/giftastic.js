

        //--------@@@@@...build function that creates new buttons----///
        var topics = ['shane+dawson', 'apples', 'pineapples', 'oranges'];

        function displayGifInfo() {
            //--------------------------------------------
            $("button").on("click", function () {

                //this is the button you click
                //data-person attribute is data person from button...
                var person = $(this).attr("data-person");
                //building query url
                //working limit
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    person + "&api_key=3zWUyN87dQVmAHhLuPbxtDYwuKkRgZTl&limit=10";

                //communiting with api, 
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }) //after you get information.. do this...
                    .then(function (response) {
                        var results = response.data;

                        console.log(response);
                        //running forloop of results
                        for (var i = 0; i < results.length; i++) {
                            var gifDiv = $("<div>");

                            var rating = results[i].rating;

                            var p = $("<p>").text("Rating: " + rating);

                            var personImage = $("<img class = 'gifpics'>");
                            personImage.attr("src", results[i].images.fixed_height_still.url);

                            personImage.attr({
                                "data-still": results[i].images.fixed_height_still.url,

                                "data-animate": results[i].images.fixed_height.url,

                                "data-state": "still"
                            })


                            gifDiv.prepend(p);
                            gifDiv.prepend(personImage);

                            $("#gifs-appear-here").prepend(gifDiv);

                        }

                    });
            }
            );

        }

        $(document).on('click', ".gifpics", function () {

            var state = $(this).attr("data-state");
            // console.log(state);
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }

        })


        // Function for displaying new gify data
        function renderButtons() {

            // Deleting the gify prior to adding new gify
            // (this is necessary otherwise you will have repeat buttons)
            $("#buttons-appear-here").empty();

            // Looping through the array of gify
            for (var i = 0; i < topics.length; i++) {

                // Then dynamicaly generating buttons for each movie in the array
                // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                var a = $("<button>");
                // Adding a class of movie-btn to our button
                a.addClass("gify-btn");
                // Adding a data-attribute
                a.attr("data-person", topics[i]);
                // Providing the initial button text
                a.text(topics[i]);
                // Adding the button to the gifs-appear-here div
                $("#buttons-appear-here").append(a);
            }
        }

        // This function handles events where a gify button is clicked
        $("#add-gif").on("click", function (event) {
            event.preventDefault();
            // This line grabs the input from the textbox
            var gifffy = $("#gif-input").val().trim();

            // Adding movie from the textbox to our array
            topics.push(gifffy);

            // Calling renderButtons which handles the processing of our movie array
            renderButtons();
        });

        // Adding a click event listener to all elements with a class of "movie-btn"
        $(document).on("click", ".gify-btn", displayGifInfo);

        // Calling the renderButtons function to display the intial buttons
        renderButtons();
