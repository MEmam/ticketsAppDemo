class Request < ActiveRecord::Base
  belongs_to :customer
  belongs_to :request_status
  RequestStatus.names.keys.each do |status|
    scope status, -> {where(request_status: RequestStatus.send(status))}
  end
end
