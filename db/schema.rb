# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_19_040809) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cities", force: :cascade do |t|
    t.string "name"
    t.integer "population"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "neighbourhoods", force: :cascade do |t|
    t.string "zip_code"
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "provinces", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.integer "age"
    t.string "sex"
    t.string "zip_code"
    t.boolean "tested"
    t.boolean "contact_with_sick_person"
    t.text "symptoms", default: [], array: true
    t.boolean "with_severe_illness"
    t.boolean "quarantined"
    t.string "quarantined_status"
    t.string "smoking_habits"
    t.integer "temperature"
    t.boolean "privacy_agreement"
    t.string "coordinates"
    t.bigint "province_id"
    t.bigint "city_id"
    t.bigint "neighbourhood_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["city_id"], name: "index_users_on_city_id"
    t.index ["neighbourhood_id"], name: "index_users_on_neighbourhood_id"
    t.index ["province_id"], name: "index_users_on_province_id"
  end

end
