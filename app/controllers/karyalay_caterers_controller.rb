class KaryalayCaterersController < ApplicationController
  before_action :set_karyalay_caterer, only: [:show, :edit, :update, :destroy]
  before_action :set_karyalay_list, only: [:remove_karyalay_caterers,
                                           :caterer_to_keep]

  # GET /karyalay_caterers
  # GET /karyalay_caterers.json
  def index
    @karyalay_caterers = KaryalayCaterer.all
    render json: @karyalay_caterers
  end

  # GET /karyalay_caterers/1
  # GET /karyalay_caterers/1.json
  def show
  end

  # GET /karyalay_caterers/new
  def new
    @karyalay_caterer = KaryalayCaterer.new
  end

  # GET /karyalay_caterers/1/edit
  def edit
  end

  # POST /karyalay_caterers
  # POST /karyalay_caterers.json
  def create
    karyalay_lists_id = params[:karyalay_caterer_params][:karyalay_lists_id]
    kl = KaryalayList.find_by_id(karyalay_lists_id)
    if !kl.nil?
      @karyalay_caterer = KaryalayCaterer.find_or_create_by(karyalay_caterer_params)
      unless @karyalay_caterer.karyalay_lists.map(&:id).include? karyalay_lists_id
        @karyalay_caterer.karyalay_lists << kl
      end
      if @karyalay_caterer.save
        render json: @karyalay_caterer
      else
        render json: { id: nil,
                       message: 'Karyalay Caterer Not Created Try Again' }
      end
    else
      render json: { id: nil, message: 'Karyalay Not Found, Try Again' }
    end
  end

  # PATCH/PUT /karyalay_caterers/1
  # PATCH/PUT /karyalay_caterers/1.json
  def update
    respond_to do |format|
      if @karyalay_caterer.update(karyalay_caterer_params)
        format.html { redirect_to @karyalay_caterer, notice: 'Karyalay caterer was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @karyalay_caterer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /karyalay_caterers/1
  # DELETE /karyalay_caterers/1.json
  def destroy
    @karyalay_caterer.destroy
    respond_to do |format|
      format.html { redirect_to karyalay_caterers_url }
      format.json { head :no_content }
    end
  end

  # Removes all associated cateres for karyalay
  def remove_karyalay_caterers
    result = { success: false, message: 'Karyalay cateres not deleted' }
    unless @karyalay_list.nil?
      @karyalay_list.karyalay_caterer_ids = []
      if @karyalay_list.save
        result = { success: true, message: 'Karyalay cateres deleted' }
      end
    end
    render json: result
  end

  def caterer_to_keep
    caterer_to_keep_ids = params[:caterer_to_keep] || []
    result = { result: false, message: 'Karyalay Caterer List Not Updated' }
    unless @karyalay_list.nil?
      to_keep_caterers = @karyalay_list.karyalay_caterer_ids &
                         caterer_to_keep_ids
      @karyalay_list.karyalay_caterer_ids = to_keep_caterers
      if @karyalay_list.save
        result = { result: true, message: 'Updated Caterer List' }
      end
    end
    render json: result
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_karyalay_caterer
      @karyalay_caterer = KaryalayCaterer.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def karyalay_caterer_params
      params.require(:karyalay_caterer_params)
        .permit(:first_name, :last_name, :phone_number, :email, :specialites => [])
    end

    def set_karyalay_list
      karyalay_lists_id = params[:karyalay_caterer_params][:karyalay_lists_id]
      @karyalay_list ||= KaryalayList.find_by_id(karyalay_lists_id)
    end
end
