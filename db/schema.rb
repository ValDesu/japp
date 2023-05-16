# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_16_030747) do
  create_table "cards", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "deck_id", null: false
    t.string "slug"
    t.string "reading"
    t.json "meanings"
    t.integer "jlpt"
    t.boolean "isCommon"
    t.json "sentences"
    t.integer "correct"
    t.integer "incorrect"
    t.index ["deck_id"], name: "index_cards_on_deck_id"
  end

  create_table "decks", force: :cascade do |t|
    t.string "name"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "done", default: 0
    t.integer "likes", default: 0
    t.index ["name"], name: "index_decks_on_name", unique: true
  end

  create_table "tweets", force: :cascade do |t|
    t.string "tweet_id"
    t.string "slug"
    t.string "text"
    t.string "user"
    t.string "tweet_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "cards", "decks"
end
