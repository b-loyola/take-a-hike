//--------------LOAD API KEY--------------//
  var script = $('<script>')
    .attr('src', "https://maps.googleapis.com/maps/api/js?key=" + googleKey + "&callback=initMap")
    .attr('async','').attr('defer','');
  script.appendTo($('body'));
  //--------------LOAD API KEY--------------//

  function initMap() {

    midPoint = Math.floor(hikeCoordinates.length/2);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: hikeCoordinates[midPoint],
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      scrollwheel:false
    });

    var bounds = new google.maps.LatLngBounds();

    hikeCoordinates.forEach(function(coord){
      var point = new google.maps.LatLng(coord.lat, coord.lng);
      bounds.extend(point);
    });

    map.fitBounds(bounds);

    var hikePath = new google.maps.Polyline({
      path: hikeCoordinates,
      geodesic: true,
      strokeColor: 'black',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });       
    hikePath.setMap(map);

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
  }
  //*********DISTANCE AND DURATION**********************//
