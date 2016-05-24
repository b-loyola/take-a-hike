function addDataTable() {

  var $searchedHikes = $('#searched_hikes');

  function buildTable() {

    $searchedHikes.dataTable({
      "createdRow": function ( row, data, index ) {
        var row = $('td', row);
        var distance = data[1];
        var time = data[2];
        var difficulty = data[3];

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
      },

      "bDestroy": true,
      "iDisplayLength": 25,
      "columns": [
        { "width": "55%" },
        { "width": "15%" },
        { "width": "15%" },
        { "width": "15%" }
      ]
    });
  }

  buildTable();

}
