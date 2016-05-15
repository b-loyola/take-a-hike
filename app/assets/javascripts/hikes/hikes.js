$(function(){
  $('#search_form').on('keyup',  function(){
    console.log("event activated");
    var searchName = $('#search_name').val();
    var rows = $('.hike-row');
    $.each(rows, function(){
      if ( !($(this).data('name').toLowerCase().match(searchName)) ){
        $(this).hide();
      } else {
        $(this).show();

      }
    })
  });
});



