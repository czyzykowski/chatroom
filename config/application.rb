require File.expand_path('../boot', __FILE__)

require "rails"
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_view/railtie"
require "sprockets/railtie"

Bundler.require(*Rails.groups)

module Chatroom
  class Application < Rails::Application
    # required for faye-rails to work
    config.middleware.delete Rack::Lock

    config.middleware.use FayeRails::Middleware, mount: '/faye', timeout: 25 do
      map '/messages'   => ChatController
      map '/users'      => ChatController
      map '/users-list' => ChatController
      map default: :block
    end

    config.active_record.raise_in_transactional_callbacks = true
  end
end
