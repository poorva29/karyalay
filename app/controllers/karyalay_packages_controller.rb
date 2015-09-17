class KaryalayPackagesController < ApplicationController
  before_action :set_karyalay_package, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @karyalay_packages = KaryalayPackage.all
    respond_with(@karyalay_packages)
  end

  def show
    respond_with(@karyalay_package)
  end

  def new
    @karyalay_package = KaryalayPackage.new
    respond_with(@karyalay_package)
  end

  def fetch_karyalay_package_data
    {
      karyalay_package: @karyalay_package,
      karyalay_pandits: @karyalay_package.karyalay_pandit,
      karyalay_caterers: @karyalay_package.karyalay_caterer
    }
  end

  # GET /karyalay_packages/1/edit
  def edit
    @karyalay_package = KaryalayPackage
                        .includes(:karyalay_pandit, :karyalay_caterer)
                        .where(id: params[:id]).first
    render json: fetch_karyalay_package_data
  end

  def add_pandit(kps, karyalay_pandits)
    karyalay_pandits.each do |pandit|
      kp = KaryalayPandit.find_by(id: pandit[:id])
      unless kp.nil? || kps.include?(kp.id)
        @karyalay_package.karyalay_pandit << kp
      end
    end unless karyalay_pandits.nil?
  end

  def add_caterer(kcs, karyalay_caterers)
    karyalay_caterers.each do |caterer|
      kc = KaryalayCaterer.find_by(id: caterer[:id])
      unless kc.nil? || kcs.include?(kc.id)
        @karyalay_package.karyalay_caterer << kc
      end
    end unless karyalay_caterers.nil?
  end

  def add_karyalay
    karyalay_lists_id = params[:karyalay_package][:karyalay_lists_id]
    kl = KaryalayList.find_by(id: karyalay_lists_id)
    @karyalay_package.karyalay_list = kl unless kl.nil?
  end

  def remove_pandit(existing_pandits, to_add_pandits)
    to_add_pandits = to_add_pandits.map { |pandit| pandit[:id] }
    to_remove_pandits = existing_pandits - to_add_pandits
    return unless to_remove_pandits.any?
    to_keep_pandits = @karyalay_package.karyalay_pandit_ids - to_remove_pandits
    @karyalay_package.karyalay_pandit_ids = to_keep_pandits
  end

  def remove_caterer(existing_caterers, to_add_caterers)
    to_add_caterers = to_add_caterers.map { |caterer| caterer[:id] }
    to_remove_caterers = existing_caterers - to_add_caterers
    return unless to_remove_caterers.any?
    to_keep_caterers = @karyalay_package.karyalay_caterer_ids -
                       to_remove_caterers
    @karyalay_package.karyalay_caterer_ids = to_keep_caterers
  end

  def create
    @karyalay_package = KaryalayPackage.new(karyalay_package_params)
    kps = @karyalay_package.karyalay_pandit.map(&:id)
    kcs = @karyalay_package.karyalay_caterer.map(&:id)
    karyalay_pandits = params[:karyalay_package][:selectedPeople] || []
    karyalay_caterers = params[:karyalay_package][:selectedCaterer] || []
    add_pandit(kps, karyalay_pandits)
    add_caterer(kcs, karyalay_caterers)
    add_karyalay
    @karyalay_package.save
    render json: @karyalay_package
  end

  def update_pandit
    existing_pandits = @karyalay_package.karyalay_pandit.map(&:id)
    to_add_pandits = params[:karyalay_package][:selectedPeople] || []
    add_pandit(existing_pandits, to_add_pandits)
    remove_pandit(existing_pandits, to_add_pandits)
  end

  def update_caterer
    existing_caterers = @karyalay_package.karyalay_caterer.map(&:id)
    to_add_caterers = params[:karyalay_package][:selectedCaterer] || []
    add_caterer(existing_caterers, to_add_caterers)
    remove_caterer(existing_caterers, to_add_caterers)
  end

  # PATCH/PUT /karyalay_packages/1
  def update
    if @karyalay_package.update(karyalay_package_params)
      update_pandit
      update_caterer
      @karyalay_package.save
      result = { notice: 'Karyalay list was successfully updated.',
                 status: true }
    else
      result = { errors: @karyalay_list.errors, status: :unprocessable_entity }
    end
    render json: result
  end

  def destroy
    @karyalay_package.destroy
    respond_with(@karyalay_package)
  end

  private
    def set_karyalay_package
      @karyalay_package = KaryalayPackage.find(params[:id])
    end

    def karyalay_package_params
      params[:karyalay_package]
        .permit(:subject, :from_date, :from_time,
                :to_time, :has_ac, :has_garden, :num_rooms,
                :ref_name, :ref_phone_number)
    end
end
