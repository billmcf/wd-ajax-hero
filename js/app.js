(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();
    console.log("in renderMovies");
    for (const movie of movies) {
        console.log("in renderMovies for loop. Title is ", movie.title);

      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
    // ADD YOUR CODE HERE
    $(document).on('ready', () => {
      console.log('Doc ready');

      $("form").submit((event) => {
        event.preventDefault();
        console.log("submit clicked");
        let movieToSearchFor = $("#search").val();
        console.log("movieToSearchFor is ",movieToSearchFor);
        getMovie(movieToSearchFor);
      });

function getMovie(movieToSearchFor) {
    console.log("inside getMovie function");
    $.ajax({
        url: 'https://omdb-api.now.sh/',
        method: 'GET',
        dataType: 'JSON',
        data: {
          t: `${movieToSearchFor}`
        }
    }).done((response) => {
        console.log("response is = ", response);
        parseMovie(response)
    }).fail((err) => {console.log("error = ", err);})
}

function parseMovie(response) {
    let movieID = response.imdbID
    let moviePoster = response.Poster
    let movieTitle = response.Title
    let movieYear = response.Year
    console.log("movieTitle = ", movieTitle, movieYear, moviePoster, movieID );

    let movie = {
        title:response.Title,
        year:response.Year,
        poster:response.Poster,
        id:response.imdbID
    }
    console.log(movie);
    movies[0] = movie
    console.log("movies[0] = ", movies[0]);
    renderMovies()


    // movies[0] = response
    // console.log("movies[0] = ", movies[0]);
    // let render = renderMovies()
}

})

})();
