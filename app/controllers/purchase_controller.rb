class PurchaseController < ApplicationController

  require 'payjp'
  before_action :set_card

  def index
    if @card.blank?
      #登録された情報がない場合にカード登録画面に移動
      redirect_to controller: "card", action: "new"
    else
      Payjp.api_key = ENV["PAYJP_PRIVATE_KEY"]
      #保管した顧客IDでpayjpから情報取得
      customer = Payjp::Customer.retrieve(@card.customer_id)
      #保管したカードIDでpayjpから情報取得、カード情報表示のためインスタンス変数に代入
      @default_card_information = customer.cards.retrieve(@card.card_id)
    end
  end

  def pay
    Payjp.api_key = ENV['PAYJP_PRIVATE_KEY']
    Payjp::Charge.create(
    :amount => 10000, #支払金額を入力（itemテーブル等に紐づけても良い）@item.price,
    :customer => @card.customer_id, #顧客ID set_cardを使うのなら、@cardと記述
    :currency => 'jpy', #日本円という意味
  )
  redirect_to action: 'done' #完了画面に移動
  end

  private

  def set_card
    @card = Card.find_by(user_id: current_user.id)
  end

  # def set_item
  #   @item = Item.find(params[:item_id])
  # end

end

