//--------------LOAD API KEY--------------//
  var script = $('<script>')
    .attr('src', "https://maps.googleapis.com/maps/api/js?key=" + googleKey + "&callback=initMap")
    .attr('async','').attr('defer','');
  script.appendTo($('body'));
  //--------------LOAD API KEY--------------//


  function initMap() {
    //---- GENERATE MAP ---//
    midPoint = Math.floor(hikeCoordinates.length/2);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: hikeCoordinates[midPoint],
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      scrollwheel:false
    });

    //--- FIT MAP TO BOUNDS --//
    var bounds = new google.maps.LatLngBounds();
    hikeCoordinates.forEach(function(coord){
      var point = new google.maps.LatLng(coord.lat, coord.lng);
      bounds.extend(point);
    });
    map.fitBounds(bounds);

    //--- GENERATE HIKE PATH POLYLINE --//
    var hikePath = new google.maps.Polyline({
      path: hikeCoordinates,
      geodesic: true,
      strokeColor: 'black',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });       
    hikePath.setMap(map);

    //---START AND END MARKERS---//
    var startMarker = new google.maps.Marker({
      position: hikeCoordinates[0],
      map: map,
      title: 'Start',
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    });
    var endMarker = new google.maps.Marker({
      position: hikeCoordinates[hikeCoordinates.length-1],
      map: map,
      title: 'End',
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });

    //----ELEVATION CHART----//
    var elevator = new google.maps.ElevationService;
    displayPathElevation(hikeCoordinates, elevator, map);
  }

//--- ELEVATION CHART FUNCTIONS--//
function displayPathElevation(path, elevator, map) {

  // Create a PathElevationRequest object using this array.
  // Ask for 256 samples along that path.
  // Initiate the path request.
  elevator.getElevationAlongPath({
    'path': path,
    'samples': 256
  }, plotElevation);
}

// Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a Visualization API ColumnChart.
function plotElevation(elevations, status) {
  var chartDiv = document.getElementById('elevation_chart');
  if (status !== google.maps.ElevationStatus.OK) {
    // Show the error code inside the chartDiv.
    chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
        status;
    return;
  }
  // Create a new chart in the elevation_chart DIV.
  var chart = new google.visualization.ColumnChart(chartDiv);

  // Extract the data from which to populate the chart.
  // Because the samples are equidistant, the 'Sample'
  // column here does double duty as distance along the
  // X axis.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Sample');
  data.addColumn('number', 'Elevation');
  for (var i = 0; i < elevations.length; i++) {
    data.addRow(['', elevations[i].elevation]);
  }

  // Draw the chart using the data within its DIV.
  chart.draw(data, {
    height: 150,
    legend: 'none',
    titleY: 'Elevation (m)',
    colors: ['darkgreen'],
    backgroundColor: '#E4E4E4',
  });
}
