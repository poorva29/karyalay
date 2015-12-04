Karyalay::Application.routes.draw do
  resources :karyalay_packages

  devise_for :users, path: '', path_names: { sign_in: 'sign_in', sign_out: 'sign_out' }

  resources :users

  resources :karyalay_samagris

  resources :karyalay_caterers

  resources :karyalay_pandits

  resources :karyalay_attributes

  resources :photos

  # comfy_route :cms_admin, :path => '/admin'

  # Make sure this routeset is defined last
  # comfy_route :cms, :path => '/', :sitemap => false

  resources :karyalay_lists
  root to: 'karyalay_lists#index'

  # Karyalay Samagri's
  get 'fetch_pselected_category' => 'karyalay_samagris#fetch_pselected_category'
  get 'fetch_kselected_category' => 'karyalay_samagris#fetch_kselected_category'
  post 'update_tags' => 'karyalay_samagris#update_tags'

  # Karyalay List's
  get 'fetch_karyalay_list' => 'karyalay_lists#fetch_karyalay_list'
  get 'matching_karyalay_list' => 'karyalay_lists#matching_karyalay_list'
  get 'fetch_karyalay_info' => 'karyalay_lists#fetch_karyalay_info'
  get 'fetch_karyalay_package' => 'karyalay_lists#fetch_karyalay_package'
  get 'karyalay_list' => 'karyalay_lists#index'

  post 'pandit_to_keep' => 'karyalay_pandits#pandit_to_keep'

  post 'caterer_to_keep' => 'karyalay_caterers#caterer_to_keep'

  get 'user_role_name' => 'users#user_role_name'

  get '*path' => 'karyalay_lists#index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
