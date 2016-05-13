require 'rubygems'
require 'nokogiri'
require 'open-uri'
require 'pry'

TARGET_DOMAIN = 'http://www.trailpeak.com/'
#24-185fdg

#downloaded html page for search area (e.g. All hikes near Vancouver that have GPX data)
target_page = Nokogiri::HTML(open('vancouver_search.html'))

#selects table rows that each contain one hike URL
target_page_hike_list = target_page.css("table tr td a")
# binding.pry


#get all hike names
def get_hike_name(target)
  hike_names =[]
  i = 24
  while i < 162
    hike_name = target[i].text
    hike_names << hike_name
    i+=1
  end
  hike_names
end


#collects URLs from search page, input: table of hikes; output: array of hike URLs formatted to add to TARGET_DOMAIN
def get_urls(target)
  trail_urls = []
  i = 24
  while i < 162
    search_page_hike_url = target[i].to_s
    search_page_hike_url = search_page_hike_url.gsub("&amp;", "&")
    search_page_hike_url = search_page_hike_url.gsub(/\<a href="/, "")
    search_page_hike_url = search_page_hike_url.gsub(/" .*/, "")
    trail_urls << search_page_hike_url
    i+=1
  end
  trail_urls
end


#builds new hike objects, input: array of hike URLs; opens each and scrapes data to create new hike object for each link provided.
def trail_builder(urls)
  urls.each do |trail|
    page = Nokogiri::HTML(open(TARGET_DOMAIN + trail))
    script = page.css('script')[3]
    trail_id =  script.children.to_s.match(/TRAIL_ID\s=\s\"(\d+)\"/)[1]
    gpx_name =  script.children.to_s.match(/GPX_URL\s=\s\"(.+)\"/)[1]
    gpx_url = TARGET_DOMAIN + "/content/gpsData/gps" + trail_id + "-" + gpx_name + ".gpx"
  end
end


#extracts coords from gpx file
def parse(source)
  gpx_source = Nokogiri::HTML(open(source))
  extract_coordinates(gpx_source)
end

# Returns array of coordinates
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







hike_names = get_hike_name(target_page_hike_list)
hike_urls = get_urls(target_page_hike_list)
trail_builder(hike_urls)
