class CreateNeighbourhoods < ActiveRecord::Migration[6.0]
  def change
    create_table :neighbourhoods do |t|
      t.string :zip_code
      t.string :name

      t.timestamps
    end
  end
end
