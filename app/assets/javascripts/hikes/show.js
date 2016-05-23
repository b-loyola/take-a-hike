//--------------LOAD API KEY--------------//
  var script = $('<script>')
    .attr('src', "https://maps.googleapis.com/maps/api/js?key=" + googleKey + "&callback=initMap")
    .attr('async','').attr('defer','');
  script.appendTo($('body'));
  //--------------LOAD API KEY--------------//
  var map;
  var markers=[];
  var globalPos;
  var globalStartMarker;
  var globalEndMarker;
  var globalHikePath;
  var globalChart;
  var globalHikerMarker;
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      globalPos = pos;
    });
  }


  function initMap() {
    //---- GENERATE MAP ---//
    midPoint = Math.floor(hikeCoordinates.length/2);
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: hikeCoordinates[midPoint],
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      scrollwheel:false
    });

      map.set('styles',[
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        { hue: '#7E6511' },
        { saturation: 10 },
        { lightness: -10 }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        { lightness: -5 }
      ]
    }
  ]);

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
    globalHikePath=hikePath;

    //---START AND END MARKERS---//
    var startMarker = new google.maps.Marker({
      position: hikeCoordinates[0],
      map: map,
      title: 'Start',
      icon: '../../media/start.png'
    });
    globalStartMarker=startMarker;
    
    var endMarker = new google.maps.Marker({
      position: hikeCoordinates[hikeCoordinates.length-1],
      map: map,
      title: 'End',
      icon: '../../media/finish.png'
    });
    globalEndMarker=endMarker;

    //----ELEVATION CHART----//
    var elevator = new google.maps.ElevationService();
    displayPathElevation(hikeCoordinates, elevator, map);
  }

//--- ELEVATION CHART FUNCTIONS--//
function displayPathElevation(path, elevator, map) {
  // Create a PathElevationRequest object using this array.
  // Ask for 256 samples along that path.
  // Initiate the path request.
  elevator.getElevationAlongPath({
    'path': path,
    'samples': path.length
  }, function(elevations, status) {
    plotElevation(elevations, status, path);
  });
}
// Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a Visualization API ColumnChart.
function plotElevation(elevations, status, path) {
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
    colors: ['#5c821a'],
    backgroundColor: '#fff',
  });

  globalChart = google.visualization.events.addListener(chart, 'onmouseover', selectHandler);
  function selectHandler(e) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    var position = path[e.row];
    var hikeMarker = new google.maps.Marker({
      position : position,
      map : map,
      icon: 'http://maps.google.com/mapfiles/ms/micons/hiker.png'
    }); 
    globalHikerMarker = hikeMarker;
    markers.push(hikeMarker);
  }

}
// Hike Description Show More Button
$(function(){
  $('.fe_forecast_link').hide();

  var oldText = $('#hike-description-trunc').text();
  $('.hike-description').on('click', function(){
    $('#hike-description-trunc').text(hike.description);
    $(this).hide();
    $('.hide-hike-description').show();
  });

  $('.hide-hike-description').on('click', function(){
    $('#hike-description-trunc').text(oldText);
    $(this).hide();
    $('.hike-description').show();
  });

  $("#directions").on('click', function(){
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    

    var start = new google.maps.LatLng(globalPos.lat, globalPos.lng);
    var end = new google.maps.LatLng(hikeCoordinates[0].lat, hikeCoordinates[0].lng);
    directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING,
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);

          globalEndMarker.setMap(null);
          globalHikePath.setMap(null);
          globalStartMarker.setMap(null);
          if(globalHikerMarker){
            globalHikerMarker.setMap(null);
          }
      google.visualization.events.removeListener(globalChart);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

    $("#showmap").show();
    $(this).hide();
   });

  $("#showmap").on('click', function(){
    initMap();
    $(this).hide();
    $("#directions").show();
  });
});
