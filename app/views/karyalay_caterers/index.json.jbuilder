json.array!(@karyalay_caterers) do |karyalay_caterer|
  json.extract! karyalay_caterer, :id
  json.url karyalay_caterer_url(karyalay_caterer, format: :json)
end
