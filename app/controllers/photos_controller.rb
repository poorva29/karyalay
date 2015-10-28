class PhotosController < ApplicationController
  before_action :set_photo, only: [:update, :destroy]

  # POST /photos
  # POST /photos.json
  def create
    @photos = Photo.new(photos_params)
    if @photos.save
      render json: { id: @photos.id, url: @photos.gallery.url,
                     size: @photos.gallery_file_size }
    else
      render json: { id: nil }
    end
  end

  # DELETE /photos/1
  # DELETE /photos/1.json
  def destroy
    id = @photos.id
    if !@photos.nil? && @photos.destroy
      result = { message: 'Deleted successfully', status: true, id: id }
    else
      result = { message: 'Please try again later', status: false }
    end
    render json: result
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_photo
      @photos = Photo.find(params[:id])
    end

    # Never trust parameters from the scary internet,
    # only allow the white list through.
    def photos_params
      params.require(:photos_list).permit(:gallery, :karyalay_list_id)
    end
end
