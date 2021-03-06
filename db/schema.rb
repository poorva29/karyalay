# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160203131938) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comfy_cms_blocks", force: :cascade do |t|
    t.string   "identifier",     null: false
    t.text     "content"
    t.integer  "blockable_id"
    t.string   "blockable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comfy_cms_blocks", ["blockable_id", "blockable_type"], name: "index_comfy_cms_blocks_on_blockable_id_and_blockable_type", using: :btree
  add_index "comfy_cms_blocks", ["identifier"], name: "index_comfy_cms_blocks_on_identifier", using: :btree

  create_table "comfy_cms_categories", force: :cascade do |t|
    t.integer "site_id",          null: false
    t.string  "label",            null: false
    t.string  "categorized_type", null: false
  end

  add_index "comfy_cms_categories", ["site_id", "categorized_type", "label"], name: "index_cms_categories_on_site_id_and_cat_type_and_label", unique: true, using: :btree

  create_table "comfy_cms_categorizations", force: :cascade do |t|
    t.integer "category_id",      null: false
    t.string  "categorized_type", null: false
    t.integer "categorized_id",   null: false
  end

  add_index "comfy_cms_categorizations", ["category_id", "categorized_type", "categorized_id"], name: "index_cms_categorizations_on_cat_id_and_catd_type_and_catd_id", unique: true, using: :btree

  create_table "comfy_cms_files", force: :cascade do |t|
    t.integer  "site_id",                                    null: false
    t.integer  "block_id"
    t.string   "label",                                      null: false
    t.string   "file_file_name",                             null: false
    t.string   "file_content_type",                          null: false
    t.integer  "file_file_size",                             null: false
    t.string   "description",       limit: 2048
    t.integer  "position",                       default: 0, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comfy_cms_files", ["site_id", "block_id"], name: "index_comfy_cms_files_on_site_id_and_block_id", using: :btree
  add_index "comfy_cms_files", ["site_id", "file_file_name"], name: "index_comfy_cms_files_on_site_id_and_file_file_name", using: :btree
  add_index "comfy_cms_files", ["site_id", "label"], name: "index_comfy_cms_files_on_site_id_and_label", using: :btree
  add_index "comfy_cms_files", ["site_id", "position"], name: "index_comfy_cms_files_on_site_id_and_position", using: :btree

  create_table "comfy_cms_layouts", force: :cascade do |t|
    t.integer  "site_id",                    null: false
    t.integer  "parent_id"
    t.string   "app_layout"
    t.string   "label",                      null: false
    t.string   "identifier",                 null: false
    t.text     "content"
    t.text     "css"
    t.text     "js"
    t.integer  "position",   default: 0,     null: false
    t.boolean  "is_shared",  default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comfy_cms_layouts", ["parent_id", "position"], name: "index_comfy_cms_layouts_on_parent_id_and_position", using: :btree
  add_index "comfy_cms_layouts", ["site_id", "identifier"], name: "index_comfy_cms_layouts_on_site_id_and_identifier", unique: true, using: :btree

  create_table "comfy_cms_pages", force: :cascade do |t|
    t.integer  "site_id",                        null: false
    t.integer  "layout_id"
    t.integer  "parent_id"
    t.integer  "target_page_id"
    t.string   "label",                          null: false
    t.string   "slug"
    t.string   "full_path",                      null: false
    t.text     "content_cache"
    t.integer  "position",       default: 0,     null: false
    t.integer  "children_count", default: 0,     null: false
    t.boolean  "is_published",   default: true,  null: false
    t.boolean  "is_shared",      default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comfy_cms_pages", ["parent_id", "position"], name: "index_comfy_cms_pages_on_parent_id_and_position", using: :btree
  add_index "comfy_cms_pages", ["site_id", "full_path"], name: "index_comfy_cms_pages_on_site_id_and_full_path", using: :btree

  create_table "comfy_cms_revisions", force: :cascade do |t|
    t.string   "record_type", null: false
    t.integer  "record_id",   null: false
    t.text     "data"
    t.datetime "created_at"
  end

  add_index "comfy_cms_revisions", ["record_type", "record_id", "created_at"], name: "index_cms_revisions_on_rtype_and_rid_and_created_at", using: :btree

  create_table "comfy_cms_sites", force: :cascade do |t|
    t.string  "label",                       null: false
    t.string  "identifier",                  null: false
    t.string  "hostname",                    null: false
    t.string  "path"
    t.string  "locale",      default: "en",  null: false
    t.boolean "is_mirrored", default: false, null: false
  end

  add_index "comfy_cms_sites", ["hostname"], name: "index_comfy_cms_sites_on_hostname", using: :btree
  add_index "comfy_cms_sites", ["is_mirrored"], name: "index_comfy_cms_sites_on_is_mirrored", using: :btree

  create_table "comfy_cms_snippets", force: :cascade do |t|
    t.integer  "site_id",                    null: false
    t.string   "label",                      null: false
    t.string   "identifier",                 null: false
    t.text     "content"
    t.integer  "position",   default: 0,     null: false
    t.boolean  "is_shared",  default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comfy_cms_snippets", ["site_id", "identifier"], name: "index_comfy_cms_snippets_on_site_id_and_identifier", unique: true, using: :btree
  add_index "comfy_cms_snippets", ["site_id", "position"], name: "index_comfy_cms_snippets_on_site_id_and_position", using: :btree

  create_table "karyalay_attributes", force: :cascade do |t|
    t.integer  "no_of_people"
    t.integer  "no_of_rooms"
    t.integer  "price_half_day"
    t.integer  "price_full_day"
    t.integer  "size_in_sq"
    t.integer  "no_of_floors"
    t.boolean  "has_floors"
    t.boolean  "has_garden"
    t.boolean  "provide_offers"
    t.boolean  "has_ac"
    t.boolean  "has_caterer"
    t.boolean  "has_pandit"
    t.boolean  "has_samagri"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "karyalay_list_id"
    t.boolean  "has_rooms"
  end

  add_index "karyalay_attributes", ["karyalay_list_id"], name: "index_karyalay_attributes_on_karyalay_list_id", using: :btree

  create_table "karyalay_caterers", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone_number"
    t.text     "specialites",  default: [], array: true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email"
  end

  create_table "karyalay_caterers_lists", force: :cascade do |t|
    t.integer "karyalay_caterer_id"
    t.integer "karyalay_list_id"
  end

  add_index "karyalay_caterers_lists", ["karyalay_caterer_id"], name: "index_karyalay_caterers_lists_on_karyalay_caterer_id", using: :btree
  add_index "karyalay_caterers_lists", ["karyalay_list_id"], name: "index_karyalay_caterers_lists_on_karyalay_list_id", using: :btree

  create_table "karyalay_caterers_packages", force: :cascade do |t|
    t.integer "karyalay_package_id"
    t.integer "karyalay_caterer_id"
  end

  add_index "karyalay_caterers_packages", ["karyalay_caterer_id"], name: "index_karyalay_caterers_packages_on_karyalay_caterer_id", using: :btree
  add_index "karyalay_caterers_packages", ["karyalay_package_id"], name: "index_karyalay_caterers_packages_on_karyalay_package_id", using: :btree

  create_table "karyalay_lists", force: :cascade do |t|
    t.text     "name"
    t.text     "address"
    t.text     "description"
    t.text     "location"
    t.text     "phone_number"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
    t.string   "state"
    t.string   "city"
    t.string   "landmark"
  end

  add_index "karyalay_lists", ["user_id"], name: "index_karyalay_lists_on_user_id", using: :btree

  create_table "karyalay_lists_pandits", force: :cascade do |t|
    t.integer "karyalay_pandit_id"
    t.integer "karyalay_list_id"
  end

  add_index "karyalay_lists_pandits", ["karyalay_list_id"], name: "index_karyalay_lists_pandits_on_karyalay_list_id", using: :btree
  add_index "karyalay_lists_pandits", ["karyalay_pandit_id"], name: "index_karyalay_lists_pandits_on_karyalay_pandit_id", using: :btree

  create_table "karyalay_lists_samagris", force: :cascade do |t|
    t.integer "karyalay_samagri_id"
    t.integer "karyalay_list_id"
    t.integer "quantity"
  end

  add_index "karyalay_lists_samagris", ["karyalay_list_id"], name: "index_karyalay_lists_samagris_on_karyalay_list_id", using: :btree
  add_index "karyalay_lists_samagris", ["karyalay_samagri_id"], name: "index_karyalay_lists_samagris_on_karyalay_samagri_id", using: :btree

  create_table "karyalay_packages", force: :cascade do |t|
    t.string   "subject"
    t.date     "from_date"
    t.time     "from_time"
    t.time     "to_time"
    t.boolean  "has_ac"
    t.boolean  "has_garden"
    t.integer  "num_rooms"
    t.string   "ref_name"
    t.string   "ref_phone_number"
    t.integer  "karyalay_list_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "all_day",          default: false
  end

  add_index "karyalay_packages", ["karyalay_list_id"], name: "index_karyalay_packages_on_karyalay_list_id", using: :btree

  create_table "karyalay_packages_pandits", force: :cascade do |t|
    t.integer "karyalay_package_id"
    t.integer "karyalay_pandit_id"
  end

  add_index "karyalay_packages_pandits", ["karyalay_package_id"], name: "index_karyalay_packages_pandits_on_karyalay_package_id", using: :btree
  add_index "karyalay_packages_pandits", ["karyalay_pandit_id"], name: "index_karyalay_packages_pandits_on_karyalay_pandit_id", using: :btree

  create_table "karyalay_packages_samagris", force: :cascade do |t|
    t.integer "karyalay_package_id"
    t.integer "karyalay_samagri_id"
    t.integer "quantity"
  end

  add_index "karyalay_packages_samagris", ["karyalay_package_id"], name: "index_karyalay_packages_samagris_on_karyalay_package_id", using: :btree
  add_index "karyalay_packages_samagris", ["karyalay_samagri_id"], name: "index_karyalay_packages_samagris_on_karyalay_samagri_id", using: :btree

  create_table "karyalay_pandits", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone_number"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "karyalay_samagris", force: :cascade do |t|
    t.string   "name"
    t.string   "category"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "photos", force: :cascade do |t|
    t.integer  "karyalay_list_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "gallery_file_name"
    t.string   "gallery_content_type"
    t.integer  "gallery_file_size"
    t.datetime "gallery_updated_at"
  end

  add_index "photos", ["karyalay_list_id"], name: "index_photos_on_karyalay_list_id", using: :btree

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone_number"
    t.string   "address"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.integer  "role_id",                default: 1,  null: false
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
