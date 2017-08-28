(function() {
	'use strict';

	var movies = [];

	var renderMovies = function() {
		$('#listings').empty();
		// console.log("in renderMovies:", movies);
		for (var movie of movies) {
			console.log("in renderMovies for loop. Title is ", movie.title, " year is ", movie.year);

			const $col = $('<div>').addClass('col s6');
			const $card = $('<div>').addClass('card hoverable');
			const $content = $('<div>').addClass('card-content center');
			const $title = $('<h6>').addClass('card-title truncate');

			$title.attr({
				'data-position': 'top',
				'data-tooltip': movie.title
			});

			$title.tooltip({
				delay: 50
			}).text(movie.title);

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
		} // end of for loop
	};

	// ADD YOUR CODE HERE
	$(document).on('ready', () => {
		console.log('Doc ready');

		$("form").submit((event) => {
			event.preventDefault();
			movies.length = 0
			console.log("submit clicked");
			let movieToSearchFor = $("#search").val().trim();
			console.log("movieToSearchFor is ", movieToSearchFor);
			getMovie(movieToSearchFor);
		});

		function getMovie(movieToSearchFor) {
			console.log("inside getMovie function");
			$.ajax({
				url: 'https://omdb-api.now.sh/',
				method: 'GET',
				dataType: 'JSON',
				data: {
					s: movieToSearchFor
				}
			}).done((response) => {
				//let searchResults = response['Search']
				let searchResults = response['Search']


				console.log("searchResults = ", searchResults);
				parseMovie(searchResults)
			}).fail((err) => {
				console.log("error = ", err);
			})
		}

		function parseMovie(searchResults) {
			console.log("in parseMovie ", searchResults)

			for (let movieResponse of searchResults) {

				let movie = {
					title: movieResponse.Title,
					year: movieResponse.Year,
					poster: (movieResponse.Poster === 'N/A') ? '' : movieResponse.Poster,
					id: movieResponse.imdbID,
					plot: "Bill McFadden is a great developer!!!"
				}
				//    console.log("movie = ",movie);
				movies.push(movie);
				console.log("movies = ", movies);

			}
			console.log("movies[] = ", movies);
			renderMovies()
		}

	})
})();
