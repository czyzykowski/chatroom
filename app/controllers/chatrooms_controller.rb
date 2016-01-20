class ChatroomsController < ApplicationController
  def index
  end

  def messages
    @messages = ChatMessage.all.order(created_at: :asc)
  end

  def giphy
    @giphy = Giphy.search(params['query'], limit: 1).first
  end
end
