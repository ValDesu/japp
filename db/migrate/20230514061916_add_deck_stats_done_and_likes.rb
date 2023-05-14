class AddDeckStatsDoneAndLikes < ActiveRecord::Migration[7.0]
  def change
    add_column :decks, :done, :integer, default: 0
    add_column :decks, :likes, :integer, default: 0
  end
end
