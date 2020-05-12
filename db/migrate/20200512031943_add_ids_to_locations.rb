class AddIdsToLocations < ActiveRecord::Migration[6.0]
  def change
    add_column :cities, :province_id, :integer
    add_column :neighbourhoods, :city_id, :integer
  end
end
