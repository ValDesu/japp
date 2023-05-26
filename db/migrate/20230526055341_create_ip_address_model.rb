class CreateIpAddressModel < ActiveRecord::Migration[7.0]
  def change
    create_table :ip_addresses do |t|
      t.string :ip_address
      t.timestamps
    end
  end
end
