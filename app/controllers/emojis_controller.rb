class EmojisController < ApplicationController
  def index
    @emojis = Emoji.all
  end

  def create
    @emoji = Emoji.new(code: params[:code], description: params[:description], image: params[:image])
    if @emoji.save
      render partial: 'emoji', status: :created, locals: { emoji: @emoji }
    else
      render json: @emoji.errors, status: :unprocessable_entity
    end
  end
end
