class CreateTweetModel < ActiveRecord::Migration[7.0]
  def change
    create_table :tweets do |t|
      t.string :tweet_id
      t.string :slug
      t.string :text
      t.string :user
      t.string :tweet_created_at
      t.timestamps
    end
  end
end
