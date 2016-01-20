class ChatController < FayeRails::Controller
  channel '/messages' do
    subscribe do
      ChatMessage.create(from: message['from'], content: message['content'])
    end
  end

  # ideally stored in redis or memcached
  USERS = {}

  channel '/users' do
    monitor :publish do
      USERS[client_id] = data
      ChatController.publish('/users-list', USERS.values.sort)
    end
  end

  channel '/users-list' do
    monitor :subscribe do
      ChatController.publish('/users-list', USERS.values.sort)
    end

    monitor :unsubscribe do
      USERS.delete(client_id)
      ChatController.publish('/users-list', USERS.values.sort)
    end
  end
end
