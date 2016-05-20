$(function(){

	var $searchFieldDiv = $('#search-hike-name');
	var $searchField = $('#search-hike-name').find($('#search_name'));

	$searchFieldDiv.hide();

	$('#seek-hike-name').on('click', function(e){
		e.preventDefault();
		$searchFieldDiv.slideToggle();
	});

	$searchField.on('keyup', function(){
		console.log($(this).val());
		// TODO Ajax call to database and suggestions of names of hikes
		// by clicking on a hike name suggestion, you are taken to the hike show page
	});

});