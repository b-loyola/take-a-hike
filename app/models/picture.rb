class Picture < ActiveRecord::Base

  belongs_to :imageable, polymorphic: true
  has_attached_file :content, :styles=>{:medium => "300x300>", :thumb => "100x100>"}

  # has_attached_file :image,
  #   :path => ":rails_root/public/images/:id/:filename",
  #   :url  => "/images/:id/:filename"

end
