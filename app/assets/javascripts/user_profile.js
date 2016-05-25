$(function(){
  $('#completed_hikes_table').dataTable({
    "createdRow": function ( row, data, index ) {
      var row = $('td', row);
      var distance = data[1];
      var difficulty = data[2];

      row.eq(1).text(distance + " km").attr('data-distance', distance);

      if (difficulty == 0) {
        row.eq(2).text("Easy");
      } else if (difficulty == 1) {
        row.eq(2).text("Medium");
      } else if (difficulty == 2) {
        row.eq(2).text("Hard");
      } else {
        row.eq(2).text("Extreme");
      };
    },
    "columns": [
      { "width": "40%" },
      { "width": "15%" },
      { "width": "15%" },
      { "width": "15%" },
      { "width": "15%", "orderable": "false" }
    ],
    "paging": false,
    "filter": false,
    "responsive": true
    // "bDestroy": true,
  });

  $('#fave_hikes_table').dataTable({
    "createdRow": function ( row, data, index ) {
      var row = $('td', row);
      var distance = data[1];
      var difficulty = data[2];

      row.eq(1).text(distance + " km");

      if (difficulty == 0) {
        row.eq(2).text("Easy");
      } else if (difficulty == 1) {
        row.eq(2).text("Medium");
      } else if (difficulty == 2) {
        row.eq(2).text("Hard");
      } else {
        row.eq(2).text("Extreme");
      };
    },
    "columns": [
      { "width": "40%" },
      { "width": "15%" },
      { "width": "15%" },
      { "width": "15%", "orderable": "false" }
    ],
    "paging": false,
    "filter": false,
    "responsive": true
  })

  $('#reviews-table').dataTable({
    "paging": false,
    "filter": false,
    "responsive": true
  });

  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 0) {
      $('#profile-header').fadeOut('slow');
    }
    else {
      $('#profile-header').fadeIn('fast');
    }
  });

  $('.delete-button').on('click', function(){
    console.log('clicked');
    $('.delete-cell').hide();
    $('.delete-button').show();
    $(this).hide();
    $(this).nextAll().show();
  });

  $('.non-delete').on('click', function(){
    $('.delete-cell').hide();
    $('.delete-button').show();
  })

  $("a.completed_hikes_delete").on("ajax:success", function(e, data, status, xhr) {
    $(this).closest('tr').fadeOut('slow');
  });

  $("a.fave_hikes_delete").on("ajax:success", function(e, data, status, xhr) {
    $(this).closest('tr').fadeOut('slow');
  });

  $("a.reviews_delete").on("ajax:success", function(e, data, status, xhr) {
    $(this).closest('tr').fadeOut('slow');
  });


})
