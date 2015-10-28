class AddAttachmentGalleryToPhotos < ActiveRecord::Migration
  def self.up
    change_table :photos do |t|
      t.attachment :gallery
    end
  end

  def self.down
    remove_attachment :photos, :gallery
  end
end
