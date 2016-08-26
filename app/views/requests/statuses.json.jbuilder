json.array! @request_statuses do |request_status|
  json.extract! request_status, :id
  json.name request_status["name"]
  json.url request_url(request_status, format: :json)
end