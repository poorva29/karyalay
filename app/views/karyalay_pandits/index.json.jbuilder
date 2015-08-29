json.array!(@karyalay_pandits) do |karyalay_pandit|
  json.extract! karyalay_pandit, :id
  json.url karyalay_pandit_url(karyalay_pandit, format: :json)
end
