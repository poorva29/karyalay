json.array!(@karyalay_packages) do |karyalay_package|
  json.extract! karyalay_package, :id
  json.url karyalay_package_url(karyalay_package, format: :json)
end
