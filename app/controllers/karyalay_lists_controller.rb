class KaryalayListsController < ApplicationController
  before_action :set_karyalay_list, only: [:show, :edit, :update, :destroy]

  # GET /karyalay_lists
  # GET /karyalay_lists.json
  def index
    @karyalay_lists = KaryalayList.all
  end

  # GET /karyalay_lists/1
  # GET /karyalay_lists/1.json
  def show
  end

  # GET /karyalay_lists/new
  def new
    @karyalay_list = KaryalayList.new
  end

  # GET /karyalay_lists/1/edit
  def edit
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
    respond_to do |format|
      if @karyalay_list.update(karyalay_list_params)
        format.html { redirect_to @karyalay_list, notice: 'Karyalay list was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @karyalay_list.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /karyalay_lists/1
  # DELETE /karyalay_lists/1.json
  def destroy
    @karyalay_list.destroy
    respond_to do |format|
      format.html { redirect_to karyalay_lists_url }
      format.json { head :no_content }
    end
  end

  def fetch_karyalay_info
    result = KaryalayList.includes(:karyalay_attribute)
             .where(user_id: current_user.id).map do |kl|
               {
                 karyalay: kl,
                 karyalay_attribute: kl.karyalay_attribute
               }
             end
    render json: result
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_karyalay_list
      @karyalay_list = KaryalayList.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def karyalay_list_params
      params.require(:karyalay_list)
        .permit(:name, :address, :description, :location, :phone_number, :email)
    end
end
