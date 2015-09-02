json.array!(@karyalay_samagris) do |karyalay_samagri|
  json.extract! karyalay_samagri, :id
  json.url karyalay_samagri_url(karyalay_samagri, format: :json)
end
