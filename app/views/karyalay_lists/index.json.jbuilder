json.array!(@karyalay_lists) do |karyalay_list|
  json.extract! karyalay_list, :id
  json.url karyalay_list_url(karyalay_list, format: :json)
end
