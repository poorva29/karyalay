class KaryalayPanditsController < ApplicationController
  before_action :set_karyalay_pandit, only: [:show, :edit, :update, :destroy]

  # GET /karyalay_pandits
  # GET /karyalay_pandits.json
  def index
    @karyalay_pandits = KaryalayPandit.all
    render json: @karyalay_pandits
  end

  # GET /karyalay_pandits/1
  # GET /karyalay_pandits/1.json
  def show
  end

  # GET /karyalay_pandits/new
  def new
    @karyalay_pandit = KaryalayPandit.new
  end

  # GET /karyalay_pandits/1/edit
  def edit
  end

  # POST /karyalay_pandits
  # POST /karyalay_pandits.json
  def create
    karyalay_lists_id = params[:karyalay_pandit_params][:karyalay_lists_id]
    kl = KaryalayList.find_by_id(karyalay_lists_id)
    if !kl.nil?
      @karyalay_pandit = KaryalayPandit.find_or_create_by(karyalay_pandit_params)
      unless @karyalay_pandit.karyalay_lists.map(&:id).include? karyalay_lists_id
        @karyalay_pandit.karyalay_lists << kl
      end
      if @karyalay_pandit.save
        render json: @karyalay_pandit
      else
        render json: { id: nil,
                       message: 'Karyalay Pandit Not Created Try Again' }
      end
    else
      render json: { id: nil, message: 'Karyalay Not Found, Try Again' }
    end
  end

  # PATCH/PUT /karyalay_pandits/1
  # PATCH/PUT /karyalay_pandits/1.json
  def update
    respond_to do |format|
      if @karyalay_pandit.update(karyalay_pandit_params)
        format.html { redirect_to @karyalay_pandit, notice: 'Karyalay pandit was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @karyalay_pandit.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /karyalay_pandits/1
  # DELETE /karyalay_pandits/1.json
  def destroy
    @karyalay_pandit.destroy
    respond_to do |format|
      format.html { redirect_to karyalay_pandits_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_karyalay_pandit
      @karyalay_pandit = KaryalayPandit.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def karyalay_pandit_params
      params.require(:karyalay_pandit_params)
        .permit(:first_name, :last_name, :phone_number, :email)
    end
end
