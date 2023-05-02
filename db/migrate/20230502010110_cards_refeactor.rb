class CardsRefeactor < ActiveRecord::Migration[7.0]
  def change
    # Remove old columns
    remove_column :cards, :front
    remove_column :cards, :back
    # Add new columns
    add_column :cards, :slug, :string
    add_column :cards, :reading, :string
    add_column :cards, :meanings, :json
    add_column :cards, :jlpt, :integer
    add_column :cards, :isCommon, :boolean
    add_column :cards, :sentences, :json

    # Word stats (for each deck, later by user)
    add_column :cards, :correct, :integer
    add_column :cards, :incorrect, :integer
  end
end
