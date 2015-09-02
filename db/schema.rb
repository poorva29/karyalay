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

ActiveRecord::Schema.define(version: 20150830091759) do

  create_table "comfy_cms_blocks", force: true do |t|
    t.string   "identifier",     null: false
    t.text     "content"
    t.integer  "blockable_id"
    t.string   "blockable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comfy_cms_blocks", ["blockable_id", "blockable_type"], name: "index_comfy_cms_blocks_on_blockable_id_and_blockable_type", using: :btree
  add_index "comfy_cms_blocks", ["identifier"], name: "index_comfy_cms_blocks_on_identifier", using: :btree

  create_table "comfy_cms_categories", force: true do |t|
    t.integer "site_id",          null: false
    t.string  "label",            null: false
    t.string  "categorized_type", null: false
  end

  add_index "comfy_cms_categories", ["site_id", "categorized_type", "label"], name: "index_cms_categories_on_site_id_and_cat_type_and_label", unique: true, using: :btree

  create_table "comfy_cms_categorizations", force: true do |t|
    t.integer "category_id",      null: false
    t.string  "categorized_type", null: false
    t.integer "categorized_id",   null: false
  end

  add_index "comfy_cms_categorizations", ["category_id", "categorized_type", "categorized_id"], name: "index_cms_categorizations_on_cat_id_and_catd_type_and_catd_id", unique: true, using: :btree

  create_table "comfy_cms_files", force: true do |t|
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

  create_table "comfy_cms_layouts", force: true do |t|
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

  create_table "comfy_cms_pages", force: true do |t|
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

  create_table "comfy_cms_revisions", force: true do |t|
    t.string   "record_type", null: false
    t.integer  "record_id",   null: false
    t.text     "data"
    t.datetime "created_at"
  end

  add_index "comfy_cms_revisions", ["record_type", "record_id", "created_at"], name: "index_cms_revisions_on_rtype_and_rid_and_created_at", using: :btree

  create_table "comfy_cms_sites", force: true do |t|
    t.string  "label",                       null: false
    t.string  "identifier",                  null: false
    t.string  "hostname",                    null: false
    t.string  "path"
    t.string  "locale",      default: "en",  null: false
    t.boolean "is_mirrored", default: false, null: false
  end

  add_index "comfy_cms_sites", ["hostname"], name: "index_comfy_cms_sites_on_hostname", using: :btree
  add_index "comfy_cms_sites", ["is_mirrored"], name: "index_comfy_cms_sites_on_is_mirrored", using: :btree

  create_table "comfy_cms_snippets", force: true do |t|
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

  create_table "karyalay_attributes", force: true do |t|
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
  end

  add_index "karyalay_attributes", ["karyalay_list_id"], name: "index_karyalay_attributes_on_karyalay_list_id", using: :btree

  create_table "karyalay_caterers", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone_numner"
    t.text     "specialites",  default: [], array: true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email"
  end

  create_table "karyalay_caterers_lists", force: true do |t|
    t.integer "karyalay_caterer_id"
    t.integer "karyalay_list_id"
  end

  add_index "karyalay_caterers_lists", ["karyalay_caterer_id"], name: "index_karyalay_caterers_lists_on_karyalay_caterer_id", using: :btree
  add_index "karyalay_caterers_lists", ["karyalay_list_id"], name: "index_karyalay_caterers_lists_on_karyalay_list_id", using: :btree

  create_table "karyalay_lists", force: true do |t|
    t.text     "name"
    t.text     "address"
    t.text     "description"
    t.text     "location"
    t.text     "phone_number"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "karyalay_lists_caterers", force: true do |t|
    t.integer "karyalay_caterer_id"
    t.integer "karyalay_list_id"
  end

  add_index "karyalay_lists_caterers", ["karyalay_caterer_id"], name: "index_karyalay_lists_caterers_on_karyalay_caterer_id", using: :btree
  add_index "karyalay_lists_caterers", ["karyalay_list_id"], name: "index_karyalay_lists_caterers_on_karyalay_list_id", using: :btree

  create_table "karyalay_lists_karyalay_pandits", force: true do |t|
    t.integer "karyalay_pandit_id"
    t.integer "karyalay_list_id"
  end

  add_index "karyalay_lists_karyalay_pandits", ["karyalay_list_id"], name: "index_karyalay_lists_karyalay_pandits_on_karyalay_list_id", using: :btree
  add_index "karyalay_lists_karyalay_pandits", ["karyalay_pandit_id"], name: "index_karyalay_lists_karyalay_pandits_on_karyalay_pandit_id", using: :btree

  create_table "karyalay_lists_pandits", force: true do |t|
    t.integer "karyalay_pandit_id"
    t.integer "karyalay_list_id"
  end

  add_index "karyalay_lists_pandits", ["karyalay_list_id"], name: "index_karyalay_lists_pandits_on_karyalay_list_id", using: :btree
  add_index "karyalay_lists_pandits", ["karyalay_pandit_id"], name: "index_karyalay_lists_pandits_on_karyalay_pandit_id", using: :btree

  create_table "karyalay_lists_samagris", force: true do |t|
    t.integer "karyalay_samagri_id"
    t.integer "karyalay_list_id"
    t.integer "quantity"
  end

  add_index "karyalay_lists_samagris", ["karyalay_list_id"], name: "index_karyalay_lists_samagris_on_karyalay_list_id", using: :btree
  add_index "karyalay_lists_samagris", ["karyalay_samagri_id"], name: "index_karyalay_lists_samagris_on_karyalay_samagri_id", using: :btree

  create_table "karyalay_pandits", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone_numner"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "karyalay_samagris", force: true do |t|
    t.string   "name"
    t.string   "category"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
