json.array! @users do |user|
  json.id user.id
  json.name user.name
end

json.array! @new_messages do |message|
  json.id message.id
  json.user_name message.user.name
  json.time message.created_at.strftime(“%Y年/%m月/%d日 %H時:%M分”)
  json.content message.content
  json.image message.image.url
end
  
json.array! @messages do |message|
    json.content message.content
    json.image message.image
    json.created_at message.created_at
    json.user_name message.user.name
    json.id message.id
end