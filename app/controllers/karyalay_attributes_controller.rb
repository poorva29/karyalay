class KaryalayAttributesController < ApplicationController
  before_action :set_karyalay_attribute, only: [:show, :edit, :update, :destroy]
  before_action :set_karyalay_list, only: [:create]

  # GET /karyalay_attributes
  # GET /karyalay_attributes.json
  def index
    @karyalay_attributes = KaryalayAttribute.all
  end

  # GET /karyalay_attributes/1
  # GET /karyalay_attributes/1.json
  def show
  end

  # GET /karyalay_attributes/new
  def new
    @karyalay_attribute = KaryalayAttribute.new
  end

  # GET /karyalay_attributes/1/edit
  def edit
  end

  # POST /karyalay_attributes
  # POST /karyalay_attributes.json
  def create
    if !@karyalay_list.nil?
      @karyalay_attribute = KaryalayAttribute.new(karyalay_attribute_params)
      @karyalay_attribute.karyalay_list = @karyalay_list
      if @karyalay_attribute.save
        render json: @karyalay_attribute
      else
        render json: { id: nil,
                       message: 'Karyalay Attributes Not Saved, Try Again' }
      end
    else
      render json: { id: nil, message: 'Karyalay Not Found, Try Again' }
    end
  end

  # PATCH/PUT /karyalay_attributes/1
  # PATCH/PUT /karyalay_attributes/1.json
  def update
    if @karyalay_attribute.update(karyalay_attribute_params)
      result = { notice: 'Karyalay attribute was successfully updated.',
                 status: true }
    else
      result = { errors: @karyalay_attribute.errors,
                 status: :unprocessable_entity }
    end
    render json: result
  end

  # DELETE /karyalay_attributes/1
  # DELETE /karyalay_attributes/1.json
  def destroy
    @karyalay_attribute.destroy
    respond_to do |format|
      format.html { redirect_to karyalay_attributes_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_karyalay_attribute
      @karyalay_attribute = KaryalayAttribute.find(params[:id])
    end

    def set_karyalay_list
      karyalay_lists_id = params[:karyalay_attr_list][:karyalay_lists_id]
      @karyalay_list ||= KaryalayList.find_by_id(karyalay_lists_id)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def karyalay_attribute_params
      params.require(:karyalay_attr_list)
        .permit(:no_of_people, :no_of_rooms, :price_half_day,
                :price_full_day, :size_in_sq, :no_of_floors,
                :has_floors, :has_garden, :provide_offers,
                :has_ac, :has_caterer, :has_pandit, :has_samagri)
    end
end
