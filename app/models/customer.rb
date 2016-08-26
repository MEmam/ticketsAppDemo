class Customer < User
  has_many :requests, :dependent => :destroy
end
