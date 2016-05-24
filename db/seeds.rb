# require 'rubygems'

require 'nokogiri'
require 'open-uri'
require 'pry'

TARGET_DOMAIN = 'http://www.trailpeak.com/'

#downloaded html page for search area (e.g. All hikes near Vancouver that have GPX data)
target_page = Nokogiri::HTML(open('public/bc_search.html'))
#selects table rows that each contain one hike URL
target_page_hike_list = target_page.css("table tr td a")

def get_name_and_url(target, index)
  hike_name = target[index].text
  search_page_hike_url = target[index].to_s
  search_page_hike_url = search_page_hike_url.gsub("&amp;", "&")
  search_page_hike_url = search_page_hike_url.gsub(/\<a href="/, "")
  search_page_hike_url = search_page_hike_url.gsub(/" .*/, "")
  [hike_name, search_page_hike_url]
end

#builds new hike object
def hike_builder(target)
  i = 24
  while i < 1240
    hike_array = get_name_and_url(target, i)
    name = hike_array[0]
    url = hike_array[1]

    puts "#{name}: #{url}"

    begin
      source = Nokogiri::HTML(open(TARGET_DOMAIN + url))
      stats = source.css("div#stats").to_s
      text_box = source.css("div#description")

      waypoints = extract_coordinates(gpx_file_builder(source))

      seasons = extract_seasons(stats)
      difficulty = extract_difficulty(stats)
      hours = extract_hours(stats)
      distance = extract_distance(stats)
      description = extract_description(text_box)

      if !waypoints.empty?
        Hike.create(
          name: name,
          difficulty: difficulty,
          time_in_hours: hours,
          distance_in_km: distance,
          description: description,
          winter: seasons[:winter],
          spring: seasons[:spring],
          summer: seasons[:summer],
          fall: seasons[:fall],
          start_lat: waypoints[0][:lat],
          start_lng: waypoints[0][:lng],
          waypoints: waypoints
        )
      else
        puts "\e[31m\tNo waypoints\e[0m"
      end
    rescue StandardError => e
      puts "\e[31m\tFailed to import: #{e}\e[0m"
    end

    i += 1
  end
end


# Creates gpx URL out of a few components of the scraped page
def gpx_file_builder(source)
  script = source.css('script')
  trail_id = script.children.to_s.match(/TRAIL_ID\s=\s\"(\d+)\"/)[1]
  gpx_name = script.children.to_s.match(/GPX_URL\s=\s\"([a-zA-Z0-9_\-]+).*\"/)[1]
  TARGET_DOMAIN + "content/gpsData/gps" + trail_id + "-" + gpx_name + ".gpx"
end


# Returns array of coordinates
def extract_coordinates(source)
  gpx_source = Nokogiri::HTML(open(source))
  waypoints = []
  gpx_source.css("trkpt").each do |waypoint|
    coords = {}
    coords[:lat] = waypoint.attribute("lat").value.to_f
    coords[:lng] = waypoint.attribute("lon").value.to_f
    waypoints << coords
  end
  waypoints
end


#returns hash of seasons available
def extract_seasons(stats)
  seasons = stats.scan(/spring|winter|fall|summer/i)
  output = {}
  output[:summer] = seasons.include?("Summer"||"summer")
  output[:winter] = seasons.include?("Winter"||"winter")
  output[:fall] = seasons.include?("Fall"||"fall")
  output[:spring] = seasons.include?("Spring"||"spring")
  output
end


def extract_difficulty(stats)
  difficulty = stats.slice(/easy|moderate|difficult|extreme/i).downcase
  case difficulty
  when "easy"
    0
  when "moderate"
    1
  when "difficult"
    2
  when "extreme"
    3
  else
    1
  end
end



def extract_hours(stats)
  stats.slice(/\d+\.?\d*\s*hours?/).to_i
end

def extract_distance(stats)
  distance = stats.slice(/\d+\.?\d*\s*kms?/).to_i
  distance = 1 if distance < 1
  distance
end

def extract_description(text_box)
  # text_box.xpath('text()').text.strip
  text_box.css('p').text.gsub(/NTS[^\.]+\./i, "").strip
end


def parse
  source = Nokogiri::HTML(open(@source))
  stats = source.css("div#stats").to_s

  seasons = extract_seasons(stats)
  difficulty = extract_difficulty(stats)
  hours = extract_hours(stats)
  distance = extract_distance(stats)

  text_box = source.css("div#description")
  description = extract_description(text_box)
  [seasons, difficulty, hours, distance, description]
end



hike_builder(target_page_hike_list)
