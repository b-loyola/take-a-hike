$(function(){
  var locationUrl;
  var lat = hikeCoordinates[0].lat;
  var lng = hikeCoordinates[0].lng;
  $.ajax({
    url: "http://api.wunderground.com/api/"+ weatherKey +"/geolookup/q/" + lat + "," + lng + ".json",
    dataType: "jsonp",
    success: function(results) {
      console.log(results);
      var locationUrl = results.location.l;
      console.log(locationUrl)
      location_search(locationUrl);
    }
  })

  function location_search(location){
    $.ajax({
      url: "http://api.wunderground.com/api/" + weatherKey + "/conditions" + location + '.json',
      dataType: "jsonp",
      success: function(parsed_json) {
        console.log(parsed_json);
        var location = parsed_json.current_observation.display_location.full;
        var temp = parsed_json.current_observation.temp_c;
        var tempFeel = parsed_json.current_observation.feelslike_c;
        var weather = parsed_json.current_observation.weather;
        var wind_dir = parsed_json.current_observation.wind_dir;
        var wind_spd = parsed_json.current_observation.wind_kph;
        var img = parsed_json.current_observation.icon_url;
        var time = parsed_json.current_observation.local_time_rfc822;

        var parent = $("#result-list");
        $('<ul>').addClass('weather-for-result')
          .append($('<li>').text(location))
          .append($('<li>').text(time))
          .append($('<li>').text("Current conditions: " + weather))
          .append($('<li>').text("Temperature: " + temp + "C, Feels like: " + tempFeel + 'C'))
          .append($('<li>').text("Wind speed: " + wind_spd + "km/h, Wind direction: " + wind_dir))
          .append($('<img>').attr('src',img))
          .appendTo(parent)
      }
    });
  }
});
