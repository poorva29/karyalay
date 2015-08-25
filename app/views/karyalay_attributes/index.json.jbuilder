json.array!(@karyalay_attributes) do |karyalay_attribute|
  json.extract! karyalay_attribute, :id
  json.url karyalay_attribute_url(karyalay_attribute, format: :json)
end
