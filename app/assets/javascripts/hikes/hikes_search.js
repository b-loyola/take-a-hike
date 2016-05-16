$(function(){
  // $("#searched_hikes").tablesorter();

  $('#search_form').on('keyup', function(){
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

  // $('#distance_sort').on('click', function(){
  //   console.log("nice!");
  //   $('#searched_hikes').find('tbody').empty();
  //   var rows = $('.hike-row').get();
  //   rows.sort(function(a,b){
  //     var A = $(a).data('distance')
  //     var B = $(b).data('distance')

  //     if(A < B) {
  //       return -1;
  //     }
  //     if(A > B) {
  //       return 1;
  //     }
  //     return 0;
  //   })

  //   $('#searched_hikes').find('tbody').append(rows)

  //   // $.each(rows, function(row, index){
  //   //   console.log($(a.distance));

  //   // });
  // });
});



