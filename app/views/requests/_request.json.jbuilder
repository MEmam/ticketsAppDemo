json.extract! request, :id, :name, :label
json.request_status request.request_status["name"]
json.created_at request.created_at.to_s(:db)
json.updated_at request.updated_at.to_s(:db)
json.url request_url(request, format: :json)