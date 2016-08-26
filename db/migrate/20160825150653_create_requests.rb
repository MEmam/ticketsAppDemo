class CreateRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.string :name
      t.string :label
      t.integer :customer_id, index: true, foreign_key: true
      t.references :request_status, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
