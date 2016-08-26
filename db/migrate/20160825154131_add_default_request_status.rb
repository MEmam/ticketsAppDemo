class AddDefaultRequestStatus < ActiveRecord::Migration
  def change
    RequestStatus.names.values.each do |name|
      RequestStatus.find_or_create_by(name: name)
    end
  end
end
