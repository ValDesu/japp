class AddAuthorIPtoDecks < ActiveRecord::Migration[7.0]
  def change
    add_column :decks, :author, :string
  end
end
