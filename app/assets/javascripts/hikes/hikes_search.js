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
    "bDestroy": true
    // 'paging': false,
    // 'filter': false
  });
});

