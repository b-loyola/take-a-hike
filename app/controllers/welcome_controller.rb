class WelcomeController < ApplicationController
  def index
    @top_rated = Hike.top_rated
    @featured = Hike.featured
  end
end
