$(function() {
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

