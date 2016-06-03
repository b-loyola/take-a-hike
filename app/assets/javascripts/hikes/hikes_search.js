function addDataTable() {

  var $searchedHikes = $('#searched_hikes');

  function buildTable() {

    $searchedHikes.dataTable({
      "createdRow": function ( row, data, index ) {
        var row = $('td', row);
        var distance = data[1];
        var time = data[2];
        var difficulty = data[3];
        var rating = data[4];

        row.eq(1).text(distance + " km");

        if (time == 0) {
          row.eq(2).text("Less than an hour");
        } else if (time == 1) {
          row.eq(2).text(time + " hour");
        } else {
          row.eq(2).text(time + " hours");
        };

        if (difficulty == 0) {
          row.eq(3).text("Easy");
        } else if (difficulty == 1) {
          row.eq(3).text("Medium");
        } else if (difficulty == 2) {
          row.eq(3).text("Hard");
        } else {
          row.eq(3).text("Extreme");
        };

        if (rating == 0) {
          row.eq(4).text("Not yet rated");
        } else {
          var td = row.eq(4);
          td.empty();
          for (var i=0; i< rating; i++){
            $('<span>').addClass("rate-tree glyphicon glyphicon-tree-conifer").appendTo(td);
          }
        }
      },

      "bDestroy": true,
      "iDisplayLength": 25,
      "columns": [
        { "width": "50%" },
        { "width": "10%" },
        { "width": "12.5%" },
        { "width": "12.5%" },
        { "width": "15%" }
      ],
      "fnDrawCallback": function(oSettings) {
        if ($('#searched_hikes tr').length < 26) {
            $('.dataTables_paginate').hide();
        }
      }
    });
  }

  buildTable();

}
