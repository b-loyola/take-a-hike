$(function() {
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

  $('#searched_hikes').DataTable({
    // 'paging': false,
    // 'filter': false
  });

  var link = $('<a>').attr('href', '/hikes/' + '3').text('Name');
  var row = $('<tr>').addClass("hike-row").append($('<td>').append(link));

  $('#difficulty').on('change', function(event){
    debugger
    event.preventDefault();
    $('#searched_hikes').append(row);
  });
});

