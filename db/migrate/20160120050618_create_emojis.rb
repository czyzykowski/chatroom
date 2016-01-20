class CreateEmojis < ActiveRecord::Migration
  def change
    create_table :emojis do |t|
      t.string :code, null: false, unique: true
      t.string :description
      t.attachment :image, null: false

      t.timestamps null: false
    end
  end
end
