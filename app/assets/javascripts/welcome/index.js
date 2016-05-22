$(function(){

	var hikes = [];

	$.ajax({
		method: 'get',
		url: '/hikes',
		dataType: 'json',
		success: function(responseHikes){
			responseHikes.forEach(function(hike, i){
				hikes.push([hike.id,hike.name]);
			});
		}
	});

	var substringMatcher = function(strs) {
		return function findMatches(q, cb) {
			var matches, substringRegex;

			// an array that will be populated with substring matches
			matches = [];

			// regex used to determine if a string contains the substring `q`
			substrRegex = new RegExp(q, 'i');

			// iterate through the pool of strings and for any string that
			// contains the substring `q`, add it to the `matches` array
			$.each(strs, function(i, str) {
				if (substrRegex.test(str)) {
					matches.push(str);
				}
			});

			cb(matches);
		};
	};

	var $searchFieldDiv = $('#search-hike-name');
	var $searchField = $('#search-hike-name').find($('#search_name'));

	$searchField.typeahead({
		hint: true,
		highlight: true,
		minLength: 1
	},
	{
		name: 'hikes',
		source: substringMatcher(hikes),
		templates: {
			empty: [
				'<div class="tt-suggestion disabled">',
					'Unable to find a hiking trail that matches your query',
				'</div>'
			].join('\n')
		},
		display: function(array){
			return array[1];
		}
	});

	$searchField.bind('typeahead:select', function(e, hikeID) {
		window.location.href = '/hikes/' + hikeID;
	});

	$searchFieldDiv.hide();

	$('#seek-hike-name').on('click', function(e){
		e.preventDefault();
		$('html, body').animate({
        scrollTop: $('#seek-hike-name').offset().top
    }, 800);
		$searchFieldDiv.slideToggle();
		$searchField.trigger('focus');
	});

});