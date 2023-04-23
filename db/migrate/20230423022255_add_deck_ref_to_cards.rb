class AddDeckRefToCards < ActiveRecord::Migration[7.0]
  def change
    add_reference :cards, :deck, null: false, foreign_key: true
  end
end
