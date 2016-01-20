class Emoji < ActiveRecord::Base
  has_attached_file :image, styles: { medium: '64x64', emoji: '24x24' }
  validates_attachment_content_type :image, content_type: %r{\Aimage\/.*\Z}

  validates :image, presence: true
  validates :code, presence: true, uniqueness: true
end
