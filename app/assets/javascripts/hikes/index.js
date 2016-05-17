//--------------LOAD API KEY--------------//
var script = $('<script>')
  .attr('src', "https://maps.googleapis.com/maps/api/js?key=" + googleKey + "&callback=initMap")
  .attr('async','').attr('defer','');
script.appendTo($('body'));
//--------------LOAD API KEY--------------//

var hikes = [];
var markers = [];
var infowindow = null;

//--------------INITIATE MAP--------------//
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 49.2819, lng: -123.108},
    zoom: 11,
    scrollwheel:false,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  infoWindow = new google.maps.InfoWindow({content: "Holding..."});

  //--------------SET MAP STYLES--------------/
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

  //--------------GET NEW HIKES ONCE MAP HAS CHANGED--------------/
  google.maps.event.addListener(map, 'idle', getMarkers);

  function getMarkers() {

    var southWest = map.getBounds().getSouthWest();
    var northEast = map.getBounds().getNorthEast();

    var position = {
      max_lat: northEast.lat(),
      min_lat: southWest.lat(),
      max_lng: northEast.lng(),
      min_lng: southWest.lng()
    };

    // Call server with ajax passing it the bounds
    $.ajax({
      method: 'get',
      url: 'hikes/nearby',
      data: {position: position},
      dataType: 'json',
      success: populateMap
    });

  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }

  //------ ADD ALL MARKERS TO MAP START ----//

  // var bounds = new google.maps.LatLngBounds();
  function populateMap(hikes){
    deleteMarkers();
    $('#searched_hikes').find('tbody').empty();

    hikes.forEach(function(hike){

      var marker = new google.maps.Marker({
      position: {lat:hike.start_lat, lng:hike.start_lng},
      icon: 'media/hiking.png',
      map: map,
      name: hike.name,
      id: hike.id,
      distance: hike.distance_in_km,
      });

      markers.push(marker);

      //----- ADD INFO WINDOW FOR EACH MARKER -----//

      google.maps.event.addListener(marker, 'click', function(){
        windowContent = "<h5>"+"<a href=/hikes/"+this.id+">"+this.name+"</a>"+"</h5>"+"<p>"+"<strong>"+this.distance+"</strong>"+" km"+"</p>";
        // calcRoute(this.position);
        infoWindow.setContent(windowContent);
        infoWindow.open(map, this);
      });

      //------ POPULATE TABLE WITH DATA ----------//


      var name = $('<td>').append($('<a>').attr('href', '/hikes/' + hike.id).text(hike.name));
      var dist = $('<td>').text(hike.distance_in_km + " km");
      var difficulty = $('<td>').text(hike.difficulty);
      var time = $('<td>').text(hike.time_in_hours + "Hours");
      var row = $('<tr>').addClass("hike-row")
        .append(name)
        .append(dist)
        .append(time)
        .append(difficulty);
      $('#searched_hikes').append(row);
    });
  }

  //--------------------------------GEO LOCATION STUFF-----------------------//
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);

      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Current Location',
        icon: 'media/here.png',
      });

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
//------------END OF INITIATE MAP------------------//

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
//---------------------------------GEO LOCATION STUFF-----------------------//

//-----------FILTERING RESULTS--------//



