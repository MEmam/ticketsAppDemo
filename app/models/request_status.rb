class RequestStatus < ActiveRecord::Base
  enum name: {recent: 'New', in_progress: 'In Progress', closed: 'Closed'}
end
