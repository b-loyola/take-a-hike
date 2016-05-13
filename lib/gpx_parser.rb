require 'nokogiri'
require 'open-uri'
# require 'byebug'
gpx = 'http://trailpeak.com/content/gpsData/gps11795-Deep-Cove-to-Grouse-BP-Trail.gpx'

def extract_coordinates(gpx_source)
  waypoints = []
  gpx_source.css("trkpt").each do |waypoint|
    coords = []
    coords << waypoint.attribute("lat").value
    coords << waypoint.attribute("lon").value
    waypoints << coords
  end
  puts waypoints
end

# Returns array of coordinates
def parse(source)
  gpx_source = Nokogiri::HTML(open(source))
  extract_coordinates(gpx_source)
end





parse(gpx)
