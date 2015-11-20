class KaryalayListsController < ApplicationController
  before_action :set_karyalay_list, only: [:show, :edit, :update, :destroy]

  # GET /karyalay_lists
  # GET /karyalay_lists.json
  def index
  end

  # GET /karyalay_lists/1
  # GET /karyalay_lists/1.json
  def show
  end

  # GET /karyalay_lists/new
  def new
    @karyalay_list = KaryalayList.new
  end

  def fetch_photos
    @karyalay_list.photos.map do |photo|
      { id: photo.id, url: photo.gallery.url, size: photo.gallery_file_size }
    end
  end

  def fetch_karyalay_list_data
    {
      karyalay: @karyalay_list,
      karyalay_attribute: @karyalay_list.karyalay_attribute,
      karyalay_pandits: @karyalay_list.karyalay_pandits,
      karyalay_caterers: @karyalay_list.karyalay_caterers,
      karyalay_samagris: @karyalay_list.karyalay_samagris,
      karyalay_photos: fetch_photos
    }
  end

  # GET /karyalay_lists/1/edit
  def edit
    @karyalay_list = KaryalayList
                     .includes(:karyalay_attribute, :karyalay_pandits,
                               :karyalay_caterers, :karyalay_samagris,
                               :photos)
                     .where(id: params[:id]).first
    render json: fetch_karyalay_list_data
  end

  # POST /karyalay_lists
  # POST /karyalay_lists.json
  def create
    user_id = params[:karyalay_list][:user_id]
    @karyalay_list = KaryalayList.new(karyalay_list_params)
    @karyalay_list.user = User.find_by(id: user_id)
    if @karyalay_list.save
      render json: @karyalay_list
    else
      render json: { id: nil }
    end
  end

  # PATCH/PUT /karyalay_lists/1
  # PATCH/PUT /karyalay_lists/1.json
  def update
    if @karyalay_list.update(karyalay_list_params)
      result = { notice: 'Karyalay list was successfully updated.',
                 status: true }
    else
      result = { errors: @karyalay_list.errors, status: :unprocessable_entity }
    end
    render json: result
  end

  # DELETE /karyalay_lists/1
  # DELETE /karyalay_lists/1.json
  def destroy
    result = { message: 'Please try again later', status: false }
    unless @karyalay_list.nil?
      @karyalay_list.karyalay_caterers.clear
      @karyalay_list.karyalay_pandits.clear
      @karyalay_list.karyalay_samagris.clear
      if @karyalay_list.destroy
        result = { message: 'Deleted successfully', status: true }
      end
    end
    render json: result
  end

  def fetch_karyalay_list
    result = KaryalayList.where(user_id: current_user.id)
             .order('updated_at DESC')
    render json: result
  end

  def fetch_karyalay_info
    result = KaryalayList.includes(:karyalay_attribute)
             .where(user_id: current_user.id)
             .order('updated_at DESC').map do |kl|
               {
                 karyalay: kl,
                 karyalay_attribute: kl.karyalay_attribute
               }
             end
    render json: result
  end

  def fetch_karyalay_package
    @karyalay_list = KaryalayList.includes(:karyalay_packages)
                     .where(id: params[:id]).first
    render json: @karyalay_list.karyalay_packages
  end

  # For admins and visitors
  def fetch_all_karyalay_list
    res = KaryalayList.all.map do |k|
      karyalay_photos = k.photos.map do |kp|
        { id: kp.id, thumbnail_url: kp.gallery.url(:thumb),
          size: kp.gallery_file_size }
      end
      {
        karyalay: k,
        karyalay_photos: karyalay_photos
      }
    end
    render json: res.to_json
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_karyalay_list
      @karyalay_list = KaryalayList.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def karyalay_list_params
      params.require(:karyalay_list)
        .permit(:name, :address, :description, :location, :phone_number, :email,
                :state, :city, :landmark)
    end
end
