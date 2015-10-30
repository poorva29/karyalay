class KaryalaySamagrisController < ApplicationController
  before_action :set_karyalay_samagri, only: [:show, :edit, :update, :destroy]

  # GET /karyalay_samagris
  # GET /karyalay_samagris.json
  def index
    @karyalay_samagris = KaryalaySamagri.all
    render json: @karyalay_samagris
  end

  # GET /karyalay_samagris/1
  # GET /karyalay_samagris/1.json
  def show
  end

  # GET /karyalay_samagris/new
  def new
    @karyalay_samagri = KaryalaySamagri.new
  end

  # GET /karyalay_samagris/1/edit
  def edit
  end

  # POST /karyalay_samagris
  # POST /karyalay_samagris.json
  def create
    @karyalay_samagri = KaryalaySamagri.new(karyalay_samagri_params)

    respond_to do |format|
      if @karyalay_samagri.save
        format.html { redirect_to @karyalay_samagri, notice: 'Karyalay samagri was successfully created.' }
        format.json { render action: 'show', status: :created, location: @karyalay_samagri }
      else
        format.html { render action: 'new' }
        format.json { render json: @karyalay_samagri.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /karyalay_samagris/1
  # PATCH/PUT /karyalay_samagris/1.json
  def update
    respond_to do |format|
      if @karyalay_samagri.update(karyalay_samagri_params)
        format.html { redirect_to @karyalay_samagri, notice: 'Karyalay samagri was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @karyalay_samagri.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /karyalay_samagris/1
  # DELETE /karyalay_samagris/1.json
  def destroy
    @karyalay_samagri.destroy
    respond_to do |format|
      format.html { redirect_to karyalay_samagris_url }
      format.json { head :no_content }
    end
  end

  def fetch_selected_category
    category = params[:category]
    item_list = {}
    item_list = KaryalaySamagri.where(category: category) unless category.nil?
    render json: item_list
  end

  def add_karyalay_tags(kl, ks, quantity)
    kls = KaryalayListsSamagri.find_by(karyalay_list: kl, karyalay_samagri: ks)
    if kls.nil?
      kls = KaryalayListsSamagri.new
      kls.karyalay_samagri = ks
      kls.karyalay_list = kl
    end
    kls.quantity = quantity
    kls.save
  end

  def find_create_samagri(tag)
    if tag[:id] == '-1'
      ks = KaryalaySamagri.find_or_create_by(name: tag[:name],
                                             category: tag[:category])
    else
      ks = KaryalaySamagri.where(id: tag[:id]).first
    end
    ks
  end

  def remove_karyalay_tags(karyalay_samagri, to_keep_samagris, karyalay_list_id)
    to_remove_samagris = karyalay_samagri - to_keep_samagris
    KaryalayListsSamagri.where(karyalay_list_id: karyalay_list_id,
                               karyalay_samagri_id: to_remove_samagris)
      .delete_all
  end

  def update_tags
    karyalay_lists_id = params[:karyalay_samagri_params][:karyalay_lists_id]
    tag_list =  params[:karyalay_samagri_params][:selected_item]
    kl = KaryalayList.find_by_id(karyalay_lists_id)
    if !kl.nil?
      karyalay_samagri = KaryalayListsSamagri.where(karyalay_list_id: kl.id)
                         .pluck(:karyalay_samagri_id)
      to_keep_samagris = tag_list.map do |tag|
        ks = find_create_samagri(tag)
        add_karyalay_tags(kl, ks, tag[:quantity])
        ks.id
      end
      # User might remove some tags while updating
      remove_karyalay_tags(karyalay_samagri, to_keep_samagris, kl.id)
      render json: { id: nil, message: 'Added tags' }
    else
      render json: { id: nil, message: 'Not Created' }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_karyalay_samagri
      @karyalay_samagri = KaryalaySamagri.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def karyalay_samagri_params
      params.require(:karyalay_samagri)
        .permit(:name, :category, :karyalay_lists_id, :quantity , :selected_item)
    end
end
