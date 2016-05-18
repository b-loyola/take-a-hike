$(function() {
  $('#difficulty').on('change', function(){

    $('#searched_hikes').dataTable().fnDestroy();
    $('#searched_hikes').find('tbody').empty();

    var searchVal = $(this).val();
    var rows = $('.hike-row');
    $.each(rows, function(){
      var difficulty = $(this).attr('data-difficulty');
      console.log(this);
      console.log("Difficulty: "+ difficulty);
      console.log("Search: "+ searchVal);

      if (difficulty === searchVal) {
        console.log('show!');
        $(this).show();
      } else {
        console.log('hide!');
        $(this).hide();
      }
    });
  });

  $('#search_form').on('keyup', function(){
    var searchName = $('#search_name').val();
    var rows = $('.hike-row');
    $.each(rows, function(){
      if ( !($(this).data('name').toLowerCase().match(searchName)) ){
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });

//     var name = $('<td>').append($('<a>').attr('href', '/hikes/' + hike.id).text(hike.name));
//     var dist = $('<td>').text(hike.distance_in_km + ' km');
//     var difficulty = $('<td>').text(hike.difficulty);
//     var time = $('<td>').text(hike.time_in_hours + 'Hours');
//     // debugger
//     var row = $('<tr>').addClass('hike-row')
//     .attr('data-difficulty', hike.difficulty)
//     .attr('data-distance', hike.distance_in_km)
//     .attr('data-name', hike.name)
//       .append(name)
//       .append(dist)
//       .append(time)
//       .append(difficulty);
//     $('#searched_hikes').append(row);
//   })
// ;
  // $('#searched_hikes').dataTable({'bDestroy': true });





  $('#searched_hikes').DataTable({
    "bDestroy": true,
    "iDisplayLength": 25,
    "columns": [
      { "width": "55%" },
      { "width": "15%" },
      { "width": "15%" },
      { "width": "15%" }
    ]
    // 'paging': false,
    // 'filter': false
  });
});

