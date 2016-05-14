//--------------LOAD API KEY--------------//
var script = $('<script>')
  .attr('src', "https://maps.googleapis.com/maps/api/js?key=" + googleKey + "&callback=initMap")
  .attr('async','').attr('defer','');
script.appendTo($('body'));
//--------------LOAD API KEY--------------//

//--------------INITIATE MAP--------------//
  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 49.2819, lng: -123.108},
      zoom: 12,
      scrollwheel:false,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });
    //------ ADD ALL MARKERS TO MAP START ----//
    
    hikes.forEach(function(hike){
      var marker = new google.maps.Marker({
      position: {lat:hike.start_lat, lng:hike.start_lng},
      map: map,
      title: hike.name
      });
      
      //----- ADD INFO WINDOW FOR EACH MARKER -----//
      var infowindow = new google.maps.InfoWindow({
        content:"<div> <a href=/hikes/" + hike.id + "/>" + hike.name + "</div>"
      });
      
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      //----- ADD INFO WINDOW FOR EACH MARKER -----//

    });

//------------INITIATE MAP------------------//

//--------------------------------GEO LOCATION STUFF-----------------------//
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }
//---------------------------------GEO LOCATION STUFF-----------------------//